const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController');

// Define routes
router.post('/create-role', roleController.createRole);
router.get('/api', roleController.getAllRoles);
router.get('/detail-role/:id', roleController.getRoleById);
router.put('/update-role/:id', roleController.updateRole);
router.patch('/:id/deactivate', roleController.deactivateRole);
router.patch('/:id/activate', roleController.activateRole);
router.delete('/delete-role/:id', roleController.deleteRole);

module.exports = router;
