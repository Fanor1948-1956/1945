const mongoose = require('mongoose');

const availabilitySchema = new mongoose.Schema({
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
    type: Number, // Número de citas disponibles para ese día
    required: true,
  },
});

const Availability = mongoose.model('Availability', availabilitySchema);
module.exports = Availability;
