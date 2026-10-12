const app = (() => {
  const apiUrl = '/api'; // Base URL for API requests

  // Function to handle appointment creation
  const createAppointment = async (appointmentData) => {
    try {
      const response = await fetch(`${apiUrl}/appointments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointmentData),
      });

      if (!response.ok) {
        throw new Error('Failed to create appointment');
      }

      const data = await response.json();
      alert('Appointment created successfully!');
      return data;
    } catch (error) {
      console.error('Error creating appointment:', error);
      alert('Error creating appointment. Please try again.');
    }
  };

  // Function to handle form submission
  const handleFormSubmit = (event) => {
    event.preventDefault();
    const appointmentData = {
      patientId: event.target.patientId.value,
      doctorId: event.target.doctorId.value,
      date: event.target.date.value,
      time: event.target.time.value,
    };
    createAppointment(appointmentData);
  };

  // Initialize event listeners
  const init = () => {
    const appointmentForm = document.getElementById('appointment-form');
    if (appointmentForm) {
      appointmentForm.addEventListener('submit', handleFormSubmit);
    }
  };

  return {
    init,
  };
})();

document.addEventListener('DOMContentLoaded', app.init);