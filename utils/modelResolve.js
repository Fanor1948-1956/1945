const { User } = require('../models/userModel')
const Role = require('../models/roleModel')
const Permission = require('../models/permissionModel')
const Specialty = require('../models/Specialty')
const ChartModel = require('../models/chartModel') // Asegúrate de que este modelo esté correctamente importado

// Función para resolver el modelo basado en el nombre
const resolveModel = modelName => {
  const models = {
    User: User,
    Role: Role,
    Permission: Permission,
    Specialty: Specialty,
    Chart: ChartModel // Cambié el nombre a ChartModel

    // Si agregas más modelos, asegúrate de que tengan la misma capitalización
    // Post: Post,
    // Document: Document,
    // Agrega más modelos aquí si es necesario
  }

  return models[modelName] || null // Devuelve null si el modelo no se encuentra
}

module.exports = resolveModel
