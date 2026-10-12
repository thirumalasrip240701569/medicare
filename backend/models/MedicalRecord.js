const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const addLegacyId = require('./legacyId');

const MedicalRecord = sequelize.define('MedicalRecord', {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  patientId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
  doctorId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
  appointmentId: DataTypes.INTEGER.UNSIGNED,
  diagnosis: DataTypes.TEXT,
  notes: DataTypes.TEXT,
  treatment: DataTypes.TEXT
}, { tableName: 'medical_records', timestamps: true });

module.exports = addLegacyId(MedicalRecord);
