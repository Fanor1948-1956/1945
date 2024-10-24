// routes/profileRoutes.js
const express = require('express');
const router = express.Router();
const {
  viewProfile,
  updateProfile,
} = require('../controllers/profileController');
const { verifyToken } = require('../middleware/authMiddleware'); // Asegúrate de importar el middleware

// Ruta para ver el perfil (protegida)
router.get('/profile', verifyToken, viewProfile);
router.post('/update', verifyToken, updateProfile);

module.exports = router;
