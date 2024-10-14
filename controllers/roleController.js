const permissionModel = require('../models/permissionModel');
const Role = require('../models/roleModel');

// Create a new role
exports.createRole = async (req, res) => {
  try {
    const role = new Role(req.body);
    await role.save();
    res.status(201).json({
      success: true,
      message: 'Role created successfully',
      role,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || 'Error creating role',
    });
  }
};

// Get all roles
exports.getAllRoles = async (req, res) => {
  try {
    const items = await Role.find().populate('permissions');
    res.status(200).json({
      success: true,
      message: 'Roles retrieved successfully',
      items,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error retrieving roles',
    });
  }
};

// Get role by ID
// Get role by ID
// Get role by ID
exports.getRoleById = async (req, res) => {
  const roleId = req.params.id;
  try {
    const role = await Role.findById(roleId).populate('permissions');
    const allPermissions = await permissionModel.find(); // Cambié el nombre a 'allPermissions' para más claridad

    if (!role) {
      return res.status(404).json({ message: 'Rol no encontrado' });
    }

    res.json({ role, allPermissions }); // Devuelve el rol y todos los permisos
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el Rol' });
  }
};

// Update role
exports.updateRole = async (req, res) => {
  try {
    const role = await Role.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!role) {
      return res.status(404).json({
        success: false,
        message: 'Role not found',
      });
    }
    res.status(200).json({
      success: true,
      message: 'Role updated successfully',
      role,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || 'Error updating role',
    });
  }
};

// Deactivate role
exports.deactivateRole = async (req, res) => {
  try {
    const role = await Role.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );
    if (!role) {
      return res.status(404).json({
        success: false,
        message: 'Role not found',
      });
    }
    res.status(200).json({
      success: true,
      message: 'Role deactivated successfully',
      role,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || 'Error deactivating role',
    });
  }
};

// Activate role
exports.activateRole = async (req, res) => {
  try {
    const role = await Role.findByIdAndUpdate(
      req.params.id,
      { isActive: true },
      { new: true }
    );
    if (!role) {
      return res.status(404).json({
        success: false,
        message: 'Role not found',
      });
    }
    res.status(200).json({
      success: true,
      message: 'Role activated successfully',
      role,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || 'Error activating role',
    });
  }
};

exports.deleteRole = async (req, res) => {
  try {
    const roleId = req.params.id; // Obtén el ID del rol de los parámetros
    const deletedRole = await Role.findByIdAndDelete(roleId); // Elimina el rol por ID

    if (!deletedRole) {
      return res.status(404).json({ message: 'Rol no encontrado' }); // Manejar rol no encontrado
    }

    res.json({ success: true, message: 'Rol eliminado exitosamente' }); // Mensaje de éxito
  } catch (error) {
    console.error('Error al eliminar el rol:', error);
    res.status(500).json({ message: 'Error al eliminar el rol' }); // Mensaje de error genérico
  }
};
