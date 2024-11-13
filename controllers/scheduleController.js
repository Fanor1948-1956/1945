const Schedule = require('../models/scheduleModel') // Asegúrate de importar correctamente el modelo Schedule

// Función para crear un nuevo horario
async function createSchedule (req, res) {
  try {
    const { doctor, dayOfWeek, startTime, endTime } = req.body

    // Validación de los campos requeridos
    if (!doctor || !dayOfWeek || !startTime || !endTime) {
      return res.status(400).json({ message: 'Faltan datos necesarios.' })
    }

    // Crear un nuevo horario
    const newSchedule = new Schedule({
      doctor,
      dayOfWeek,
      startTime,
      endTime
    })

    // Guardar el nuevo horario en la base de datos
    await newSchedule.save()

    return res.status(201).json({
      message: 'Horario creado con éxito.',
      schedule: newSchedule
    })
  } catch (error) {
    console.error('Error al crear el horario:', error)
    return res.status(500).json({ message: 'Error al crear el horario.' })
  }
}
async function listSchedules (req, res) {
  try {
    const schedules = await Schedule.find().populate({
      path: 'doctor',
      populate: {
        path: 'specialties',
        model: 'Specialty',
        select: 'name' // Asegúrate de que 'name' es el campo correcto
      }
    })

    if (!schedules.length) {
      return res.status(404).json({ message: 'No se encontraron horarios.' })
    }

    return res.status(200).json(schedules)
  } catch (error) {
    console.error('Error al obtener los horarios:', error)
    return res.status(500).json({ message: 'Error al obtener los horarios.' })
  }
}

module.exports = {
  createSchedule,
  listSchedules
}
