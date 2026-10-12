require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const { connectDatabase } = require('./config/db');
require('./models');
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'frontend')));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/doctors', require('./routes/doctors'));
app.use('/api/appointments', require('./routes/appointments'));
app.use('/api/departments', require('./routes/departments'));
app.use('/api/seed', require('./routes/seed'));
app.use('/api', require('./routes/records'));
app.get('/api/health', (req, res) => res.json({ status: 'ok', service: 'MediCare API' }));
const { authenticateToken, authorizeRoles } = require('./middleware/auth');
const User = require('./models/User');
const Doctor = require('./models/Doctor');
const Appointment = require('./models/Appointment');
const Department = require('./models/Department');
app.get('/api/stats', authenticateToken, authorizeRoles('admin','receptionist'), async (req, res) => {
  try {
    const today = new Date(); today.setHours(0,0,0,0);
    const tomorrow = new Date(today); tomorrow.setDate(today.getDate()+1);
    const { Op } = require('sequelize');
    const [totalDoctors,totalPatients,todayAppts,pendingAppts,totalAppts,confirmedAppts,completedAppts,departments] = await Promise.all([
      Doctor.count(),
      User.count({ where: { role: 'patient' } }),
      Appointment.count({ where: { appointmentDate: { [Op.gte]: today, [Op.lt]: tomorrow } } }),
      Appointment.count({ where: { status: 'Pending' } }),
      Appointment.count(),
      Appointment.count({ where: { status: 'Confirmed' } }),
      Appointment.count({ where: { status: 'Completed' } }),
      Department.count(),
    ]);
    res.json({ totalDoctors,totalPatients,todayAppts,pendingAppts,totalAppts,confirmedAppts,completedAppts,departments });
  } catch(e) { res.status(500).json({ message: e.message }); }
});
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html')));
const server = app.listen(port, () => console.log('MediCare running at http://localhost:' + port));
server.on('error', error => {
  if (error.code === 'EADDRINUSE') { console.error('Port ' + port + ' is already in use.'); process.exit(1); }
  throw error;
});
connectDatabase();