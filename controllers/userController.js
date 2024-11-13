const roleModel = require('../models/roleModel')
const bcrypt = require('bcrypt')
const { User } = require('../models/userModel')
const { resolveRole } = require('../services/roleService')
const {
  deleteObjectMiddleware,
  activateObjectMiddleware,
  deactivateObjectMiddleware
} = require('../middleware/objectControlMiddleware')

const userController = {
  // Crear un nuevo usuario
  async createUser (req, res) {
    const {
      name,
      surnames,
      email,
      password,
      gender,
      roles = [],
      ...additionalProperties
    } = req.body

    console.log('Datos recibidos en la petición:', req.body)

    try {
      // Validar roles
      const rolesFound = await roleModel.find({ _id: { $in: roles } })
      if (rolesFound.length === 0) {
        return res
          .status(400)
          .json({ message: 'No se encontraron roles válidos.' })
      }

      const UserType = resolveRole(rolesFound)

      // Validar correo electrónico
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        return res
          .status(400)
          .json({ message: 'El correo electrónico no es válido.' })
      }

      // Encriptar la contraseña
      const hashedPassword = bcrypt.hashSync(password, 10)

      // Crear el nuevo usuario
      const newUser = new UserType({
        name,
        surnames,
        email,
        password: hashedPassword,
        gender,
        roles: rolesFound,
        ...additionalProperties
      })

      await newUser.save()
      return res.status(201).json({
        success: true,
        message: 'Usuario creado exitosamente',
        user: newUser
      })
    } catch (error) {
      console.error('Error al crear el usuario:', error)
      return res.status(500).json({ message: 'Error al crear el usuario' })
    }
  },

  // Obtener todos los usuarios con todas las referencias pobladas
  async getUsers (req, res) {
    try {
      const users = await User.find()
        .populate('roles') // Población de roles
        .populate('uploads') // Población de uploads
        .populate('charts') // Población de charts
        .populate({
          path: 'specialties',
          model: 'Specialty' // Población para médicos y jefes médicos
        })
      // .populate({
      //   path: 'schedule',
      //   model: 'Schedule' // Población del horario para los doctores
      // })
      // .populate({
      //   path: 'appointments',
      //   model: 'Appointment' // Población de citas para pacientes
      // })
      // .populate({
      //   path: 'medicalHistory',
      //   model: 'historyClinic' // Población de la historia clínica para pacientes
      // })

      if (req.xhr || req.accepts('application/json')) {
        return res.status(200).json({
          success: true,
          message: 'Usuarios obtenidos correctamente',
          users
        })
      } else {
        return res.render('pages/privatePages/users/list.njk', { users })
      }
    } catch (error) {
      console.error('Error al obtener los usuarios:', error)
      return res.status(500).send('Error al obtener los usuarios')
    }
  },

  // Mostrar información de un usuario específico
  async showUserInfo (req, res) {
    const userId = req.params.id
    try {
      const user = await User.findById(userId).populate('roles')
      const allRoles = await roleModel.find()

      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' })
      }

      const isPasswordHashed = user.password.startsWith('$2b$')
      return res.json({ user, allRoles, isPasswordHashed })
    } catch (error) {
      console.error('Error al obtener el usuario:', error)
      return res.status(500).json({ message: 'Error al obtener el usuario' })
    }
  },

  // Actualizar información de un usuario
  async updateUser (req, res) {
    const userId = req.params.id
    const { name, surnames, email, gender, roles } = req.body

    try {
      const user = await User.findById(userId)
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' })
      }

      if (roles && roles.length > 0) {
        user.roles = roles // Actualiza los roles
      } else {
        return res
          .status(400)
          .json({ message: 'Se requiere al menos un rol para actualizar' })
      }

      // Actualizar otros campos si se proporcionan
      if (name) user.name = name
      if (surnames) user.surnames = surnames
      if (email) user.email = email
      if (gender) user.gender = gender

      await user.save()
      return res.status(200).json({ message: 'Usuario actualizado con éxito' })
    } catch (error) {
      console.error('Error al actualizar el usuario:', error)
      return res.status(500).json({ message: 'Error al actualizar el usuario' })
    }
  },

  // Activar, desactivar y eliminar usuarios
  deactivateById: deactivateObjectMiddleware(User),
  activateById: activateObjectMiddleware(User),
  deleteById: deleteObjectMiddleware(User),

  // Eliminar un usuario
  async deleteUser (req, res) {
    const userId = req.params.id
    try {
      const deletedUser = await User.findByIdAndDelete(userId)
      if (!deletedUser) {
        return res.status(404).json({ message: 'Usuario no encontrado' })
      }
      return res.json({ message: 'Usuario eliminado con éxito' })
    } catch (error) {
      console.error('Error al eliminar el usuario:', error)
      return res.status(500).json({ message: 'Error al eliminar el usuario' })
    }
  }
}

module.exports = userController
