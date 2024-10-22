

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router.post('/create', userController.createUser); 
router.get('/getUsers', userController.getUsers); 
router.get('/showInfo/:id', userController.showUserInfo); 
router.put('/update/:id', userController.updateUser); 
router.delete('/delete/:id', userController.deleteUser); 

module.exports = router;
