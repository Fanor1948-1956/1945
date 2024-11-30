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
      return res.status(401).json({
        success: false,
        message: 'Correo electrónico o contraseña incorrectos.',
      });
    }

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Correo electrónico o contraseña incorrectos.',
      });
    }

    const token = generateToken(user);

    // Almacenar el token en la cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60, // 1 hora de duración del token en la cookie
    });

    // Almacenar información del usuario en la sesión
    req.session.authenticated = true;
    req.session.userId = user._id;
    req.session.name = user.name;
    req.session.surnames = user.surnames;
    req.session.token = token;
    req.session.roles = user.roles.map((role) => role.name);

    // Responder con éxito
    return res.json({
      success: true,
      message: 'Inicio de sesión exitoso.',
      isAuthenticated: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        surnames: user.surnames,
        roles: req.session.roles,
      },
    });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    return res.status(500).json({
      success: false,
      message: 'Error en el servidor.',
    });
  }
};

exports.logout = (req, res) => {
  // Destruir la sesión actual
  req.session.destroy((err) => {
    // Limpiar la cookie que almacena el token JWT
    res.clearCookie('token', {
      httpOnly: true, // Mantener las mismas opciones que usaste al crearla
      sameSite: 'strict', // Asegurarte de que coincidan las configuraciones
      secure: process.env.NODE_ENV === 'production', // Solo para HTTPS en producción
    });

    // Eliminar el token y el usuario del localStorage
    res.send(`
      <script>
        localStorage.removeItem('token'); // Eliminar el token
        localStorage.removeItem('user'); // Eliminar el usuario (si lo tienes almacenado)
        localStorage.removeItem('roles'); // Eliminar los roles (si lo tienes almacenado)
        localStorage.removeItem('isAuthenticated'); // Eliminar el indicador de autenticación (si lo tienes almacenado)
        history.replaceState(null, null, '/login'); // Redirigir a la página de inicio
        window.location.href = '/login'; // Redirigir a la página de inicio
     
      </script>
    `);
  });
};

// Ruta para cerrar sesión
