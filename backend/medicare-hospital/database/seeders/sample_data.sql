INSERT INTO users (id, username, password, role) VALUES
(1, 'admin', 'admin_password', 'admin'),
(2, 'doctor1', 'doctor_password', 'doctor'),
(3, 'patient1', 'patient_password', 'patient');

INSERT INTO doctors (id, name, specialization, contact) VALUES
(1, 'Dr. John Smith', 'Cardiology', '123-456-7890'),
(2, 'Dr. Jane Doe', 'Neurology', '098-765-4321');

INSERT INTO patients (id, name, date_of_birth, contact) VALUES
(1, 'Alice Johnson', '1990-01-15', '555-1234'),
(2, 'Bob Brown', '1985-05-30', '555-5678');

INSERT INTO appointments (id, patient_id, doctor_id, appointment_date, status) VALUES
(1, 1, 1, '2023-10-01 10:00:00', 'scheduled'),
(2, 2, 2, '2023-10-02 11:00:00', 'scheduled');