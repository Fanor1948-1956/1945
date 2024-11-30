const express = require('express');
const router = express.Router();
const locationController = require('../controllers/locationController');

// Ruta para registrar la ubicación
router.post('/register-location', locationController.registerLocation);

// Ruta para obtener todas las ubicaciones
router.get('/locations', locationController.getAllLocations);

module.exports = router;
