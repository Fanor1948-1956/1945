const express = require('express');
const router = express.Router();
const permissionController = require('../controllers/permissionController');


router.post('/create-permission', permissionController.createPermission);
router.get('/api', permissionController.getAllPermissions);
router.get('/:id', permissionController.getPermissionById);
router.put('/update-permission/:id', permissionController.updatePermission);
router.patch('/:id/deactivate', permissionController.deactivatePermission);
router.patch('/:id/activate', permissionController.activatePermission);
router.delete('/delete/:id', permissionController.deletePermission);

module.exports = router;
