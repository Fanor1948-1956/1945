const permissionModel = require('../models/permissionModel');
const Role = require('../models/roleModel');


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


exports.getAllRoles = async (req, res) => {
  try {
    const roles = await Role.find().populate('permissions');
    res.status(200).json({
      success: true,
      message: 'Roles retrieved successfully',
      roles,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error retrieving roles',
    });
  }
};


exports.getRoleById = async (req, res) => {
  const roleId = req.params.id;
  try {
    const role = await Role.findById(roleId).populate('permissions');
    const allPermissions = await permissionModel.find(); 

    if (!role) {
      return res.status(404).json({ message: 'Rol no encontrado' });
    }

    res.json({ role, allPermissions }); 
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el Rol' });
  }
};


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
    const roleId = req.params.id; 
    const deletedRole = await Role.findByIdAndDelete(roleId); 

    if (!deletedRole) {
      return res.status(404).json({ message: 'Rol no encontrado' }); 
    }

    res.json({ success: true, message: 'Rol eliminado exitosamente' }); 
  } catch (error) {
    console.error('Error al eliminar el rol:', error);
    res.status(500).json({ message: 'Error al eliminar el rol' }); 
  }
};
