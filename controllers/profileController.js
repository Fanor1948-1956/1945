// controllers/profileController.js
const {
  User,
  Patient,
  Doctor,
  Admin,
  ChiefMedical,
} = require('../models/userModel');

// Función para resolver el rol
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

exports.viewProfile = async (req, res) => {
  try {
    console.log('Modelo User:', User); // Verifica que User esté correctamente definido
    const user = await User.findById(req.session.userId).populate('roles'); // Asegúrate de usar populate para obtener los roles completos

    if (!user) {
      return res.status(404).send('Usuario no encontrado.');
    }

    // Resuelve el modelo según los roles encontrados
    const userRoleModel = resolveRole(user.roles); // Llama a la función para obtener el modelo correspondiente

    // Si necesitas hacer algo con el modelo de rol (ejemplo, si tienes lógica diferente según el rol)
    const userData = await userRoleModel.findById(user._id); // O cualquier otra operación que necesites hacer

    // Renderiza la vista del perfil
    res.render('pages/privatePages/auth/profile.njk', {
      title: 'Perfil de Usuario',
      user: userData,
    });
  } catch (error) {
    console.error('Error al ver el perfil:', error);
    res.status(500).send('Error al ver el perfil');
  }
};

exports.updateProfile = async (req, res) => {
  const { name, surnames, email, gender } = req.body; // Ajusta según tus campos
  try {
    await User.findByIdAndUpdate(req.session.userId, {
      name,
      surnames,
      email,
      gender,
    });
    res.redirect('/profile?message=Perfil actualizado correctamente');
  } catch (error) {
    console.error('Error al actualizar el perfil:', error);
    res.status(500).send('Error al actualizar el perfil');
  }
};
