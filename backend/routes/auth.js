const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/User');
const Patient = require('../models/Patient');
const demoUsers = require('../utils/demoUsers');
const { isDatabaseConnected } = require('../config/db');

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'Name, email and password are required.' });
    const hashedPassword = await bcrypt.hash(password, 12);
    if (!isDatabaseConnected()) {
      if (demoUsers.has(email.toLowerCase())) return res.status(409).json({ message: 'An account with this email already exists.' });
      const id = crypto.randomUUID();
      const user = { _id: id, id, name, email: email.toLowerCase(), phone, role: 'patient', password: hashedPassword };
      demoUsers.set(user.email, user);
      return res.status(201).json({ message: 'Registration successful in local development mode.', user: { id: user._id, name: user.name, email: user.email, role: user.role } });
    }
    const exists = await User.findOne({ where: { email: email.toLowerCase() } });
    if (exists) return res.status(409).json({ message: 'An account with this email already exists.' });
    const user = await User.create({ name, email: email.toLowerCase(), phone, role: 'patient', password: hashedPassword });
    await Patient.create({ userId: user.id, name, phone });
    res.status(201).json({ message: 'Registration successful.', user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: 'Unable to register right now.', error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const normalizedEmail = email?.toLowerCase();
    const user = isDatabaseConnected() ? await User.findOne({ where: { email: normalizedEmail } }) : demoUsers.get(normalizedEmail);
    if (!user || !(await bcrypt.compare(password || '', user.password))) return res.status(401).json({ message: 'Incorrect email or password.' });
    if (role && user.role !== role) return res.status(403).json({ message: 'This account does not have access to the selected role.' });
    const token = jwt.sign({ id: user.id || user._id, name: user.name, role: user.role }, process.env.JWT_SECRET || 'development-secret', { expiresIn: '1d' });
    res.json({ token, user: { id: user.id || user._id, name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: 'Unable to log in right now.', error: error.message });
  }
});

module.exports = router;
