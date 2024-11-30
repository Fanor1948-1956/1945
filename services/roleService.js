
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
    return Patient; 
  } else if (roleNames.includes('Doctor')) {
    return Doctor;
  } else if (roleNames.includes('Admin')) {
    return Admin;
  } else if (roleNames.includes('ChiefMedical')) {
    return ChiefMedical;
  } else {
    return User; 
  }
};

module.exports = { resolveRole };
