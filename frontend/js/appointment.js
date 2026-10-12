document.addEventListener('DOMContentLoaded', async () => {
  const form = document.querySelector('[data-appointment-form]');
  if (!form) return;
  const doctorSelect = form.querySelector('[name="doctorId"]');
  try { const doctors = await MediCare.fetchDoctors(); doctorSelect.innerHTML = '<option value="">Select doctor</option>' + doctors.map(doctor => `<option value="${doctor._id}">${doctor.name} · ${doctor.specialization}</option>`).join(''); const selected = new URLSearchParams(location.search).get('doctor'); if (selected) doctorSelect.value = selected; } catch {}
  form.addEventListener('submit', async event => {
    event.preventDefault();
    const message = form.querySelector('.message'); const data = Object.fromEntries(new FormData(form));
    if (new Date(data.appointmentDate) < new Date(new Date().toDateString())) return MediCare.setMessage(message, 'Please select a future appointment date.');
    if (!localStorage.getItem('medicareToken')) return MediCare.setMessage(message, 'Please sign in before booking an appointment.');
    try { const response = await fetch(`${MediCare.API}/appointments`, { method:'POST', headers:MediCare.authHeaders(), body:JSON.stringify(data) }); const result = await response.json(); if (!response.ok) throw new Error(result.message); form.hidden = true; document.querySelector('[data-confirmation]').hidden = false; document.querySelector('[data-appointment-id]').textContent = result.appointment._id; document.querySelector('[data-confirm-name]').textContent = data.patientName; document.querySelector('[data-confirm-date]').textContent = `${data.appointmentDate} at ${data.appointmentTime}`; } catch (error) { MediCare.setMessage(message, error.message); }
  });
});
