const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const responseTypeMiddleware = require('../middleware/responseTypeMiddleware');
const { isNotAuthenticated } = require('../middleware/authMiddleware');
router.use(responseTypeMiddleware);

router.post('/register', authController.register);
router.post('/login', authController.login);

router.post('/logout', authController.logout);

module.exports = router;
