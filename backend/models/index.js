const User = require('./User');
const Patient = require('./Patient');
const Doctor = require('./Doctor');
const Appointment = require('./Appointment');
const Department = require('./Department');
const Prescription = require('./Prescription');
const MedicalRecord = require('./MedicalRecord');

User.hasOne(Patient, { foreignKey: 'userId' });
Patient.belongsTo(User, { foreignKey: 'userId' });
Doctor.hasMany(Appointment, { foreignKey: 'doctorId', as: 'appointments' });
Appointment.belongsTo(Doctor, { foreignKey: 'doctorId', as: 'doctor' });
Department.hasMany(Appointment, { foreignKey: 'departmentId' });
Appointment.belongsTo(Department, { foreignKey: 'departmentId' });

module.exports = { User, Patient, Doctor, Appointment, Department, Prescription, MedicalRecord };