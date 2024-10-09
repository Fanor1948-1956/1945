// routes/serviceRoutes.js
const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');
const { verifyToken } = require('../middleware/authMiddleware');

// Ruta para ver todos los servicios (pública)
router.get('/', verifyToken, serviceController.getAllServices);

// Ruta para crear un nuevo servicio (privada)
router.post('/create-service', verifyToken, serviceController.createService);

module.exports = router;
