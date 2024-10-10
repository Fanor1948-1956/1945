// controllers/userController.js

const bcrypt = require('bcrypt');
const roleModel = require('../models/roleModel');
const { User } = require('../models/userModel');
const { resolveRole } = require('../services/roleService');

// Crear un nuevo usuario
exports.createUser = async (req, res) => {
  const {
    name,
    surnames,
    email,
    password,
    gender,
    roles,
    ...additionalProperties
  } = req.body;
  const rolesArray = roles || [];

  try {
    // Verificar roles válidos
    const rolesFound = await roleModel.find({ _id: { $in: rolesArray } });
    if (rolesFound.length === 0) {
      return res
        .status(400)
        .json({ message: 'No se encontraron roles válidos.' });
    }

    const UserType = resolveRole(rolesFound);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ message: 'El correo electrónico no es válido.' });
    }

    // Hashear la contraseña
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new UserType({
      name,
      surnames,
      email,
      password: hashedPassword,
      gender,
      roles: rolesFound,
      ...additionalProperties,
    });

    await newUser.save();
    return res.status(201).json({ message: 'Usuario creado exitosamente' });
  } catch (error) {
    console.error('Error al crear el usuario:', error);
    return res.status(500).json({ message: 'Error al crear el usuario' });
  }
};

// Obtener todos los usuarios
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().populate('roles');

    if (req.xhr || req.accepts('application/json')) {
      return res.status(200).json(users);
    } else {
      return res.render('pages/privatePages/users/list.njk', { users });
    }
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    return res.status(500).send('Error al obtener los usuarios');
  }
};

// Actualizar un usuario
exports.updateUser = async (req, res) => {
  const { userId } = req.params; // Asegúrate de que estás pasando el userId
  const updateData = req.body;

  try {
    const user = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }
    return res
      .status(200)
      .json({ message: 'Usuario actualizado exitosamente.', user });
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    return res.status(500).json({ message: 'Error al actualizar el usuario.' });
  }
};

// Eliminar un usuario
exports.deleteUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }
    return res.status(200).json({ message: 'Usuario eliminado exitosamente.' });
  } catch (error) {
    console.error('Error al eliminar el usuario:', error);
    return res.status(500).json({ message: 'Error al eliminar el usuario.' });
  }
};
