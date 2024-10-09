// services/rolesService.js
const {
  Patient,
  Doctor,
  Admin,
  ChiefMedical,
  User,
} = require('../models/userModel');

const resolveRole = (rolesFound) => {
  const roleNames = rolesFound.map((role) => role.name);
  if (roleNames.includes('Paciente')) {
    return Patient; // Retorna el modelo Patient si se encuentra
  } else if (roleNames.includes('Doctor')) {
    return Doctor;
  } else if (roleNames.includes('Admin')) {
    return Admin;
  } else if (roleNames.includes('ChiefMedical')) {
    return ChiefMedical;
  } else {
    return User; // Rol por defecto si no se encuentra ninguno específico
  }
};

module.exports = { resolveRole };
