
const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');
const { verifyToken } = require('../middleware/authMiddleware');


router.get('/', verifyToken, serviceController.getAllServices);


router.post('/create-service', verifyToken, serviceController.createService);

module.exports = router;
