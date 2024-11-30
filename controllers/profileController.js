const {
  User,
  Patient,
  Doctor,
  Admin,
  ChiefMedical
} = require('../models/userModel')
const Specialty = require('../models/Specialty')
// Función para resolver el rol basado en los roles encontrados
const resolveRole = rolesFound => {
  const roleNames = rolesFound.map(role => role.name)
  if (roleNames.includes('Patient')) {
    return Patient
  } else if (roleNames.includes('Doctor')) {
    return Doctor
  } else if (roleNames.includes('Admin')) {
    return Admin
  } else if (roleNames.includes('ChiefMedical')) {
    return ChiefMedical
  } else {
    return User
  }
}

// Ver perfil
exports.viewProfile = async (req, res) => {
  try {
    // Si hay sesión activa, usa el userId de la sesión, de lo contrario el de JWT
    const userId = req.session?.userId || req.userId

    // Consulta al usuario y popula los uploads
    const user = await User.findById(userId)
      .populate('roles')
      .populate('uploads')
      .populate({
        path: 'specialties', // Población de especialidades
        model: 'Specialty', // El modelo Specialty
        select: 'name description isActive' // Selección de los campos que queremos devolver
      })

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado.' })
    }

    // Si es una solicitud AJAX o Fetch, devolver JSON
    if (req.xhr || req.headers['accept'] === 'application/json') {
      return res.json({
        user,
        isAuthenticated: req.session?.authenticated || !!req.userId
      })
    } else {
      // Renderizar la vista de perfil para solicitudes normales
      res.render('pages/privatePages/auth/profile.njk', {
        user,
        isAuthenticated: req.session?.authenticated || !!req.userId
      })
    }
  } catch (error) {
    console.error('Error al ver el perfil:', error)
    res.status(500).json({ message: 'Error al ver el perfil' })
  }
}

exports.updateProfile = async (req, res) => {
  const { name, surnames, email, gender, specialties } = req.body // Ajusta según tus campos
  try {
    // Obtener el ID del usuario desde la sesión o JWT
    const userId = req.session?.userId || req.userId

    // Verificar si el usuario existe
    const user = await User.findById(userId).populate('roles')
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado.' })
    }

    // Actualizar los campos básicos del usuario
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, surnames, email, gender },
      { new: true } // Retornar el documento actualizado
    )

    // Si el usuario es un doctor, actualizar las especialidades
    if (user.roles.some(role => role.name === 'Doctor') && specialties) {
      // Validar que todas las especialidades existan
      const validSpecialties = await Specialty.find({
        _id: { $in: specialties }
      })

      // Verificar que todas las especialidades sean válidas
      if (validSpecialties.length !== specialties.length) {
        return res
          .status(400)
          .json({ message: 'Algunas especialidades no son válidas.' })
      }

      // Actualizar el array de especialidades del doctor
      updatedUser.specialties = [
        ...new Set([...updatedUser.specialties, ...specialties])
      ]

      // Guardar el usuario con las especialidades actualizadas
      await updatedUser.save()
    }

    // Poblamos las especialidades para devolverlas con la respuesta
    const populatedUser = await User.findById(updatedUser._id).populate({
      path: 'specialties',
      model: 'Specialty',
      select: 'name description isActive' // Puedes elegir qué campos devolver
    })

    // Calcular isAuthenticated
    const isAuthenticated = req.session?.authenticated || !!req.userId

    // Si es una solicitud AJAX o Fetch, devolver JSON con los datos completos
    if (req.xhr || req.headers['accept'] === 'application/json') {
      return res.json({
        message: 'Perfil actualizado correctamente',
        user: populatedUser,
        isAuthenticated: isAuthenticated // Agregar `isAuthenticated` en la respuesta
      })
    }

    // Redirigir para solicitudes normales, añadiendo `isAuthenticated` a la URL si es necesario
    res.redirect('/profile?message=Perfil actualizado correctamente')
  } catch (error) {
    console.error('Error al actualizar el perfil:', error)

    // Manejo de errores para JSON
    if (req.xhr || req.headers['accept'] === 'application/json') {
      return res.status(500).json({ message: 'Error al actualizar el perfil' })
    }

    // Manejo de errores para redirección
    res.status(500).send('Error al actualizar el perfil')
  }
}
