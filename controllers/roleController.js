const Role = require('../models/roleModel');
const Permission = require('../models/permissionModel');

// Controlador para obtener roles en formato JSON
exports.getAllRoles = async (req, res) => {
  try {
    const roles = await Role.find().populate('permissions'); // Obtén roles con sus permisos
    res.json(roles); // Devuelve los roles como JSON
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error obteniendo roles' });
  }
};

// Controlador para renderizar la página de roles con roles y permisos
exports.getRoles = async (req, res) => {
  try {
    const roles = await Role.find().populate('permissions'); // Obtener roles con permisos
    const permissions = await Permission.find(); // Obtener todos los permisos

    // Renderiza la página de roles con los datos obtenidos
    res.render('pages/privatePages/roles.njk', {
      title: 'Lista de Roles',
      roles, // Enviar roles a la vista
      permissions, // Enviar permisos a la vista
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener roles');
  }
};

// Controlador para crear un nuevo rol
exports.createRole = async (req, res) => {
  const { name, alias, description, permissions } = req.body; // Obtener los datos del cuerpo de la solicitud
  try {
    const newRole = new Role({ name, alias, description, permissions }); // Crear un nuevo rol
    await newRole.save(); // Guardar el nuevo rol en la base de datos
    res.redirect('/roles'); // Redirigir a la página de todos los roles
  } catch (err) {
    console.log(err);
    res.status(500).send('Error creando el rol');
  }
};
