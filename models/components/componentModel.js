const mongoose = require('mongoose');

const ComponentSchema = new mongoose.Schema({
  name: String, // Nombre del componente (ej. "Botón Primario")
  type: String, // Tipo de componente (ej. "button", "card", "input")
  properties: Object, // Propiedades dinámicas (ej. { text: "Enviar", color: "blue" })
  createdAt: { type: Date, default: Date.now }, // Fecha de creación
});

const Component = mongoose.model('Component', ComponentSchema);
module.exports = Component;
