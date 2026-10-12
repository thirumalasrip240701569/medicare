const express = require('express');
const Department = require('../models/Department');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

const router = express.Router();
router.get('/', async (req, res) => res.json(await Department.findAll({ order: [['name', 'ASC']] })));
router.post('/', authenticateToken, authorizeRoles('admin'), async (req, res) => res.status(201).json(await Department.create(req.body)));
router.put('/:id', authenticateToken, authorizeRoles('admin'), async (req, res) => { await Department.update(req.body, { where: { id: req.params.id } }); res.json(await Department.findByPk(req.params.id)); });
router.delete('/:id', authenticateToken, authorizeRoles('admin'), async (req, res) => { await Department.destroy({ where: { id: req.params.id } }); res.json({ message: 'Department removed.' }); });
module.exports = router;
