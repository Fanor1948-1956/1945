const express = require('express')
const router = express.Router()
const permissionController = require('../controllers/permissionController')
const Permission = require('../models/permissionModel.js')
const getDataChart = require('../middleware/getChartData.js')

router.post('/create-permission', permissionController.createPermission)
router.get('/api', permissionController.getAllPermissions)
router.get('/:id', permissionController.getPermissionById)
router.put('/update-permission/:id', permissionController.updatePermission)
router.patch('/:id/deactivate', permissionController.deactivatePermission)
router.patch('/:id/activate', permissionController.activatePermission)
router.delete('/delete/:id', permissionController.deletePermission)
router.get('/api/data-chart', getDataChart(Permission))

module.exports = router
