const express = require('express');
const { Op } = require('sequelize');
const Doctor = require('../models/Doctor');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

const router = express.Router();
const demoDoctors = [
  { _id: 'demo-ramesh', name: 'Dr. Ramesh Kumar', specialization: 'Cardiology', qualification: 'MD, DM Cardiology', experience: 12, department: 'Heart & Vascular Institute', hospital: 'MediCare Central Hospital', consultationFee: 500, availableDays: ['Mon', 'Wed', 'Fri'], availableTime: '09:00 AM - 01:00 PM', rating: 4.8, image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=600&q=80' },
  { _id: 'demo-priya', name: 'Dr. Priya Sharma', specialization: 'Gynecology', qualification: 'MBBS, MS Obstetrics', experience: 10, department: "Women's Health Department", hospital: 'MediCare Central Hospital', consultationFee: 600, availableDays: ['Tue', 'Thu', 'Sat'], availableTime: '10:00 AM - 02:00 PM', rating: 4.9, image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=600&q=80' },
  { _id: 'demo-arjun', name: 'Dr. Arjun Patel', specialization: 'Neurology', qualification: 'MD, DM Neurology', experience: 8, department: 'Neurosciences Department', hospital: 'MediCare Central Hospital', consultationFee: 700, availableDays: ['Mon', 'Thu', 'Sat'], availableTime: '11:00 AM - 03:00 PM', rating: 4.7, image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80' }
];

router.get('/', async (req, res) => {
  try {
    const where = req.query.specialization ? { specialization: { [Op.like]: `%${req.query.specialization}%` } } : undefined;
    const doctors = await Doctor.findAll({ where, order: [['rating', 'DESC']] });
    res.json(doctors.length ? doctors : demoDoctors);
  } catch {
    res.json(demoDoctors);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const doctor = await Doctor.findByPk(req.params.id);
    res.json(doctor || demoDoctors.find(item => item._id === req.params.id) || demoDoctors[0]);
  } catch {
    res.json(demoDoctors.find(item => item._id === req.params.id) || demoDoctors[0]);
  }
});

router.post('/', authenticateToken, authorizeRoles('admin'), async (req, res) => res.status(201).json(await Doctor.create(req.body)));
router.put('/:id', authenticateToken, authorizeRoles('admin'), async (req, res) => { await Doctor.update(req.body, { where: { id: req.params.id } }); res.json(await Doctor.findByPk(req.params.id)); });
router.delete('/:id', authenticateToken, authorizeRoles('admin'), async (req, res) => { await Doctor.destroy({ where: { id: req.params.id } }); res.json({ message: 'Doctor removed.' }); });

module.exports = router;
