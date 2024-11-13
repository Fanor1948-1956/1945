const permissionModel = require('../models/permissionModel')
const Permission = require('../models/permissionModel')

exports.createPermission = async (req, res) => {
  const { name, description } = req.body

  if (!name || !description) {
    return res.status(400).json({
      message: 'Faltan campos requeridos: nombre y descripción.'
    })
  }

  try {
    const newPermission = new Permission({ name, description })
    await newPermission.save()

    res.status(201).json({
      message: 'Permiso creado correctamente',
      permission: newPermission
    })
  } catch (error) {
    console.error('Error al crear el permiso:', error)

    res.status(500).json({
      message: 'Error al crear el permiso. Inténtelo de nuevo más tarde.'
    })
  }
}

exports.getAllPermissions = async (req, res) => {
  try {
    const permissions = await permissionModel.find()
    res.status(200).json({
      success: true,
      message: 'Especialidades recuperadas exitosamente',
      permissions
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error al recuperar las especialidades'
    })
  }
}

exports.getPermissionById = async (req, res) => {
  try {
    const permission = await Permission.findById(req.params.id)
    if (!permission) {
      return res.status(404).json({ message: 'Permission not found' })
    }
    res.status(200).json(permission)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.updatePermission = async (req, res) => {
  const { id } = req.params
  const { name, description } = req.body

  if (!name || !description) {
    return res.status(400).json({
      message: 'Faltan campos requeridos: nombre y descripción.'
    })
  }

  try {
    const updatedPermission = await Permission.findByIdAndUpdate(
      id,
      { name, description },
      { new: true }
    )

    if (!updatedPermission) {
      return res.status(404).json({ message: 'Permiso no encontrado.' })
    }

    res.status(200).json({
      message: 'Permiso actualizado correctamente',
      permission: updatedPermission
    })
  } catch (error) {
    console.error('Error al actualizar el permiso:', error)
    res.status(500).json({
      message: 'Error al actualizar el permiso. Inténtelo de nuevo más tarde.'
    })
  }
}

exports.deactivatePermission = async (req, res) => {
  try {
    const permission = await Permission.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    )
    if (!permission) {
      return res.status(404).json({ message: 'Permission not found' })
    }
    res.status(200).json(permission)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

exports.activatePermission = async (req, res) => {
  try {
    const permission = await Permission.findByIdAndUpdate(
      req.params.id,
      { isActive: true },
      { new: true }
    )
    if (!permission) {
      return res.status(404).json({ message: 'Permission not found' })
    }
    res.status(200).json(permission)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

exports.deletePermission = async (req, res) => {
  try {
    const permissionId = req.params.id
    const deletedPermission = await Permission.findByIdAndDelete(permissionId)

    if (!deletedPermission) {
      return res.status(404).json({ message: 'Permiso no encontrado' })
    }

    res.json({ success: true, message: 'Permiso eliminado exitosamente' })
  } catch (error) {
    console.error('Error al eliminar el Permiso:', error)
    res.status(500).json({ message: 'Error al eliminar el rol' })
  }
}
