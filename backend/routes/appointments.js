const express = require('express');
const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');
const User = require('../models/User');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const { Op } = require('sequelize');

const router = express.Router();
router.use(authenticateToken);

router.post('/', async (req, res) => {
  try {
    const appointment = await Appointment.create({ ...req.body, patientId: req.user.id });
    res.status(201).json({ message: 'Appointment request received.', appointment });
  } catch (error) {
    res.status(400).json({ message: 'Please check the appointment details.', error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    let where = {};
    if (req.user.role === 'patient') {
      where = { patientId: req.user.id };
    } else if (req.user.role === 'doctor') {
      const doctor = await Doctor.findOne({ where: { userId: req.user.id } });
      if (doctor) where = { doctorId: doctor.id };
    }
    const appointments = await Appointment.findAll({ where, include: { model: Doctor, as: 'doctor' }, order: [['appointmentDate', 'ASC']] });
    res.json(appointments.map(a => { const r = a.toJSON(); r.doctorId = r.doctor || r.doctorId; delete r.doctor; return r; }));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findByPk(req.params.id, { include: { model: Doctor, as: 'doctor' } });
    if (!appointment) return res.status(404).json({ message: 'Appointment not found.' });
    const result = appointment.toJSON();
    result.doctorId = result.doctor || result.doctorId;
    delete result.doctor;
    res.json(result);
  } catch (error) { res.status(500).json({ message: error.message }); }
});

router.put('/:id', async (req, res) => {
  try {
    await Appointment.update(req.body, { where: { id: req.params.id } });
    res.json(await Appointment.findByPk(req.params.id));
  } catch (error) { res.status(500).json({ message: error.message }); }
});

router.delete('/:id', async (req, res) => {
  try {
    await Appointment.update({ status: 'Cancelled' }, { where: { id: req.params.id } });
    res.json({ message: 'Appointment cancelled.' });
  } catch (error) { res.status(500).json({ message: error.message }); }
});

module.exports = router;
