const express = require('express')
const router = express.Router()
const roleController = require('../controllers/roleController')
const roleModel = require('../models/roleModel.js')
const getDataChart = require('../middleware/getChartData.js')

router.post('/create-role', roleController.createRole)
router.get('/api', roleController.getAllRoles)
router.get('/detail-role/:id', roleController.getRoleById)
router.put('/update-role/:id', roleController.updateRole)
router.patch('/:id/deactivate', roleController.deactivateRole)
router.patch('/:id/activate', roleController.activateRole)
router.delete('/delete/:id', roleController.deleteRole)
router.get('/data-chart', getDataChart(roleModel))

module.exports = router
