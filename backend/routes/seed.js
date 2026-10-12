/* Seed route – only used in dev to create demo accounts & doctors */
const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');
const Department = require('../models/Department');
const { isDatabaseConnected } = require('../config/db');
const router = express.Router();
router.post('/', async (req, res) => {
  if (!isDatabaseConnected()) return res.status(503).json({ message: 'Database not connected.' });
  try {
    const deptData = [
      { name: 'Heart & Vascular Institute', description: 'Cardiology and heart care.' },
      { name: "Women's Health Department", description: 'Gynecology and maternity care.' },
      { name: 'Neurosciences Department', description: 'Brain and nervous system care.' },
      { name: 'Orthopaedics Department', description: 'Bone, joint, and muscle care.' },
      { name: 'Paediatrics Department', description: 'Dedicated child health care.' },
      { name: 'Dermatology Department', description: 'Skin, hair and nail care.' },
      { name: 'General Medicine', description: 'Primary care and internal medicine.' },
      { name: 'ENT Department', description: 'Ear, nose and throat care.' },
    ];
    for (const d of deptData) await Department.findOrCreate({ where: { name: d.name }, defaults: d });
    const adminHash = await bcrypt.hash('Admin@123', 12);
    const [adminUser] = await User.findOrCreate({ where: { email: 'admin@medicare.local' }, defaults: { name: 'Admin', email: 'admin@medicare.local', password: adminHash, role: 'admin', phone: '9000000001' } });
    const recepHash = await bcrypt.hash('Recep@123', 12);
    await User.findOrCreate({ where: { email: 'recep@medicare.local' }, defaults: { name: 'Receptionist', email: 'recep@medicare.local', password: recepHash, role: 'receptionist', phone: '9000000002' } });
    const patHash = await bcrypt.hash('Patient@123', 12);
    const [patUser] = await User.findOrCreate({ where: { email: 'patient@medicare.local' }, defaults: { name: 'Riya Mehta', email: 'patient@medicare.local', password: patHash, role: 'patient', phone: '9000000003' } });
    await Patient.findOrCreate({ where: { userId: patUser.id }, defaults: { userId: patUser.id, name: patUser.name, phone: patUser.phone } });
    const doctors = [
      { name: 'Dr. Ramesh Kumar', specialization: 'Cardiology', qualification: 'MD, DM Cardiology', experience: 12, department: 'Heart & Vascular Institute', consultationFee: 500, availableDays: JSON.stringify(['Mon','Wed','Fri']), availableTime: '09:00 AM - 01:00 PM', rating: 4.8, about: 'Expert cardiologist with 12 years in interventional cardiology and heart failure management.', image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=600&q=80' },
      { name: 'Dr. Priya Sharma', specialization: 'Gynecology', qualification: 'MBBS, MS Obstetrics', experience: 10, department: "Women's Health Department", consultationFee: 600, availableDays: JSON.stringify(['Tue','Thu','Sat']), availableTime: '10:00 AM - 02:00 PM', rating: 4.9, about: 'Leading gynaecologist specialising in high-risk pregnancies and minimally invasive procedures.', image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=600&q=80' },
      { name: 'Dr. Arjun Patel', specialization: 'Neurology', qualification: 'MD, DM Neurology', experience: 8, department: 'Neurosciences Department', consultationFee: 700, availableDays: JSON.stringify(['Mon','Thu','Sat']), availableTime: '11:00 AM - 03:00 PM', rating: 4.7, about: 'Specialist in stroke management, epilepsy and movement disorders.', image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80' },
      { name: 'Dr. Sunita Verma', specialization: 'Pediatrics', qualification: 'MBBS, MD Paediatrics', experience: 14, department: 'Paediatrics Department', consultationFee: 450, availableDays: JSON.stringify(['Mon','Tue','Wed','Thu','Fri']), availableTime: '09:00 AM - 12:00 PM', rating: 4.9, about: 'Dedicated paediatrician providing comprehensive child healthcare from infancy to adolescence.', image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80' },
      { name: 'Dr. Vikram Singh', specialization: 'Orthopedics', qualification: 'MBBS, MS Orthopaedics', experience: 16, department: 'Orthopaedics Department', consultationFee: 600, availableDays: JSON.stringify(['Tue','Thu','Sat']), availableTime: '10:00 AM - 01:00 PM', rating: 4.6, about: 'Expert in joint replacements, sports injuries and complex fracture management.', image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&q=80' },
      { name: 'Dr. Anjali Rao', specialization: 'Dermatology', qualification: 'MBBS, MD Dermatology', experience: 7, department: 'Dermatology Department', consultationFee: 500, availableDays: JSON.stringify(['Wed','Fri','Sat']), availableTime: '11:00 AM - 04:00 PM', rating: 4.8, about: 'Specialist in medical and cosmetic dermatology, treating conditions like psoriasis and acne.', image: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&w=600&q=80' },
    ];
    const doctorHash = await bcrypt.hash('Doctor@123', 12);
    for (const d of doctors) {
      const email = d.name.toLowerCase().replace(/dr\.\s*/,'').replace(/\s+/g,'.') + '@medicare.local';
      const [docUser] = await User.findOrCreate({ where: { email }, defaults: { name: d.name, email, password: doctorHash, role: 'doctor', phone: '9000000010' } });
      await Doctor.findOrCreate({ where: { userId: docUser.id }, defaults: { ...d, userId: docUser.id, hospital: 'MediCare Central Hospital' } });
    }
    res.json({ message: 'Demo data seeded successfully.', accounts: { admin: 'admin@medicare.local / Admin@123', receptionist: 'recep@medicare.local / Recep@123', patient: 'patient@medicare.local / Patient@123', doctor: 'ramesh.kumar@medicare.local / Doctor@123' } });
  } catch (error) { res.status(500).json({ message: 'Seed failed.', error: error.message }); }
});
module.exports = router;
