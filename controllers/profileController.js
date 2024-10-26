const {
  User,
  Patient,
  Doctor,
  Admin,
  ChiefMedical,
} = require('../models/userModel');

// Función para resolver el rol basado en los roles encontrados
const resolveRole = (rolesFound) => {
  const roleNames = rolesFound.map((role) => role.name);
  if (roleNames.includes('Patient')) {
    return Patient;
  } else if (roleNames.includes('Doctor')) {
    return Doctor;
  } else if (roleNames.includes('Admin')) {
    return Admin;
  } else if (roleNames.includes('ChiefMedical')) {
    return ChiefMedical;
  } else {
    return User;
  }
};

// Ver perfil
exports.viewProfile = async (req, res) => {
  try {
    // Si hay sesión activa, usa el userId de la sesión, de lo contrario el de JWT
    const userId = req.session?.userId || req.userId;

    // Consulta al usuario y popula los uploads
    const user = await User.findById(userId)
      .populate('roles')
      .populate('uploads'); // Esto carga los uploads relacionados

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    // Si es una solicitud AJAX o Fetch, devolver JSON
    if (req.xhr || req.headers['accept'] === 'application/json') {
      return res.json({
        user,
        isAuthenticated: req.session?.authenticated || !!req.userId,
      });
    } else {
      // Renderizar la vista de perfil para solicitudes normales
      res.render('pages/privatePages/auth/profile.njk', {
        user,
        isAuthenticated: req.session?.authenticated || !!req.userId,
      });
    }
  } catch (error) {
    console.error('Error al ver el perfil:', error);
    res.status(500).json({ message: 'Error al ver el perfil' });
  }
};

// Actualizar perfil
// Actualizar perfil
exports.updateProfile = async (req, res) => {
  const { name, surnames, email, gender } = req.body; // Ajusta según tus campos
  try {
    const userId = req.session?.userId || req.userId;
    await User.findByIdAndUpdate(userId, {
      name,
      surnames,
      email,
      gender,
    });

    // Si es una solicitud AJAX o Fetch, devolver JSON
    if (req.xhr || req.headers['accept'] === 'application/json') {
      return res.json({ message: 'Perfil actualizado correctamente' });
    }

    // Redirigir para solicitudes normales
    res.redirect('/profile?message=Perfil actualizado correctamente');
  } catch (error) {
    console.error('Error al actualizar el perfil:', error);
    // Manejo de errores para JSON
    if (req.xhr || req.headers['accept'] === 'application/json') {
      return res.status(500).json({ message: 'Error al actualizar el perfil' });
    }
    res.status(500).send('Error al actualizar el perfil');
  }
};
