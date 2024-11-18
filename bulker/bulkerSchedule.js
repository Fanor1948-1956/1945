// const mongoose = require('mongoose');
// const { faker } = require('@faker-js/faker');
// const Schedule = require('../models/scheduleModel'); // Modelo de horario
// const { Doctor } = require('../models/userModel'); // Modelo de Doctor
// const Specialty = require('../models/Specialty'); // Modelo de Especialidad
// const connectDB = require('./database'); // Función para conectar a la DB

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
//   'El Alto',
// ];

// // Función para generar horarios aleatorios (horas de inicio y fin)
// function generateRandomSchedule() {
//   const daysOfWeek = [
//     'Lunes',
//     'Martes',
//     'Miércoles',
//     'Jueves',
//     'Viernes',
//     'Sábado',
//     'Domingo',
//   ];
//   const randomDays = faker.helpers.arrayElements(daysOfWeek, 3); // Elige 3 días aleatorios

//   return randomDays.map((day) => {
//     const startHour = faker.number.int({ min: 8, max: 17 }); // Hora entre 8 y 17
//     const startMinute = faker.number.int({ min: 0, max: 59 }); // Minutos entre 00 y 59
//     const startTime = `${String(startHour).padStart(2, '0')}:${String(
//       startMinute
//     ).padStart(2, '0')}`;

//     const endHour = faker.number.int({ min: startHour, max: 18 }); // Hora entre startHour y 18
//     const endMinute = faker.number.int({ min: 0, max: 59 }); // Minutos entre 00 y 59
//     const endTime = `${String(endHour).padStart(2, '0')}:${String(
//       endMinute
//     ).padStart(2, '0')}`;

//     return {
//       dayOfWeek: day,
//       startTime,
//       endTime,
//     };
//   });
// }

// // Función para asignar un número aleatorio de especialidades a cada doctor
// function getRandomSpecialties(specialtiesFound, min = 1, max = 3) {
//   const numberOfSpecialties = faker.number.int({ min, max }); // Elige un número aleatorio entre min y max
//   return faker.helpers.arrayElements(specialtiesFound, numberOfSpecialties);
// }

// async function bulkerSchedule() {
//   try {
//     await connectDB();

//     // Buscar especialidades disponibles
//     const specialtiesFound = await Specialty.find();
//     if (!specialtiesFound.length) {
//       console.log('No se encontraron especialidades válidas.');
//       return;
//     }

//     // Buscar todos los doctores
//     const doctors = await Doctor.find();
//     if (!doctors.length) {
//       console.log('No se encontraron doctores en la base de datos.');
//       return;
//     }

//     // Actualizar especialidades, ciudad y horarios de los doctores
//     for (let doctor of doctors) {
//       // Asignar un número aleatorio de especialidades entre 1 y 3 (o cualquier otro rango)
//       const newSpecialties = getRandomSpecialties(specialtiesFound, 1, 3); // Número aleatorio entre 1 y 3 especialidades
//       doctor.specialties = newSpecialties.map((specialty) => specialty._id); // Asignar los _id de las especialidades

//       // Asignar una ciudad aleatoria de Bolivia
//       doctor.city = faker.helpers.arrayElement(bolivianCities); // Asigna una ciudad aleatoria

//       // Lógica para decidir si asignar horarios o no (50% de chance)
//       const assignSchedules = faker.datatype.boolean(); // Genera un valor booleano aleatorio

//       if (assignSchedules) {
//         // Solo asignar horarios si 'assignSchedules' es true
//         const schedules = generateRandomSchedule(); // Genera horarios aleatorios

//         // Crear nuevos documentos de Schedule
//         const scheduleDocs = await Schedule.create(
//           schedules.map((schedule) => ({
//             doctor: doctor._id,
//             ...schedule, // Copia los datos generados del horario
//           }))
//         );

//         doctor.schedule = scheduleDocs.map((schedule) => schedule._id); // Asignamos los horarios generados al doctor
//       } else {
//         // Si no se asignan horarios, dejamos el campo 'schedule' vacío
//         doctor.schedule = [];
//       }

//       // Guardar los cambios en la base de datos
//       await doctor.save();
//       console.log(
//         `Especialidades y ciudad actualizadas para el doctor ${
//           doctor.name
//         }. Horarios ${assignSchedules ? 'asignados' : 'no asignados'}.`
//       );
//     }

//     console.log(
//       'Especialidades, ciudades y horarios de los doctores actualizados exitosamente.'
//     );
//   } catch (error) {
//     console.error(
//       'Error al actualizar especialidades, ciudades y horarios de los doctores:',
//       error
//     );
//   } finally {
//     mongoose.connection.close(); // Cerrar la conexión a la base de datos
//   }
// }

// // Ejecutar la función para actualizar los doctores
// bulkerSchedule();

const mongoose = require('mongoose')
const { faker } = require('@faker-js/faker')
const { Doctor } = require('../models/userModel') // Modelo de Doctor
const Specialty = require('../models/Specialty') // Modelo de Especialidad
const connectDB = require('./database') // Función para conectar a la DB

// Lista de ciudades en Bolivia
const bolivianCities = [
  'La Paz',
  'Santa Cruz de la Sierra',
  'Cochabamba',
  'Sucre',
  'Oruro',
  'Potosí',
  'Tarija',
  'Trinidad',
  'Cobija',
  'El Alto'
]

// Función para asignar un número aleatorio de especialidades a cada doctor
function getRandomSpecialties (specialtiesFound, min = 1, max = 3) {
  const numberOfSpecialties = faker.number.int({ min, max }) // Elige un número aleatorio entre min y max
  return faker.helpers.arrayElements(specialtiesFound, numberOfSpecialties)
}

async function bulkerSchedule () {
  try {
    await connectDB()

    // Buscar especialidades disponibles
    const specialtiesFound = await Specialty.find()
    if (!specialtiesFound.length) {
      console.log('No se encontraron especialidades válidas.')
      return
    }

    // Buscar todos los doctores
    const doctors = await Doctor.find()
    if (!doctors.length) {
      console.log('No se encontraron doctores en la base de datos.')
      return
    }

    // Actualizar especialidades, ciudad y asegurarse de que el campo `schedule` sea vacío
    for (let doctor of doctors) {
      // Asignar un número aleatorio de especialidades entre 1 y 3
      const newSpecialties = getRandomSpecialties(specialtiesFound, 1, 5) // Número aleatorio entre 1 y 3 especialidades
      doctor.specialties = newSpecialties.map(specialty => specialty._id) // Asignar los _id de las especialidades

      // Asignar una ciudad aleatoria de Bolivia
      doctor.city = faker.helpers.arrayElement(bolivianCities) // Asigna una ciudad aleatoria

      // Asignar horarios vacíos explícitamente
      doctor.schedule = [] // Esto asegura que el campo `schedule` está vacío

      // Guardar los cambios en la base de datos
      await doctor.save()
      console.log(
        `Especialidades y ciudad actualizadas para el doctor ${doctor.name}. Horarios vacíos asignados.`
      )
    }

    console.log(
      'Especialidades, ciudades y horarios vacíos de los doctores actualizados exitosamente.'
    )
  } catch (error) {
    console.error(
      'Error al actualizar especialidades, ciudades y horarios vacíos de los doctores:',
      error
    )
  } finally {
    mongoose.connection.close() // Cerrar la conexión a la base de datos
  }
}

// Ejecutar la función para actualizar los doctores
bulkerSchedule()
