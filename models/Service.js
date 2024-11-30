const mongoose = require('mongoose')

const serviceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    charts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chart' }], // Referencia a los uploads
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
)

const Service = mongoose.model('Service', serviceSchema)
module.exports = Service
