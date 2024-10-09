const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const responseTypeMiddleware = require('../middleware/responseTypeMiddleware');
router.use(responseTypeMiddleware);
// Rutas para usuarios
router.post('/register', authController.register);
router.post('/login', authController.login);

router.get('/logout', authController.logout);

module.exports = router;
