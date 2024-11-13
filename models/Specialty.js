const mongoose = require('mongoose')

const SpecialtySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },

    charts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chart' }], // Referencia a los uploads

    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
)

const Specialty = mongoose.model('Specialty', SpecialtySchema)
module.exports = Specialty
