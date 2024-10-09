// models/specialtyModel.js

const mongoose = require('mongoose');

const SpecialtySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  // Este campo contendrá las referencias a los horarios de atención, comenzando como un arreglo vacío
  appointmentHours: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'AppointmentHours',
      default: [],
    },
  ],
});

const Specialty = mongoose.model('Specialty', SpecialtySchema);
module.exports = Specialty;
