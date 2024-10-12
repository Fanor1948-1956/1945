// const Role = require('../models/roleModel');
// const Permission = require('../models/permissionModel');

// // Controlador para obtener roles en formato JSON
// exports.getAllRoles = async (req, res) => {
//   try {
//     const roles = await Role.find().populate('permissions'); // Obtén roles con sus permisos
//     res.json(roles); // Devuelve los roles como JSON
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Error obteniendo roles' });
//   }
// };

// // Controlador para renderizar la página de roles con roles y permisos
// exports.getRoles = async (req, res) => {
//   try {
//     const roles = await Role.find().populate('permissions'); // Obtener roles con permisos
//     const permissions = await Permission.find(); // Obtener todos los permisos

//     // Renderiza la página de roles con los datos obtenidos
//     res.render('pages/privatePages/roles.njk', {
//       title: 'Lista de Roles',
//       roles, // Enviar roles a la vista
//       permissions, // Enviar permisos a la vista
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Error al obtener roles');
//   }
// };

// // Controlador para crear un nuevo rol
// exports.createRole = async (req, res) => {
//   const { name, alias, description, permissions } = req.body; // Obtener los datos del cuerpo de la solicitud
//   try {
//     const newRole = new Role({ name, alias, description, permissions }); // Crear un nuevo rol
//     await newRole.save(); // Guardar el nuevo rol en la base de datos
//     res.redirect('/roles'); // Redirigir a la página de todos los roles
//   } catch (err) {
//     console.log(err);
//     res.status(500).send('Error creando el rol');
//   }
// };

// controllers/roleController.js
const Role = require('../models/roleModel');

// Create a new role
exports.createRole = async (req, res) => {
  try {
    const role = new Role(req.body);
    await role.save();
    res.status(201).json(role);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all roles
exports.getAllRoles = async (req, res) => {
  try {
    const roles = await Role.find().populate('permissions');
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get role by ID
exports.getRoleById = async (req, res) => {
  try {
    const role = await Role.findById(req.params.id).populate('permissions');
    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }
    res.status(200).json(role);
  } catch (error) {
    res.status(500).json({ message: error.message });
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
      return res.status(404).json({ message: 'Role not found' });
    }
    res.status(200).json(role);
  } catch (error) {
    res.status(400).json({ message: error.message });
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
      return res.status(404).json({ message: 'Role not found' });
    }
    res.status(200).json(role);
  } catch (error) {
    res.status(400).json({ message: error.message });
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
      return res.status(404).json({ message: 'Role not found' });
    }
    res.status(200).json(role);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete role
exports.deleteRole = async (req, res) => {
  try {
    const role = await Role.findByIdAndDelete(req.params.id);
    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }
    res.status(204).json(); // No content
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
