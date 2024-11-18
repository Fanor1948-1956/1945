const Specialty = require('../models/Specialty.js')

exports.createSpecialty = async (req, res) => {
  const { name, description } = req.body

  if (!name || !description) {
    return res.status(400).json({
      message: 'Faltan campos requeridos: nombre y descripción.'
    })
  }

  try {
    const newSpecialty = new Specialty({ name, description })
    await newSpecialty.save()

    res.status(201).json({
      message: 'Especialidad creada correctamente',
      specialty: newSpecialty
    })
  } catch (error) {
    console.error('Error al crear la especialidad:', error)
    res.status(500).json({
      message: 'Error al crear la especialidad. Inténtelo de nuevo más tarde.'
    })
  }
}

exports.getAllSpecialties = async (req, res) => {
  try {
    const specialties = await Specialty.find()
    res.status(200).json({
      success: true,
      message: 'Especialidades recuperadas exitosamente',
      specialties
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error al recuperar las especialidades'
    })
  }
}

exports.getSpecialtyById = async (req, res) => {
  try {
    const specialty = await Specialty.findById(req.params.id)
    if (!specialty) {
      return res.status(404).json({ message: 'Especialidad no encontrada' })
    }
    res.status(200).json(specialty)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.updateSpecialty = async (req, res) => {
  const { id } = req.params
  const { name, description } = req.body

  if (!name || !description) {
    return res.status(400).json({
      message: 'Faltan campos requeridos: nombre y descripción.'
    })
  }

  try {
    const updatedSpecialty = await Specialty.findByIdAndUpdate(
      id,
      { name, description },
      { new: true }
    )

    if (!updatedSpecialty) {
      return res.status(404).json({ message: 'Especialidad no encontrada.' })
    }

    res.status(200).json({
      message: 'Especialidad actualizada correctamente',
      specialty: updatedSpecialty
    })
  } catch (error) {
    console.error('Error al actualizar la especialidad:', error)
    res.status(500).json({
      message:
        'Error al actualizar la especialidad. Inténtelo de nuevo más tarde.'
    })
  }
}

exports.deleteSpecialty = async (req, res) => {
  try {
    const specialtyId = req.params.id
    const deletedSpecialty = await Specialty.findByIdAndDelete(specialtyId)

    if (!deletedSpecialty) {
      return res.status(404).json({ message: 'Especialidad no encontrada' })
    }

    res.json({ success: true, message: 'Especialidad eliminada exitosamente' })
  } catch (error) {
    console.error('Error al eliminar la especialidad:', error)
    res.status(500).json({ message: 'Error al eliminar la especialidad' })
  }
}
