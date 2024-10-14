// controllers/specialtyController.js

const Specialty = require('../models/Specialty');

// Crear una nueva especialidad
exports.createSpecialty = async (req, res) => {
  const { name, description } = req.body;

  // Validar que los campos requeridos están presentes
  if (!name || !description) {
    return res.status(400).json({
      message: 'Faltan campos requeridos: nombre y descripción.',
    });
  }

  try {
    // Crear una nueva especialidad
    const newSpecialty = new Specialty({ name, description });
    await newSpecialty.save();

    // Responder con la nueva especialidad y un mensaje
    res.status(201).json({
      message: 'Especialidad creada correctamente',
      specialty: newSpecialty,
    });
  } catch (error) {
    console.error('Error al crear la especialidad:', error);
    res.status(500).json({
      message: 'Error al crear la especialidad. Inténtelo de nuevo más tarde.',
    });
  }
};

// Obtener todas las especialidades
exports.getAllSpecialties = async (req, res) => {
  try {
    const items = await Specialty.find();
    res.status(200).json({
      success: true,
      message: 'Especialidades recuperadas exitosamente',
      items,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error al recuperar las especialidades',
    });
  }
};

// Obtener especialidad por ID
exports.getSpecialtyById = async (req, res) => {
  try {
    const specialty = await Specialty.findById(req.params.id);
    if (!specialty) {
      return res.status(404).json({ message: 'Especialidad no encontrada' });
    }
    res.status(200).json(specialty);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar especialidad
exports.updateSpecialty = async (req, res) => {
  const { id } = req.params; // Obtener el ID de la especialidad desde los parámetros de la ruta
  const { name, description } = req.body; // Obtener los datos del cuerpo de la solicitud

  // Validar que los campos requeridos están presentes
  if (!name || !description) {
    return res.status(400).json({
      message: 'Faltan campos requeridos: nombre y descripción.',
    });
  }

  try {
    // Buscar y actualizar la especialidad
    const updatedSpecialty = await Specialty.findByIdAndUpdate(
      id,
      { name, description },
      { new: true }
    );

    // Si no se encuentra la especialidad
    if (!updatedSpecialty) {
      return res.status(404).json({ message: 'Especialidad no encontrada.' });
    }

    // Responder con la especialidad actualizada
    res.status(200).json({
      message: 'Especialidad actualizada correctamente',
      specialty: updatedSpecialty,
    });
  } catch (error) {
    console.error('Error al actualizar la especialidad:', error);
    res.status(500).json({
      message:
        'Error al actualizar la especialidad. Inténtelo de nuevo más tarde.',
    });
  }
};

// Eliminar especialidad
exports.deleteSpecialty = async (req, res) => {
  try {
    const specialtyId = req.params.id; // Obtén el ID de la especialidad de los parámetros
    const deletedSpecialty = await Specialty.findByIdAndDelete(specialtyId); // Elimina la especialidad por ID

    if (!deletedSpecialty) {
      return res.status(404).json({ message: 'Especialidad no encontrada' }); // Manejar especialidad no encontrada
    }

    res.json({ success: true, message: 'Especialidad eliminada exitosamente' }); // Mensaje de éxito
  } catch (error) {
    console.error('Error al eliminar la especialidad:', error);
    res.status(500).json({ message: 'Error al eliminar la especialidad' }); // Mensaje de error genérico
  }
};
