const Permission = require('../models/permissionModel');

// exports.createPermission = async (req, res) => {
//   const { name } = req.body;
//   try {
//     const newPermission = new Permission({ name });
//     await newPermission.save();
//     res.redirect('/permissions');
//   } catch (err) {
//     console.log(err);
//     res.status(500).send('Error creando el permiso');
//   }
// };

// controllers/permissionController.js

// Create a new permission
exports.createPermission = async (req, res) => {
  const { name, description } = req.body;

  // Validar que los campos requeridos están presentes
  if (!name || !description) {
    return res.status(400).json({
      message: 'Faltan campos requeridos: nombre y descripción.',
    });
  }

  try {
    // Crear un nuevo permiso
    const newPermission = new Permission({ name, description });
    await newPermission.save();

    // Responder con el nuevo permiso y un mensaje
    res.status(201).json({
      message: 'Permiso creado correctamente',
      permission: newPermission,
    });
  } catch (error) {
    console.error('Error al crear el permiso:', error);

    // Responder con un mensaje de error específico
    res.status(500).json({
      message: 'Error al crear el permiso. Inténtelo de nuevo más tarde.',
    });
  }
};

// Get all permissions
exports.getAllPermissions = async (req, res) => {
  try {
    const permissions = await Permission.find();
    res.status(200).json(permissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get permission by ID
exports.getPermissionById = async (req, res) => {
  try {
    const permission = await Permission.findById(req.params.id);
    if (!permission) {
      return res.status(404).json({ message: 'Permission not found' });
    }
    res.status(200).json(permission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update permission
exports.updatePermission = async (req, res) => {
  const { id } = req.params; // Obtener el ID del permiso desde los parámetros de la ruta
  const { name, description } = req.body; // Obtener los datos del cuerpo de la solicitud

  // Validar que los campos requeridos están presentes
  if (!name || !description) {
    return res.status(400).json({
      message: 'Faltan campos requeridos: nombre y descripción.',
    });
  }

  try {
    // Buscar y actualizar el permiso
    const updatedPermission = await Permission.findByIdAndUpdate(
      id,
      { name, description },
      { new: true }
    );

    // Si no se encuentra el permiso
    if (!updatedPermission) {
      return res.status(404).json({ message: 'Permiso no encontrado.' });
    }

    // Responder con el permiso actualizado
    res.status(200).json({
      message: 'Permiso actualizado correctamente',
      permission: updatedPermission,
    });
  } catch (error) {
    console.error('Error al actualizar el permiso:', error);
    res.status(500).json({
      message: 'Error al actualizar el permiso. Inténtelo de nuevo más tarde.',
    });
  }
};

// Deactivate permission
exports.deactivatePermission = async (req, res) => {
  try {
    const permission = await Permission.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );
    if (!permission) {
      return res.status(404).json({ message: 'Permission not found' });
    }
    res.status(200).json(permission);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Activate permission
exports.activatePermission = async (req, res) => {
  try {
    const permission = await Permission.findByIdAndUpdate(
      req.params.id,
      { isActive: true },
      { new: true }
    );
    if (!permission) {
      return res.status(404).json({ message: 'Permission not found' });
    }
    res.status(200).json(permission);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete permission
exports.deletePermission = async (req, res) => {
  try {
    const permission = await Permission.findByIdAndDelete(req.params.id);
    if (!permission) {
      return res.status(404).json({ message: 'Permission not found' });
    }
    res.status(204).json(); // No content
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
