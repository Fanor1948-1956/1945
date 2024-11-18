const express = require('express')
const router = express.Router()
const specialtyController = require('../controllers/specialityController')
const Specialty = require('../models/Specialty.js')
const getDataChart = require('../middleware/getChartData.js')

router.post('/create-specialty', specialtyController.createSpecialty)
router.get('/api', specialtyController.getAllSpecialties)
router.get('/:id', specialtyController.getSpecialtyById)
router.put('/update-specialty/:id', specialtyController.updateSpecialty)
router.delete('/delete/:id', specialtyController.deleteSpecialty)
router.get('/api/data-chart', getDataChart(Specialty))

module.exports = router
