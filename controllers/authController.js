const bcrypt = require('bcrypt'); // Asegúrate de tener importado bcrypt
const { User, Patient } = require('../models/userModel'); // Importa los modelos de usuario
const Role = require('../models/roleModel'); // Modelo de rol
const { generateToken } = require('../services/tokenService');


exports.register = async (req, res) => {
  const { name, surnames, email, password, gender, ...additionalProperties } =
    req.body;

  try {

    const patientRole = await Role.findOne({ name: 'Paciente' });
    if (!patientRole) {
      return res.status(400).send('No se encontró el rol de Paciente.');
    }


    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).send('El correo electrónico no es válido.');
    }


    const hashedPassword = bcrypt.hashSync(password, 10);

 
    const newUser = new Patient({
      name,
      surnames,
      email,
      password: hashedPassword,
      gender,
      roles: [patientRole._id], // Asignar el rol de Paciente automáticamente
      medicalHistory: [], // Puedes inicializar el historial médico como un arreglo vacío
      ...additionalProperties,
    });

    await newUser.save();

    // Redirigir tras registro exitoso
    return res.redirect(
      '/login?message=Registro exitoso, ahora puedes iniciar sesión'
    );
  } catch (error) {
    console.error('Error al crear el usuario:', error);
    res.status(500).send('Error al crear el usuario');
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).populate('roles');
    if (!user) {
      return res.redirect(
        '/login?error=Correo electrónico o contraseña incorrectos.'
      );
    }

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.redirect(
        '/login?error=Correo electrónico o contraseña incorrectos.'
      );
    }

    const token = generateToken(user);

    // Almacenar el token en la cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });

    // Almacenar información del usuario en la sesión
    req.session.authenticated = true;
    req.session.userId = user._id;
    req.session.name = user.name;
    req.session.surnames = user.surnames;
    req.session.token = user.token;
    req.session.roles = user.roles.map((role) => role.name);
    // Redirigir al dashboard
    return res.redirect('/');
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    return res.redirect('/login?error=Error en el servidor.');
  }
};

// Controlador de cierre de sesión
// Controlador de cierre de sesión
exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.redirect('/'); // Redirigir a dashboard si hay un error
    }
    res.clearCookie('token'); // Limpiar la cookie que almacena el token
    res.redirect('/login'); // Redirigir a la página de inicio de sesión
  });
};

// Ruta para cerrar sesión
