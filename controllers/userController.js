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
  } = req.body;

  console.log('Datos recibidos en la petición:', req.body);

  const rolesArray = roles || [];

  try {
    console.log('Roles recibidos:', rolesArray);

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

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = new UserType({
      name,
      surnames,
      email,
      password: hashedPassword,
      gender,
      roles: rolesFound,
    });

    await newUser.save();

    return res.status(201).json({
      success: true,
      message: 'Usuario creado exitosamente',
      user: newUser,
    });
  } catch (error) {
    console.error('Error al crear el usuario:', error);
    res.status(500).json({ message: 'Error al crear el usuario' });
  }
};
exports.getUsers = async (req, res) => {
  try {
    // Obtener todos los usuarios y popular los roles y uploads
    const users = await User.find().populate('roles').populate('uploads'); // Esto carga los uploads relacionados

    // Responder dependiendo del tipo de solicitud
    if (req.xhr || req.accepts('application/json')) {
      return res.status(200).json({
        success: true,
        message: 'Usuarios obtenidos correctamente',
        users,
      });
    } else {
      return res.render('pages/privatePages/users/list.njk', { users });
    }
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    res.status(500).send('Error al obtener los usuarios');
  }
};
exports.showUserInfo = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId).populate('roles');
    const allRoles = await roleModel.find();

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const isPasswordHashed = user.password.startsWith('$2b$');

    res.json({ user, allRoles, isPasswordHashed });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el usuario' });
  }
};

exports.updateUser = async (req, res) => {
  const userId = req.params.id;
  const { name, surnames, email, gender, roles } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const isPasswordHashed =
      user.password !== undefined &&
      user.password !== null &&
      user.password !== '';

    if (isPasswordHashed) {
      if (roles) {
        user.roles = roles;
      } else {
        return res
          .status(400)
          .json({ message: 'Se requiere al menos un rol para actualizar' });
      }
    } else {
      if (name) user.name = name;
      if (surnames) user.surnames = surnames;
      if (email) user.email = email;
      if (gender) user.gender = gender;

      if (roles) {
        user.roles = roles;
      } else {
        return res
          .status(400)
          .json({ message: 'Se requiere al menos un rol para actualizar' });
      }
    }

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
