document.addEventListener('DOMContentLoaded', async () => {
  const user = MediCare.getUser();
  if (!user || !MediCare.getToken()) { location.href = 'login.html'; return; }

  /* Personalise heading */
  const nameEl = document.querySelector('[data-user-name]');
  if (nameEl) nameEl.textContent = user.name || user.role;

  /* ───────── PATIENT DASHBOARD ───────── */
  const apptList = document.querySelector('[data-appointments]');
  const statsEls = {
    upcoming: document.querySelector('[data-stat-upcoming]'),
    completed: document.querySelector('[data-stat-completed]'),
    pending: document.querySelector('[data-stat-pending]'),
    records: document.querySelector('[data-stat-records]'),
  };

  if (apptList && user.role === 'patient') {
    try {
      const res = await fetch(MediCare.API + '/appointments', { headers: MediCare.authHeaders() });
      const appts = await res.json();
      if (statsEls.upcoming) statsEls.upcoming.textContent = appts.filter(a => a.status === 'Confirmed' || a.status === 'Pending').length;
      if (statsEls.completed) statsEls.completed.textContent = appts.filter(a => a.status === 'Completed').length;
      if (statsEls.pending) statsEls.pending.textContent = appts.filter(a => a.status === 'Pending').length;
      if (statsEls.records) statsEls.records.textContent = appts.filter(a => a.status === 'Completed').length;
      apptList.innerHTML = appts.length ? appts.slice(0, 10).map(a => `
        <div class="appointment-row">
          <div><strong>${MediCare.escapeHtml(a.patientName || user.name)}</strong><small>${MediCare.escapeHtml(a.doctorId?.name || a.reason || '')}</small></div>
          <div>${MediCare.formatDate(a.appointmentDate)}</div>
          <div>${MediCare.escapeHtml(a.appointmentTime || '')}</div>
          ${MediCare.statusBadge(a.status)}
          ${a.status === 'Pending' || a.status === 'Confirmed' ? '<button class="btn btn-danger btn-sm" onclick="cancelAppt(' + (a._id || a.id) + ', this)">Cancel</button>' : '<span></span>'}
        </div>`).join('') : '<div class="empty-state">No appointments yet. <a class="text-link" href="doctors.html">Find a doctor</a></div>';
    } catch { apptList.innerHTML = '<div class="empty-state">Could not load appointments.</div>'; }
  }

  /* ───────── DOCTOR DASHBOARD ───────── */
  const doctorApptList = document.querySelector('[data-doctor-appointments]');
  if (doctorApptList && user.role === 'doctor') {
    const drStats = {
      today: document.querySelector('[data-stat-today]'),
      upcoming: document.querySelector('[data-stat-upcoming]'),
      total: document.querySelector('[data-stat-total]'),
      completed: document.querySelector('[data-stat-completed]'),
    };
    const drNameEl = document.querySelector('[data-doctor-name]');
    try {
      const res = await fetch(MediCare.API + '/appointments', { headers: MediCare.authHeaders() });
      const appts = await res.json();
      const today = new Date().toDateString();
      const todayAppts = appts.filter(a => new Date(a.appointmentDate).toDateString() === today);
      const upcomingAppts = appts.filter(a => (a.status === 'Confirmed' || a.status === 'Pending') && new Date(a.appointmentDate) >= new Date());
      if (drStats.today) drStats.today.textContent = todayAppts.length;
      if (drStats.upcoming) drStats.upcoming.textContent = upcomingAppts.length;
      if (drStats.total) drStats.total.textContent = appts.length;
      if (drStats.completed) drStats.completed.textContent = appts.filter(a => a.status === 'Completed').length;
      if (drNameEl) drNameEl.textContent = user.name || 'Doctor';
      doctorApptList.innerHTML = appts.length ? appts.slice(0, 20).map(a => `
        <div class="appointment-row">
          <div><strong>${MediCare.escapeHtml(a.patientName || '—')}</strong><small>${MediCare.escapeHtml(a.reason || '')}</small></div>
          <div>${MediCare.formatDate(a.appointmentDate)}</div>
          <div>${MediCare.escapeHtml(a.appointmentTime || '')}</div>
          ${MediCare.statusBadge(a.status)}
          <div class="row-actions">
            ${a.status === 'Pending' ? '<button class="btn btn-sm btn-outline" onclick="updateApptStatus(' + (a._id||a.id) + ',\'Confirmed\',this)">Confirm</button>' : ''}
            ${a.status !== 'Completed' && a.status !== 'Cancelled' ? '<button class="btn btn-sm btn-light" onclick="updateApptStatus(' + (a._id||a.id) + ',\'Completed\',this)">Done</button>' : ''}
          </div>
        </div>`).join('') : '<div class="empty-state">No appointments assigned.</div>';
    } catch(e) { doctorApptList.innerHTML = '<div class="empty-state">Could not load appointments: ' + e.message + '</div>'; }
  }

  /* ───────── ADMIN & RECEPTIONIST DASHBOARD ───────── */
  const adminApptList = document.querySelector('[data-admin-appointments]');
  if (adminApptList && (user.role === 'admin' || user.role === 'receptionist')) {
    const aStats = {
      doctors: document.querySelector('[data-stat-doctors]'),
      patients: document.querySelector('[data-stat-patients]'),
      today: document.querySelector('[data-stat-today]'),
      pending: document.querySelector('[data-stat-pending]'),
    };
    try {
      const [statsRes, apptRes] = await Promise.all([
        fetch(MediCare.API + '/stats', { headers: MediCare.authHeaders() }),
        fetch(MediCare.API + '/appointments', { headers: MediCare.authHeaders() }),
      ]);
      const stats = statsRes.ok ? await statsRes.json() : {};
      const appts = apptRes.ok ? await apptRes.json() : [];
      if (aStats.doctors) aStats.doctors.textContent = stats.totalDoctors || '—';
      if (aStats.patients) aStats.patients.textContent = stats.totalPatients || '—';
      if (aStats.today) aStats.today.textContent = stats.todayAppts || '—';
      if (aStats.pending) aStats.pending.textContent = stats.pendingAppts || '—';
      adminApptList.innerHTML = appts.length ? appts.slice(0, 20).map(a => `
        <div class="appointment-row">
          <div><strong>${MediCare.escapeHtml(a.patientName || '—')}</strong><small>${MediCare.escapeHtml(a.email || a.phone || '')}</small></div>
          <div>${MediCare.formatDate(a.appointmentDate)} ${MediCare.escapeHtml(a.appointmentTime || '')}</div>
          ${MediCare.statusBadge(a.status)}
          <div class="row-actions">
            ${a.status === 'Pending' ? '<button class="btn btn-sm btn-outline" onclick="updateApptStatus(' + (a._id||a.id) + ',\'Confirmed\',this)">Confirm</button>' : ''}
            ${a.status !== 'Cancelled' ? '<button class="btn btn-sm btn-danger" onclick="cancelAppt(' + (a._id||a.id) + ',this)">Cancel</button>' : ''}
          </div>
        </div>`).join('') : '<div class="empty-state">No appointments found.</div>';
    } catch(e) { adminApptList.innerHTML = '<div class="empty-state">Could not load data: ' + e.message + '</div>'; }
  }
});

/* ─── Shared action helpers ─── */
async function cancelAppt(id, btn) {
  if (!confirm('Cancel this appointment?')) return;
  btn.disabled = true;
  try {
    const res = await fetch(MediCare.API + '/appointments/' + id, { method:'DELETE', headers: MediCare.authHeaders() });
    if (res.ok) { btn.closest('.appointment-row').querySelector('.status').textContent = 'Cancelled'; btn.closest('.appointment-row').querySelector('.status').className = 'status cancelled'; btn.remove(); }
    else { alert('Could not cancel appointment.'); btn.disabled = false; }
  } catch { btn.disabled = false; }
}
async function updateApptStatus(id, status, btn) {
  btn.disabled = true;
  try {
    const res = await fetch(MediCare.API + '/appointments/' + id, { method:'PUT', headers: MediCare.authHeaders(), body: JSON.stringify({ status }) });
    if (res.ok) {
      const row = btn.closest('.appointment-row');
      row.querySelector('.status').textContent = status;
      row.querySelector('.status').className = 'status ' + status.toLowerCase();
      row.querySelector('.row-actions').innerHTML = '';
    } else { btn.disabled = false; }
  } catch { btn.disabled = false; }
}