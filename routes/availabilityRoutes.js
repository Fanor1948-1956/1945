// routes/availabilityRoutes.js
const express = require('express');
const router = express.Router();
const availabilityController = require('../controllers/availabilityController');

router.post('/', availabilityController.createAvailability); // Crear nueva disponibilidad
router.get('/', availabilityController.getAvailability); // Obtener todas las disponibilidades

module.exports = router;
