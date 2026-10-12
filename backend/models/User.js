const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const addLegacyId = require('./legacyId');

const User = sequelize.define('User', {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.ENUM('patient', 'doctor', 'receptionist', 'admin'), defaultValue: 'patient' },
  phone: DataTypes.STRING
}, { tableName: 'users', timestamps: true });

module.exports = addLegacyId(User);
