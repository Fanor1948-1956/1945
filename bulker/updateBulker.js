const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const Specialty = require('../models/Specialty');
const { Doctor } = require('../models/userModel');
const connectDB = require('./database');

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
  'El Alto',
];

// Función de actualización masiva
async function updateBulker() {
  try {
    await connectDB();

    // Buscar especialidades disponibles
    const specialtiesFound = await Specialty.find();
    if (!specialtiesFound.length) {
      console.log('No se encontraron especialidades válidas.');
      return;
    }

    // Buscar todos los doctores
    const doctors = await Doctor.find();
    if (!doctors.length) {
      console.log('No se encontraron doctores en la base de datos.');
      return;
    }

    // Actualizar especialidades y ciudad de los doctores
    for (let doctor of doctors) {
      // Elegir un número aleatorio entre 1 y 3 especialidades
      const numberOfSpecialties = faker.number.int({ min: 1, max: 3 });

      // Asignar entre 1 y 3 especialidades aleatorias
      const newSpecialties = faker.helpers.arrayElements(
        specialtiesFound,
        numberOfSpecialties
      );
      doctor.specialties = newSpecialties.map((specialty) => specialty._id);

      // Asignar una ciudad aleatoria de Bolivia
      doctor.city = faker.helpers.arrayElement(bolivianCities);

      // Guardar los cambios en la base de datos (solo especialidades y ciudad)
      await doctor.save();
    }

    console.log(
      'Especialidades y ciudades de los doctores actualizadas exitosamente'
    );
  } catch (error) {
    console.error(
      'Error al actualizar especialidades y ciudades de los doctores:',
      error
    );
  } finally {
    mongoose.connection.close();
  }
}

updateBulker(); // Ejecuta la actualización masiva
