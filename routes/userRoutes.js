const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Rutas para el manejo de usuarios
router.post('/create', userController.createUser); // Crear un nuevo usuario
router.get('/getUsers', userController.getUsers); // Obtener todos los usuarios
router.get('/showInfo/:id', userController.showUserInfo); // Mostrar información de un usuario
router.put('/update/:id', userController.updateUser); // Actualizar un usuario
router.delete('/delete/:id', userController.deleteUser); // Eliminar un usuario

// Rutas para activar y desactivar usuarios
router.put('/activate/:id', userController.activateById);
router.put('/deactivate/:id', userController.deactivateById);

module.exports = router;
