// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Rutas de usuarios
router.get('/createUser', userController.createUser); // Obtener todos los usuarios
router.get('/getUsers', userController.getUsers); // Obtener todos los usuarios
router.get('/showInfo/:id', userController.showUserInfo); // Obtener formulario de edición de un usuario
router.put('/update/:id', userController.updateUser); // Actualizar un usuario
router.delete('/:id', userController.deleteUser); // Eliminar un usuario

module.exports = router;
