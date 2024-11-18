const Schedule = require('../models/scheduleModel') // Asegúrate de importar correctamente el modelo Schedule
const { Doctor } = require('../models/userModel')

const Specialty = require('../models/Specialty')

// Función para crear un nuevo horario
async function createSchedule (req, res) {
  try {
    // Obtener doctorId y specialtyId desde query params
    const { doctorId, specialtyId } = req.query
    // Obtener dayOfWeek, startTime, endTime desde el cuerpo de la solicitud
    const { dayOfWeek, startTime, endTime } = req.body

    // Validación de los campos requeridos
    if (!doctorId || !specialtyId || !dayOfWeek || !startTime || !endTime) {
      return res.status(400).json({ message: 'Faltan datos necesarios.' })
    }

    // Verificar que el doctor y la especialidad existan
    const doctorExist = await Doctor.findById(doctorId)
    const specialtyExist = await Specialty.findById(specialtyId)

    if (!doctorExist || !specialtyExist) {
      return res
        .status(404)
        .json({ message: 'Doctor o especialidad no encontrados.' })
    }

    // Verificar si la especialidad pertenece al doctor
    if (!doctorExist.specialties.includes(specialtyId)) {
      return res
        .status(400)
        .json({ message: 'La especialidad no pertenece a este doctor.' })
    }

    // Agregar el horario a la especialidad seleccionada
    specialtyExist.schedules.push({
      dayOfWeek,
      startTime,
      endTime
    })

    // Guardar los cambios en la especialidad
    await specialtyExist.save()

    return res.status(201).json({
      message: 'Horario creado con éxito.',
      schedule: {
        dayOfWeek,
        startTime,
        endTime
      }
    })
  } catch (error) {
    console.error('Error al crear el horario:', error)
    return res.status(500).json({ message: 'Error al crear el horario.' })
  }
}

// Función para listar los horarios de los doctores agrupados por especialidad
async function listSchedules (req, res) {
  try {
    // Obtener todos los doctores con sus especialidades y horarios
    const doctors = await Doctor.find()
      .populate({
        path: 'specialties', // Populamos las especialidades del doctor
        model: 'Specialty', // Asegúrate de que el modelo Speciality es correcto
        select: 'name' // Solo seleccionamos el nombre de las especialidades
      })
      .populate({
        path: 'schedule', // Populamos los horarios asociados al doctor
        model: 'Schedule', // Asegúrate de que el modelo Schedule es correcto
        select: 'dayOfWeek startTime endTime' // Seleccionamos solo los campos necesarios
      })

    // Creamos un objeto para almacenar los horarios agrupados por doctor y especialidad
    const groupedSchedules = {}

    doctors.forEach(doctor => {
      const doctorName = doctor.name
      const specialtyNames = doctor.specialties.map(specialty => specialty.name)

      // Inicializamos el objeto de horarios para este doctor
      if (!groupedSchedules[doctorName]) {
        groupedSchedules[doctorName] = specialtyNames.map(specialty => ({
          Especialidad: specialty,
          horarios: [] // Inicializamos los horarios vacíos por especialidad
        }))
      }

      // Asignamos los horarios a las especialidades correspondientes
      doctor.schedule.forEach(schedule => {
        specialtyNames.forEach(specialtyName => {
          // Verificamos si el horario pertenece a esta especialidad
          const specialtyObj = groupedSchedules[doctorName].find(
            item => item.Especialidad === specialtyName
          )

          if (specialtyObj) {
            specialtyObj.horarios.push({
              dayOfWeek: schedule.dayOfWeek,
              startTime: schedule.startTime,
              endTime: schedule.endTime
            })
          }
        })
      })
    })

    // Responder con los horarios agrupados
    return res.status(200).json(groupedSchedules)
  } catch (error) {
    console.error('Error al obtener los horarios:', error)
    return res.status(500).json({ message: 'Error al obtener los horarios.' })
  }
}

module.exports = {
  createSchedule,
  listSchedules
}
