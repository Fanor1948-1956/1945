"use strict";

// utils/modelResolver.js

var _require = require('../models/userModel'),
  User = _require.User;
// const Post = require('../models/post'); // Asegúrate de que el modelo de Post esté disponible
// const Document = require('../models/document'); // Asegúrate de que el modelo de Document esté disponible
var _require2 = require('../models/Specialty'),
  Specialty = _require2.Specialty;
// Función para resolver el modelo basado en el nombre
var resolveModel = function resolveModel(modelName) {
  var models = {
    User: User,
    Specialty: Specialty
    // Post: Post,
    // Document: Document,
    // Agrega más modelos aquí si es necesario
  };
  return models[modelName] || null; // Devuelve null si el modelo no se encuentra
};
module.exports = resolveModel;