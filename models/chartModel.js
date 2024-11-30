const mongoose = require('mongoose')

const chartSchema = new mongoose.Schema(
  {
    modelName: { type: String },
    year: { type: Number },
    imageData: { type: String, required: true }, // Imágenes en formato base64
    isActive: { type: Boolean, default: true }
  },

  { timestamps: true }
)

const Chart = mongoose.model('Chart', chartSchema)

module.exports = Chart
