// routes/api.js

const express = require('express');
const router = express.Router();
const { User } = require('../models/userModel');

// Ruta API para obtener todos los usuarios en formato JSON
router.get('/api/users', async (req, res) => {
  try {
    const users = await User.find().populate('roles'); // Obtener todos los usuarios
    res.json(users); // Responder con los datos en formato JSON
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
});

module.exports = router;
