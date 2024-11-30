const express = require('express')
const router = express.Router()
const {
  createSchedule,
  listSchedules
} = require('../controllers/scheduleController') // Importamos el controlador

// Ruta para crear un nuevo horario
router.post('/create', createSchedule)

// Ruta para listar todos los horarios
router.get('/all', listSchedules)

module.exports = router
