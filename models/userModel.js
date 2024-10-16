// models/userModel.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    surnames: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: {
      type: String,
      enum: ["masculino", "femenino", "otro"],
      required: true,
    },
    roles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Role" }],
    isActive: {
      type: Boolean,
      default: true, // Las especialidades se activan por defecto
    },
  },
  { timestamps: true }
);

// Definir discriminadores para los diferentes tipos de usuarios
const User = mongoose.model('User', userSchema);

const Admin = User.discriminator(
  'Admin',
  new mongoose.Schema({
    adminLevel: { type: String },
  })
);
const ChiefMedical = User.discriminator(
  'ChiefMedical',
  new mongoose.Schema({
    department: { type: String },
    specialties: { type: mongoose.Schema.Types.ObjectId, ref: 'Speciality' }, //se llena al actualiar//e n princpio array vacio
  })
);
const Doctor = User.discriminator(
  'Doctor',
  new mongoose.Schema({
    specialties: { type: mongoose.Schema.Types.ObjectId, ref: 'Speciality' }, //se llena al actualiar//e n princpio array vacio
    schedule: { type: mongoose.Schema.Types.ObjectId, ref: 'Schedule' }, //se llena al actualiar //e n princpio array vacio
    city: { type: String },
  })
);
const Patient = User.discriminator(
  'Patient',
  new mongoose.Schema({
    appointments: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' }, //se llena al actualiar//e n princpio array vacio
    medicalHistory: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'historyClinic' }, //se llena al actualiar//e n princpio array vacio
    ],
  })
);

// Exportar el modelo User y los demás discriminadores
module.exports = { User, Patient, Doctor, Admin, ChiefMedical };
