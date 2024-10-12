const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController');
const Role = require('../models/roleModel'); // Importa el modelo de roles
const Permission = require('../models/permissionModel'); // Importa el modelo de permisos


// Ruta para ver todos los roles en formato JSON
router.get('/api', roleController.getAllRoles);

// Ruta para renderizar la vista de roles
router.get('/all-roles', async (req, res) => {
  try {
    const roles = await Role.find().populate('permissions'); // Obtener roles
    const permissions = await Permission.find(); // Obtener permisos

    res.render('pages/privatePages/roles.njk', {
      title: 'Lista de Roles',
      roles,
      permissions, // Envía los permisos a la vista
      isAuthenticated: req.session.authenticated,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener roles');
  }
});

// Ruta para crear un nuevo rol
router.post('/create-role', roleController.createRole); // Ruta privada

module.exports = router;
