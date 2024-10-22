const mongoose = require('mongoose');

const appointmentHoursSchema = new mongoose.Schema({
  specialty: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Specialty',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  availableSlots: {
    type: Number, 
    required: true,
  },
});

const AppointmentHour = mongoose.model(
  'AppointmentHour',
  appointmentHoursSchema
);
module.exports = AppointmentHour;
