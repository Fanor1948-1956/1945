const Permission = require('../models/permissionModel');

// Crear permiso
exports.createPermission = async (req, res) => {
  const { name, description } = req.body;

  // Validar que los campos requeridos están presentes
  if (!name || !description) {
    return res.status(400).json({
      success: false,
      message: 'Faltan campos requeridos: nombre y descripción.',
    });
  }

  try {
    // Crear un nuevo permiso
    const newPermission = new Permission({ name, description });
    await newPermission.save();

    // Responder con el nuevo permiso y un mensaje
    res.status(201).json({
      success: true,
      message: 'Permiso creado correctamente.',
      permission: newPermission,
    });
  } catch (error) {
    console.error('Error al crear el permiso:', error);

    // Responder con un mensaje de error específico
    res.status(500).json({
      success: false,
      message: 'Error al crear el permiso. Inténtelo de nuevo más tarde.',
      error: error.message, // Agregar el mensaje de error para depuración
    });
  }
};

// Actualizar permiso
exports.updatePermission = async (req, res) => {
  const { id } = req.params; // Obtener el ID del permiso desde los parámetros de la ruta
  const { name, description } = req.body; // Obtener los datos del cuerpo de la solicitud

  // Validar que los campos requeridos están presentes
  if (!name || !description) {
    return res.status(400).json({
      success: false,
      message: 'Faltan campos requeridos: nombre y descripción.',
    });
  }

  try {
    // Buscar y actualizar el permiso
    const updatedPermission = await Permission.findByIdAndUpdate(
      id,
      { name, description },
      { new: true, runValidators: true } // runValidators asegura que las validaciones del modelo se ejecuten
    );

    // Si no se encuentra el permiso
    if (!updatedPermission) {
      return res
        .status(404)
        .json({ success: false, message: 'Permiso no encontrado.' });
    }

    // Responder con el permiso actualizado
    res.status(200).json({
      success: true,
      message: 'Permiso actualizado correctamente.',
      permission: updatedPermission,
    });
  } catch (error) {
    console.error('Error al actualizar el permiso:', error);
    res.status(500).json({
      success: false,
      message: 'Error al actualizar el permiso. Inténtelo de nuevo más tarde.',
      error: error.message, // Agregar el mensaje de error para depuración
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
