

const express = require('express');
const router = express.Router();
const { User } = require('../models/userModel');


router.get('/api/users', async (req, res) => {
  try {
    const users = await User.find().populate('roles'); 
    res.json(users); 
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
});

module.exports = router;
