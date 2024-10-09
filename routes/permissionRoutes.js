const express = require('express');
const router = express.Router();
const permissionController = require('../controllers/permissionController');

// const isAuthenticated = require('../middleware/auth');

// router.get('/api/all-permissions', permissionController.getPermissions);

// Ruta para renderizar la vista de roles

router.post(
  '/create-permission',

  permissionController.createPermission
);

module.exports = router;
