// utils/modelResolver.js

const { User } = require('../models/userModel');
// const Post = require('../models/post'); // Asegúrate de que el modelo de Post esté disponible
// const Document = require('../models/document'); // Asegúrate de que el modelo de Document esté disponible
const { Specialty } = require('../models/Specialty');
// Función para resolver el modelo basado en el nombre
const resolveModel = (modelName) => {
  const models = {
    User: User,
    Specialty: Specialty,
    // Post: Post,
    // Document: Document,
    // Agrega más modelos aquí si es necesario
  };

  return models[modelName] || null; // Devuelve null si el modelo no se encuentra
};

module.exports = resolveModel;
