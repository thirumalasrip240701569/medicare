const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const addLegacyId = require('./legacyId');

const Department = sequelize.define('Department', {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false, unique: true },
  description: DataTypes.TEXT
}, { tableName: 'departments', timestamps: true });

module.exports = addLegacyId(Department);
