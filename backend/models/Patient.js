const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const addLegacyId = require('./legacyId');

const Patient = sequelize.define('Patient', {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  userId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, unique: true },
  name: { type: DataTypes.STRING, allowNull: false },
  age: { type: DataTypes.INTEGER },
  phone: DataTypes.STRING,
  medicalDetails: { type: DataTypes.TEXT, defaultValue: '' }
}, { tableName: 'patients', timestamps: true });

module.exports = addLegacyId(Patient);
