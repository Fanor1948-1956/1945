const roleModel = require('../models/roleModel');
const bcrypt = require('bcrypt');
const { User } = require('../models/userModel');
const { resolveRole } = require('../services/roleService');
exports.createUser = async (req, res) => {
  const {
    name,
    surnames,
    email,
    password,
    gender,
    roles,
    ...additionalProperties
  } = req.body; // Incluir gender
  const rolesArray = roles || [];

  try {
    const rolesFound = await roleModel.find({ _id: { $in: rolesArray } });
    if (rolesFound.length === 0) {
      return res
        .status(400)
        .json({ message: 'No se encontraron roles válidos.' });
    }

    const UserType = resolveRole(rolesFound);

    // Validación de correo electrónico
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
      password: hashedPassword, // Guardar la contraseña hasheada
      gender, // Guardar el género
      roles: rolesFound,
      ...additionalProperties,
    });

    await newUser.save();

    // Responder con éxito
    return res.status(201).json({ message: 'Usuario creado exitosamente' });
  } catch (error) {
    console.error('Error al crear el usuario:', error);
    res.status(500).json({ message: 'Error al crear el usuario' });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().populate('roles'); // Obteniendo todos los usuarios y sus roles

    if (req.xhr) {
      // Si es una petición AJAX
      return res.status(200).json(users); // Devolver los usuarios en JSON
    } else {
      res.render('pages/privatePages/users/list', { users }); // Renderizar página normalmente si no es AJAX
    }
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    res.status(500).send('Error al obtener los usuarios');
  }
};

exports.showUserInfo = async (req, res) => {
  const userId = req.params.id; // Obtener ID del usuario desde la URL
  try {
    const user = await User.findById(userId).populate('roles');
    const allRoles = await roleModel.find(); // Obtener todos los roles disponibles

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Verificar si la contraseña está hasheada
    const isPasswordHashed = user.password.startsWith('$2b$'); // Asumiendo que la contraseña hasheada comienza con '$2b$'

    // Devolver el usuario, los roles disponibles y si la contraseña está hasheada
    res.json({ user, allRoles, isPasswordHashed });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el usuario' });
  }
};
// Controlador para actualizar un usuario
exports.updateUser = async (req, res) => {
  const userId = req.params.id;
  const { name, surnames, email, gender, roles } = req.body;

  try {
    // Obtener el usuario por ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Verificar si la contraseña está hasheada
    const isPasswordHashed =
      user.password !== undefined &&
      user.password !== null &&
      user.password !== '';

    if (isPasswordHashed) {
      // Si la contraseña está hasheada, solo se permite editar roles
      if (roles) {
        user.roles = roles; // Actualiza los roles
      } else {
        return res
          .status(400)
          .json({ message: 'Se requiere al menos un rol para actualizar' });
      }
    } else {
      // Si la contraseña NO está hasheada, se permiten todos los campos
      if (name) user.name = name;
      if (surnames) user.surnames = surnames;
      if (email) user.email = email;
      if (gender) user.gender = gender;

      // Actualiza los roles
      if (roles) {
        user.roles = roles; // Actualiza los roles
      } else {
        return res
          .status(400)
          .json({ message: 'Se requiere al menos un rol para actualizar' });
      }
    }

    // Guarda los cambios en la base de datos
    await user.save();

    return res.status(200).json({ message: 'Usuario actualizado con éxito' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al actualizar el usuario' });
  }
};

exports.deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json({ message: 'Usuario eliminado con éxito' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el usuario' });
  }
};
