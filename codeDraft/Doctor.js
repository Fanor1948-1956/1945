

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
