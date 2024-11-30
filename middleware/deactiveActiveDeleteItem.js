const resolveModel = require('../utils/modelResolve.js') // Resolver el modelo dinámicamente

// Middleware para eliminar un objeto (usuario, citas médicas, etc.) y sus estadísticas o referencias relacionadas
async function deleteObjectMiddleware (req, res) {
  try {
    const { modelName, objectId, modelNameSubObject, subObjectId } = req.query

    // Validación de los parámetros
    if (!modelName) {
      return res.status(400).send("El parámetro 'modelName' es obligatorio.")
    }

    // Resolver el modelo principal dinámicamente usando resolveModel
    const Model = resolveModel(modelName)

    // Si se está trabajando con un subobjeto (referencia o estadísticas)
    if (modelNameSubObject && subObjectId) {
      if (!modelNameSubObject || !subObjectId) {
        return res
          .status(400)
          .send(
            "Se requieren 'modelNameSubObject' y 'subObjectId' para eliminar las estadísticas."
          )
      }

      // Resolver el modelo del subobjeto explícitamente (no dinámicamente)
      const SubObjectModel = require(`../models/${modelNameSubObject}`)

      // Eliminar las estadísticas asociadas al subobjeto
      const deletedStats = await SubObjectModel.deleteMany({ _id: subObjectId })

      if (deletedStats.deletedCount > 0) {
        return res.json({
          message: `Estadísticas o subobjetos relacionados con el ID ${subObjectId} eliminados correctamente.`,
          deletedStatsCount: deletedStats.deletedCount
        })
      } else {
        return res.json({
          message: `No se encontraron estadísticas o subobjetos con ID ${subObjectId} para eliminar.`
        })
      }
    } else {
      // Si solo se pasa el objectId, eliminar el objeto principal
      if (!objectId) {
        return res
          .status(400)
          .send("Se requiere 'objectId' para eliminar el objeto principal.")
      }

      // Eliminar el objeto principal (por ejemplo, el Usuario)
      const deleteMainObject = await Model.findById(objectId)
      if (!deleteMainObject) {
        return res
          .status(404)
          .send(`${modelName} con ID ${objectId} no encontrado.`)
      }

      await Model.findByIdAndDelete(objectId)

      return res.json({
        message: `${modelName} con ID ${objectId} eliminado correctamente.`
      })
    }
  } catch (err) {
    console.error('Error al eliminar objeto y estadísticas:', err)
    return res
      .status(500)
      .json({ error: 'Error al eliminar objeto y estadísticas.' })
  }
}

// Middleware para activar un objeto
async function activateObjectMiddleware (req, res, next) {
  try {
    const { modelName, objectId } = req.query

    if (!modelName || !objectId) {
      return res
        .status(400)
        .send('Los parámetros "modelName" y "objectId" son obligatorios')
    }

    const Model = resolveModel(modelName)
    const result = await Model.findByIdAndUpdate(
      objectId,
      { active: true },
      { new: true }
    )

    if (!result) {
      return res.status(404).send('Objeto no encontrado')
    }

    res.json({ message: 'Objeto activado correctamente', data: result })
  } catch (error) {
    console.error('Error al activar el objeto:', error.message)
    res.status(500).json({ error: 'Error interno al activar el objeto' })
  }
}

// Middleware para desactivar un objeto
async function deactivateObjectMiddleware (req, res, next) {
  try {
    const { modelName, objectId } = req.query

    if (!modelName || !objectId) {
      return res
        .status(400)
        .send('Los parámetros "modelName" y "objectId" son obligatorios')
    }

    const Model = resolveModel(modelName)
    const result = await Model.findByIdAndUpdate(
      objectId,
      { active: false },
      { new: true }
    )

    if (!result) {
      return res.status(404).send('Objeto no encontrado')
    }

    res.json({ message: 'Objeto desactivado correctamente', data: result })
  } catch (error) {
    console.error('Error al desactivar el objeto:', error.message)
    res.status(500).json({ error: 'Error interno al desactivar el objeto' })
  }
}

module.exports = {
  deleteObjectMiddleware,
  activateObjectMiddleware,
  deactivateObjectMiddleware
}
