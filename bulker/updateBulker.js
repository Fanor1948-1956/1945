// const mongoose = require('mongoose')
// const { faker } = require('@faker-js/faker')
// const Specialty = require('../models/Specialty')
// const { Doctor } = require('../models/userModel')
// const Schedule = require('../models/scheduleModel')
// const connectDB = require('./database')

// // Lista de ciudades en Bolivia
// const bolivianCities = [
//   'La Paz',
//   'Santa Cruz de la Sierra',
//   'Cochabamba',
//   'Sucre',
//   'Oruro',
//   'Potosí',
//   'Tarija',
//   'Trinidad',
//   'Cobija',
//   'El Alto'
// ]

// // Función para generar un horario aleatorio para un doctor
// function generateRandomSchedule () {
//   const daysOfWeek = [
//     'Lunes',
//     'Martes',
//     'Miércoles',
//     'Jueves',
//     'Viernes',
//     'Sábado',
//     'Domingo'
//   ]
//   const randomDays = faker.helpers.arrayElements(daysOfWeek, 0) // Elige 3 días aleatorios

//   // Genera horarios aleatorios para esos días
//   const schedule = randomDays.map(day => {
//     // Generamos horas aleatorias entre las 08:00 y las 18:00
//     const startTimeHour = faker.number.int({ min: 8, max: 17 }) // Hora entre 8 y 17
//     const startTimeMinute = faker.number.int({ min: 0, max: 59 }) // Minutos entre 00 y 59
//     const startTime = `${String(startTimeHour).padStart(2, '0')}:${String(
//       startTimeMinute
//     ).padStart(2, '0')}`

//     const endTimeHour = faker.number.int({ min: startTimeHour, max: 18 }) // Hora entre startTimeHour y 18
//     const endTimeMinute = faker.number.int({ min: 0, max: 59 }) // Minutos entre 00 y 59
//     const endTime = `${String(endTimeHour).padStart(2, '0')}:${String(
//       endTimeMinute
//     ).padStart(2, '0')}`

//     return {
//       dayOfWeek: day,
//       startTime,
//       endTime
//     }
//   })

//   return schedule
// }

// // Función de actualización masiva
// async function updateBulker () {
//   try {
//     await connectDB()

//     // Buscar especialidades disponibles
//     const specialtiesFound = await Specialty.find()
//     if (!specialtiesFound.length) {
//       console.log('No se encontraron especialidades válidas.')
//       return
//     }

//     // Buscar todos los doctores
//     const doctors = await Doctor.find()
//     if (!doctors.length) {
//       console.log('No se encontraron doctores en la base de datos.')
//       return
//     }

//     // Actualizar especialidades, ciudad y horarios de los doctores
//     for (let doctor of doctors) {
//       // Asignar especialidades aleatorias
//       const newSpecialties = faker.helpers.arrayElements(specialtiesFound, 0)
//       doctor.specialties = newSpecialties.map(specialty => specialty._id)

//       // Asignar una ciudad aleatoria de Bolivia
//       doctor.city = faker.helpers.arrayElement(bolivianCities)

//       // Generar y asignar horarios aleatorios
//       const schedules = generateRandomSchedule() // Genera horarios aleatorios
//       // Crear nuevos documentos de Schedule
//       const scheduleDocs = await Schedule.create(
//         schedules.map(schedule => ({
//           doctor: doctor._id,
//           ...schedule
//         }))
//       )

//       doctor.schedule = scheduleDocs.map(schedule => schedule._id) // Asigna los horarios generados al doctor

//       // Guardar los cambios en la base de datos
//       await doctor.save()
//     }

//     console.log(
//       'Especialidades, ciudades y horarios de los doctores actualizadas exitosamente'
//     )
//   } catch (error) {
//     console.error(
//       'Error al actualizar especialidades, ciudades y horarios de los doctores:',
//       error
//     )
//   } finally {
//     mongoose.connection.close()
//   }
// }

// updateBulker() // Ejecuta la actualización masiva
