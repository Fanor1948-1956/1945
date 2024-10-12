// const express = require('express');
// const router = express.Router();
// const permissionController = require('../controllers/permissionController');

// // const isAuthenticated = require('../middleware/auth');

// // router.get('/api/all-permissions', permissionController.getPermissions);

// // Ruta para renderizar la vista de roles

// router.post(
//   '/create-permission',

//   permissionController.createPermission
// );

// module.exports = router;

// routes/permissionRoutes.js
const express = require('express');
const router = express.Router();
const permissionController = require('../controllers/permissionController');

// Define routes
router.post('/create-permission', permissionController.createPermission);
router.get('/api', permissionController.getAllPermissions);
router.get('/:id', permissionController.getPermissionById);
router.put('/:id', permissionController.updatePermission);
router.patch('/:id/deactivate', permissionController.deactivatePermission);
router.patch('/:id/activate', permissionController.activatePermission);
router.delete('/:id', permissionController.deletePermission);

module.exports = router;
