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
    type: Number, 
    required: true,
  },
});

const Availability = mongoose.model('Availability', availabilitySchema);
module.exports = Availability;
