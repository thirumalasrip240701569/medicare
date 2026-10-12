const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const addLegacyId = require('./legacyId');

const Doctor = sequelize.define('Doctor', {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  userId: DataTypes.INTEGER.UNSIGNED,
  name: { type: DataTypes.STRING, allowNull: false },
  specialization: { type: DataTypes.STRING, allowNull: false },
  qualification: DataTypes.STRING,
  experience: DataTypes.INTEGER,
  department: DataTypes.STRING,
  hospital: { type: DataTypes.STRING, defaultValue: 'MediCare Central Hospital' },
  consultationFee: DataTypes.DECIMAL(10, 2),
  availableDays: DataTypes.JSON,
  availableTime: DataTypes.STRING,
  rating: { type: DataTypes.DECIMAL(2, 1), defaultValue: 4.8 },
  about: DataTypes.TEXT,
  image: DataTypes.STRING
}, { tableName: 'doctors', timestamps: true });

module.exports = addLegacyId(Doctor);
