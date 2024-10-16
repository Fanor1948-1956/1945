const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { faker } = require('@faker-js/faker'); // Actualiza esta línea

const {
  User,
  Admin,
  Doctor,
  ChiefMedical,
  Patient,
} = require('../models/userModel');
const roleModel = require('../models/roleModel');
const connectDB = require("./database");

const bulkRegisterUsers = async () => {
  try {
       await connectDB();
    const rolesFound = await roleModel.find();

    if (!rolesFound.length) {
      console.log('No se encontraron roles válidos.');
      return;
    }

    const usersToCreate = [];

    for (let i = 0; i < 50; i++) {
      const name = faker.person.firstName();
      const surnames = faker.person.lastName();
      const email = faker.internet.email();
      const password = 'Password123'; // Contraseña fija
      const gender = faker.helpers.arrayElement([
        'masculino',
        'femenino',
        'otro',
      ]);
      const userRole = faker.helpers.arrayElement(rolesFound); // Aquí no debes usar faker.helpers.arrayElement

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        console.log(`El correo electrónico ${email} no es válido.`);
        continue; // Saltar este usuario
      }

      const hashedPassword = bcrypt.hashSync(password, 10);

      let UserType;

      switch (userRole.name) {
        case 'Administrador':
          UserType = Admin;
          break;
        case 'Doctor':
          UserType = Doctor;
          break;
        case 'ChiefMedical':
          UserType = ChiefMedical;
          break;
        case 'Paciente':
          UserType = Patient;
          break;
        default:
          console.log(`Rol no reconocido: ${userRole.name}`);
          continue; // Saltar este usuario
      }

      const newUser = new UserType({
        name,
        surnames,
        email,
        password: hashedPassword,
        gender,
        roles: [userRole._id], // Agregar solo el rol encontrado
      });

      usersToCreate.push(newUser);
    }

    // Guardar todos los usuarios en la base de datos
    await User.insertMany(usersToCreate);
    console.log('Usuarios creados exitosamente');
  } catch (error) {
    console.error('Error al crear usuarios:', error);
  } finally {
    mongoose.connection.close();
  }
};

// Ejecutar la función
bulkRegisterUsers();
