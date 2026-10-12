const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const addLegacyId = require('./legacyId');

const Appointment = sequelize.define('Appointment', {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  patientId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
  doctorId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
  departmentId: DataTypes.INTEGER.UNSIGNED,
  appointmentDate: { type: DataTypes.DATE, allowNull: false },
  appointmentTime: { type: DataTypes.STRING, allowNull: false },
  patientName: DataTypes.STRING,
  patientAge: DataTypes.INTEGER,
  patientGender: DataTypes.STRING,
  phone: DataTypes.STRING,
  email: DataTypes.STRING,
  reason: DataTypes.TEXT,
  notes: DataTypes.TEXT,
  status: { type: DataTypes.ENUM('Pending', 'Confirmed', 'Cancelled', 'Completed'), defaultValue: 'Pending' }
}, { tableName: 'appointments', timestamps: true });

module.exports = addLegacyId(Appointment);
