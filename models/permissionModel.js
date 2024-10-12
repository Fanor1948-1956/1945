// models/permissionModel.js
const mongoose = require('mongoose');

const PermissionSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true }, // Descripción de la permiso
  isActive: { type: Boolean, default: true }, // Estado del permiso
  createdAt: { type: Date, default: Date.now }, // Fecha de creación
});

module.exports = mongoose.model('Permission', PermissionSchema);
