// routes/chartRoutes.js
const express = require('express')
const { generateCharts } = require('../controllers/chartController.js')
const Chart = require('../models/chartModel.js') // Asegúrate de importar el modelo Chart
const router = express.Router()
const {
  deleteObjectMiddleware,
  activateObjectMiddleware,
  deactivateObjectMiddleware
} = require('../middleware/deactiveActiveDeleteItem.js')

const { generateReport } = require('../generate/generateReport')

router.get('/generate-report', generateReport)

// Ruta para generar los gráficos
router.get('/generate-charts', generateCharts)

// Controlador para obtener las imágenes guardadas
router.get('/charts', async (req, res) => {
  try {
    const charts = await Chart.find() // Busca todas las imágenes guardadas
    res.json(charts) // Devuelve las imágenes como JSON
  } catch (error) {
    res.status(500).json({ error: 'Error al recuperar los gráficos' })
  }
})
// Rutas para activar, desactivar y eliminar objetos, también usando modelName
router.delete('/delete-object', deleteObjectMiddleware)
router.post('/activate-object', activateObjectMiddleware)
router.post('/deactivate-object', deactivateObjectMiddleware)

module.exports = router
