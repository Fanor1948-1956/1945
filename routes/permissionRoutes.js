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
router.get('/details-permission/:id', permissionController.getPermissionById);
router.put('/update-permission/:id', permissionController.updatePermission);
router.patch(
  '/:id/deactivate-permission',
  permissionController.deactivatePermission
);
router.patch(
  '/:id/activate-permission',
  permissionController.activatePermission
);
router.delete('/delete-permission/:id', permissionController.deletePermission);

module.exports = router;
