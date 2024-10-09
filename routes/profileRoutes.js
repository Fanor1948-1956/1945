// routes/profileRoutes.js
const express = require('express');
const router = express.Router();
const {
  viewProfile,
  updateProfile,
} = require('../controllers/profileController');
const { verifyToken } = require('../middleware/authMiddleware'); // Asegúrate de importar el middleware

// Ruta para ver el perfil (protegida)
router.get('/', verifyToken, viewProfile);

// Ruta para actualizar el perfil (protegida)
router.post('/update', verifyToken, updateProfile);

module.exports = router;
