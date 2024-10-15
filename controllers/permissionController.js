const Permission = require("../models/permissionModel");

exports.createPermission = async (req, res) => {
  const { name, description } = req.body;

  // Validar que los campos requeridos están presentes
  if (!name || !description) {
    return res.status(400).json({
      message: "Faltan campos requeridos: nombre y descripción.",
    });
  }

  try {
    // Crear un nuevo permiso
    const newPermission = new Permission({ name, description });
    await newPermission.save();

    // Responder con el nuevo permiso y un mensaje
    res.status(201).json({
      message: "Permiso creado correctamente",
      permission: newPermission,
    });
  } catch (error) {
    console.error("Error al crear el permiso:", error);

    // Responder con un mensaje de error específico
    res.status(500).json({
      message: "Error al crear el permiso. Inténtelo de nuevo más tarde.",
    });
  }
};

exports.getAllPermissions = async (req, res) => {
  try {
    const permissions = await Permission.find();
    res.status(200).json({
      success: true,
      message: "Items retrieved successfully",
      permissions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Error retrieving permissions",
    });
  }
};

// Get permission by ID
exports.getPermissionById = async (req, res) => {
  try {
    const permission = await Permission.findById(req.params.id);
    if (!permission) {
      return res.status(404).json({ message: "Permission not found" });
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
      message: "Faltan campos requeridos: nombre y descripción.",
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
      return res.status(404).json({ message: "Permiso no encontrado." });
    }

    // Responder con el permiso actualizado
    res.status(200).json({
      message: "Permiso actualizado correctamente",
      permission: updatedPermission,
    });
  } catch (error) {
    console.error("Error al actualizar el permiso:", error);
    res.status(500).json({
      message: "Error al actualizar el permiso. Inténtelo de nuevo más tarde.",
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
      return res.status(404).json({ message: "Permission not found" });
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
      return res.status(404).json({ message: "Permission not found" });
    }
    res.status(200).json(permission);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deletePermission = async (req, res) => {
  try {
    const permissionId = req.params.id; // Obtén el ID del rol de los parámetros
    const deletedPermission = await Permission.findByIdAndDelete(permissionId); // Elimina el rol por ID

    if (!deletedPermission) {
      return res.status(404).json({ message: "Permiso no encontrado" }); // Manejar rol no encontrado
    }

    res.json({ success: true, message: "Permiso eliminado exitosamente" }); // Mensaje de éxito
  } catch (error) {
    console.error("Error al eliminar el Permiso:", error);
    res.status(500).json({ message: "Error al eliminar el rol" }); // Mensaje de error genérico
  }
};
