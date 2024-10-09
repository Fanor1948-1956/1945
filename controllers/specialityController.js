// controllers/specialtyController.js
const Specialty = require('../models/Specialty');

// Crear nueva especialidad
exports.createSpecialty = async (req, res) => {
  try {
    const { name, description } = req.body;
    const newSpecialty = new Specialty({ name, description });
    await newSpecialty.save();
    res.status(201).json(newSpecialty);
  } catch (error) {
    console.error('Error creando especialidad:', error);
    res.status(500).json({ message: 'Error creando especialidad' });
  }
};

// Listar todas las especialidades
exports.getAllSpecialties = async (req, res) => {
  try {
    const specialties = await Specialty.find();
    res.status(200).json(specialties);
  } catch (error) {
    console.error('Error obteniendo especialidades:', error);
    res.status(500).json({ message: 'Error obteniendo especialidades' });
  }
};

// Puedes agregar más funciones para actualizar y eliminar especialidades si es necesario
