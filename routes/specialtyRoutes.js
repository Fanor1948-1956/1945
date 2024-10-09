// routes/specialtyRoutes.js
const express = require('express');
const router = express.Router();
const specialtyController = require('../controllers/specialityController');

// Ruta para crear una nueva especialidad
router.post('/', specialtyController.createSpecialty);

// Ruta para obtener todas las especialidades
router.get('/', specialtyController.getAllSpecialties);

// Puedes agregar rutas para actualizar y eliminar especialidades si es necesario

module.exports = router;
