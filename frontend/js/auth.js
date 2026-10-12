document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('[data-auth-form]');
  if (!form) return;
  form.addEventListener('submit', async event => {
    event.preventDefault();
    const message = form.querySelector('.message');
    const data = Object.fromEntries(new FormData(form));
    if (form.dataset.mode === 'register' && data.password !== data.confirmPassword) return MediCare.setMessage(message, 'Passwords do not match.');
    try {
      const response = await fetch(`${MediCare.API}/auth/${form.dataset.mode}`, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(data) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message);
      if (form.dataset.mode === 'register') { MediCare.setMessage(message, 'Account created. You can now sign in.', 'success'); setTimeout(() => location.href = 'login.html', 700); }
      else { MediCare.saveSession(result); location.href = `${result.user.role}-dashboard.html`; }
    } catch (error) { MediCare.setMessage(message, error.message); }
  });
});
