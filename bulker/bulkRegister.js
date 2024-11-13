// const mongoose = require('mongoose')
// const bcrypt = require('bcrypt')
// const { faker } = require('@faker-js/faker')
// const Specialty = require('../models/Specialty') // Importa el modelo Specialty
// const {
//   User,
//   Admin,
//   Doctor,
//   ChiefMedical,
//   Patient
// } = require('../models/userModel')
// const roleModel = require('../models/roleModel')
// const connectDB = require('./database')

// // Función para generar una fecha aleatoria entre dos años
// const generateRandomDate = (startYear, endYear) => {
//   const startDate = new Date(startYear, 0, 1) // 1 de enero del año de inicio
//   const endDate = new Date(endYear, 11, 31) // 31 de diciembre del año final

//   const randomTime =
//     startDate.getTime() +
//     Math.random() * (endDate.getTime() - startDate.getTime())

//   return new Date(randomTime)
// }

// // Función para registrar usuarios masivamente
// async function bulkRegisterUsers () {
//   try {
//     // Conexión a la base de datos
//     await connectDB()

//     // Buscar roles disponibles
//     const rolesFound = await roleModel.find()
//     if (!rolesFound.length) {
//       console.log('No se encontraron roles válidos.')
//       return
//     }

//     // Buscar especialidades disponibles
//     const specialtiesFound = await Specialty.find()
//     if (!specialtiesFound.length) {
//       console.log('No se encontraron especialidades válidas.')
//       return
//     }

//     const usersToCreate = []

//     // Crear usuarios masivos
//     for (let i = 0; i < 50; i++) {
//       const name = faker.person.firstName()
//       const surnames = faker.person.lastName()
//       const email = faker.internet.email()
//       const password = 'Password123' // Contraseña predeterminada
//       const gender = faker.helpers.arrayElement(['masculino', 'femenino'])
//       const userRole = faker.helpers.arrayElement(rolesFound) // Asigna un rol aleatorio

//       // Validación de correo
//       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
//       if (!emailRegex.test(email)) {
//         console.log(`El correo electrónico ${email} no es válido.`)
//         continue
//       }

//       // Hashear la contraseña
//       const hashedPassword = bcrypt.hashSync(password, 10)

//       let UserType
//       let specialties = []

//       // Lógica para asignar un tipo de usuario y sus especialidades
//       switch (userRole.name) {
//         case 'Administrador':
//           UserType = Admin
//           break
//         case 'Doctor':
//           UserType = Doctor
//           // Asigna especialidades aleatorias a los doctores
//           specialties = faker.helpers.arrayElements(specialtiesFound, 2) // Asigna 2 especialidades aleatorias
//           break
//         case 'Jefe Médico':
//           UserType = ChiefMedical
//           break
//         case 'Paciente':
//           UserType = Patient
//           break
//         default:
//           console.log(`Rol no reconocido: ${userRole.name}`)
//           continue
//       }

//       const createdAt = generateRandomDate(1917, 2050)
//       const updatedAt = createdAt

//       // Asignación de especialidades con nombre e id
//       const specialtyDetails = specialties
//         .map(specialty => {
//           const specialtyDoc = specialtiesFound.find(
//             s => s.name === specialty.name
//           )
//           return specialtyDoc
//             ? { _id: specialtyDoc._id, name: specialtyDoc.name }
//             : null
//         })
//         .filter(specialty => specialty !== null) // Filtra especialidades nulas

//       // Crear el nuevo usuario con sus especialidades y roles
//       const newUser = new UserType({
//         name,
//         surnames,
//         email,
//         password: hashedPassword,
//         gender,
//         roles: [userRole._id],
//         specialties: specialtyDetails, // Asignación de especialidades con id y name
//         createdAt,
//         updatedAt
//       })

//       usersToCreate.push(newUser)
//     }

//     // Insertar todos los usuarios creados en la base de datos
//     await User.insertMany(usersToCreate, { timestamps: false })
//     console.log('Usuarios creados exitosamente')
//   } catch (error) {
//     console.error('Error al crear usuarios:', error)
//   } finally {
//     mongoose.connection.close()
//   }
// }

// // Ejecutar la función para registrar los usuarios
// bulkRegisterUsers()
