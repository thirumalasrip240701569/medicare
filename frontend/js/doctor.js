document.addEventListener('DOMContentLoaded', async () => {
  const target = document.querySelector('[data-doctor-profile]');
  if (!target) return;
  const id = new URLSearchParams(location.search).get('id');
  if (!id) { target.innerHTML = '<p class="empty-state">No doctor selected.</p>'; return; }
  try {
    const res = await fetch(MediCare.API + '/doctors/' + id);
    const doctor = await res.json();
    const days = Array.isArray(doctor.availableDays) ? doctor.availableDays.join(', ') : (doctor.availableDays || '—');
    target.innerHTML = `
      <img class="doctor-photo" src="${MediCare.escapeHtml(doctor.image || '')}" alt="${MediCare.escapeHtml(doctor.name)}" style="width:100%;max-height:380px;object-fit:cover;border-radius:18px;margin-bottom:24px" onerror="this.style.display='none'">
      <div class="eyebrow">${MediCare.escapeHtml(doctor.specialization)}</div>
      <h1>${MediCare.escapeHtml(doctor.name)}</h1>
      <p class="doctor-specialty">${MediCare.escapeHtml(doctor.qualification || '')}</p>
      <p style="color:var(--muted);margin:14px 0">${MediCare.escapeHtml(doctor.about || 'A compassionate specialist focused on thoughtful, evidence-based care for every patient.')}</p>
      <div class="doctor-meta" style="margin:20px 0">
        <span>🏥 ${doctor.experience} years experience</span>
        <span>📍 ${MediCare.escapeHtml(doctor.department)}, ${MediCare.escapeHtml(doctor.hospital || 'MediCare Central Hospital')}</span>
        <span>📅 Available ${days} &bull; ${MediCare.escapeHtml(doctor.availableTime || '')}</span>
      </div>
      <div class="doctor-bottom" style="margin-bottom:28px">
        <span class="rating">⭐ ${doctor.rating} patient rating</span>
        <span class="fee">₹${doctor.consultationFee} consultation</span>
      </div>
      <a class="btn btn-primary" href="appointment.html?doctor=${doctor._id}" style="min-width:200px">Book Appointment</a>
    `;
  } catch(e) {
    target.innerHTML = '<p class="empty-state">Could not load doctor profile.</p>';
  }
});