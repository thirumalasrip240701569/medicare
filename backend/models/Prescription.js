const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const addLegacyId = require('./legacyId');

const Prescription = sequelize.define('Prescription', {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  patientId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
  doctorId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
  appointmentId: DataTypes.INTEGER.UNSIGNED,
  medicines: DataTypes.JSON,
  instructions: DataTypes.TEXT
}, { tableName: 'prescriptions', timestamps: true });

module.exports = addLegacyId(Prescription);
