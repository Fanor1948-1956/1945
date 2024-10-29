// models/upload.js

const mongoose = require('mongoose');

const uploadSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  path: { type: String, required: true },
  mimeType: { type: String, required: true },
  size: { type: Number, required: true },
  uploadedAt: { type: Date, default: Date.now },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'ownerModel', // Se refiere dinámicamente a distintos modelos
    required: true,
  },
  ownerModel: {
    type: String,
    required: true, // Sin enum para permitir más flexibilidad
  },
  description: { type: String }, // Descripción opcional del archivo
  isSelected: { type: Boolean, default: false },
});

// Agregar un método para verificar si el archivo existe
uploadSchema.statics.exists = async function (id) {
  return await this.exists({ _id: id });
};

const Upload = mongoose.model('Upload', uploadSchema);

module.exports = Upload;
