// models/specialtyModel.js

const mongoose = require("mongoose");

const SpecialtySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true, // Eliminar espacios en blanco al principio y al final
    },
    description: {
      type: String,
      required: true,
      trim: true, // Eliminar espacios en blanco al principio y al final
    },
    isActive: {
      type: Boolean,
      default: true, // Las especialidades se activan por defecto
    },
  },
  { timestamps: true }
); // Esta opción añade createdAt y updatedAt automáticamente

const Specialty = mongoose.model("Specialty", SpecialtySchema);
module.exports = Specialty;
