const API = '/api';

/* ─── Utility helpers ─── */
function escapeHtml(v = '') { return String(v).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#039;','"':'&quot;'}[c])); }
function setMessage(el, text, type = 'error') { if (!el) return; el.textContent = text; el.className = 'message show ' + type; }
function getUser() { try { return JSON.parse(localStorage.getItem('medicareUser')); } catch { return null; } }
function getToken() { return localStorage.getItem('medicareToken'); }
function saveSession(data) { localStorage.setItem('medicareToken', data.token); localStorage.setItem('medicareUser', JSON.stringify(data.user)); }
function authHeaders() { const t = getToken(); return t ? { Authorization: 'Bearer ' + t, 'Content-Type': 'application/json' } : { 'Content-Type': 'application/json' }; }
function formatDate(d) { if (!d) return '—'; return new Date(d).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' }); }
function timeAgo(d) { const diff = (Date.now() - new Date(d)) / 60000; if (diff < 60) return Math.round(diff) + 'm ago'; if (diff < 1440) return Math.round(diff/60) + 'h ago'; return Math.round(diff/1440) + 'd ago'; }

/* ─── Role guard ─── */
function guardDashboardAccess() {
  const match = location.pathname.match(/(patient|doctor|receptionist|admin)-dashboard\.html$/);
  if (!match) return;
  const user = getUser();
  if (!user || !getToken()) { location.href = 'login.html'; return; }
  if (user.role !== match[1]) { location.href = user.role + '-dashboard.html'; }
}

/* ─── Navbar ─── */
function renderNav() {
  const header = document.querySelector('[data-nav]');
  if (!header) return;
  const user = getUser();
  const token = getToken();
  const authArea = user && token
    ? `<a class="btn btn-outline" href="${user.role}-dashboard.html">My Dashboard</a><button class="btn btn-primary" data-logout>Sign out</button>`
    : `<a class="btn btn-outline" href="login.html">Login</a><a class="btn btn-primary" href="register.html">Register</a>`;
  header.innerHTML = `<div class="container navbar">
    <a class="logo" href="index.html"><span class="logo-mark">+</span>MediCare</a>
    <button class="mobile-menu" aria-label="Open navigation">☰</button>
    <nav class="nav-links">
      <a href="index.html">Home</a>
      <a href="doctors.html">Find Doctors</a>
      <a href="index.html#specialties">Specialties</a>
      <a href="appointment.html">Appointments</a>
      <a href="portal.html">Access Portal</a>
      <a href="index.html#contact">Contact</a>
    </nav>
    <div class="nav-actions">${authArea}</div>
  </div>`;
  header.querySelector('.mobile-menu').addEventListener('click', () => header.querySelector('.nav-links').classList.toggle('open'));
  const logout = header.querySelector('[data-logout]');
  if (logout) logout.addEventListener('click', () => { localStorage.clear(); location.href = 'index.html'; });
}

/* ─── Doctors ─── */
async function fetchDoctors(params) {
  const qs = params ? '?' + new URLSearchParams(params).toString() : '';
  const res = await fetch(API + '/doctors' + qs);
  return res.json();
}
function doctorCard(doctor) {
  const days = Array.isArray(doctor.availableDays) ? doctor.availableDays.join(', ') : (doctor.availableDays || '');
  return `<article class="doctor-card">
    <img class="doctor-photo" src="${escapeHtml(doctor.image || 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=600&q=80')}" alt="${escapeHtml(doctor.name)}" onerror="this.src='https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=600&q=80'">
    <div class="doctor-info">
      <h3 class="doctor-name">${escapeHtml(doctor.name)}</h3>
      <div class="doctor-specialty">${escapeHtml(doctor.specialization)}</div>
      <div class="doctor-meta">
        <span>🏥 ${escapeHtml(doctor.experience || 0)} yrs experience</span>
        <span>📍 ${escapeHtml(doctor.department || '')}</span>
        <span>📅 ${days}</span>
      </div>
      <div class="doctor-bottom">
        <span class="rating">⭐ ${doctor.rating || 4.8}</span>
        <span class="fee">₹${doctor.consultationFee || '—'}</span>
      </div>
      <div class="card-actions">
        <a class="btn btn-outline" href="doctor-profile.html?id=${doctor._id}">View Profile</a>
        <a class="btn btn-primary" href="appointment.html?doctor=${doctor._id}">Book Now</a>
      </div>
    </div>
  </article>`;
}
async function loadDoctorCards(target, limit) {
  try {
    target.innerHTML = '<p class="empty-state">Loading doctors...</p>';
    const doctors = await fetchDoctors();
    target.innerHTML = (limit ? doctors.slice(0, limit) : doctors).map(doctorCard).join('') || '<p class="empty-state">No doctors found.</p>';
  } catch { target.innerHTML = '<p class="empty-state">Doctors are temporarily unavailable.</p>'; }
}

/* ─── Status badge ─── */
function statusBadge(status) {
  const map = { Pending: 'pending', Confirmed: 'confirmed', Cancelled: 'cancelled', Completed: 'completed' };
  return '<span class="status ' + (map[status] || '') + '">' + (status || '—') + '</span>';
}

/* ─── Init ─── */
document.addEventListener('DOMContentLoaded', () => {
  guardDashboardAccess();
  renderNav();
  const homeDoctors = document.querySelector('[data-featured-doctors]');
  if (homeDoctors) loadDoctorCards(homeDoctors, 3);
  const doctorsGrid = document.querySelector('[data-doctors-grid]');
  if (doctorsGrid) loadDoctorCards(doctorsGrid);
  const searchForm = document.querySelector('[data-doctor-search]');
  if (searchForm) searchForm.addEventListener('submit', async e => {
    e.preventDefault();
    const query = searchForm.querySelector('input').value.toLowerCase();
    [...document.querySelectorAll('.doctor-card')].forEach(c => { c.hidden = !!query && !c.textContent.toLowerCase().includes(query); });
  });
  const logout = document.querySelector('[data-logout]');
  if (logout) logout.addEventListener('click', () => { localStorage.clear(); location.href = 'index.html'; });
});

window.MediCare = { API, authHeaders, getUser, getToken, saveSession, setMessage, fetchDoctors, escapeHtml, formatDate, statusBadge };