// middleware/roleMiddleware.js
const roleModel = require('../models/roleModel');

// Middleware para verificar si el usuario tiene el rol requerido
const checkRole = (requiredRoles) => {
  return async (req, res, next) => {
    // Obtener el rol del usuario desde la sesión
    const userRoles = req.session.roles || []; // Asegúrate de que roles sea un array

    // Verificar si el usuario tiene algún rol requerido
    const hasRole = await Promise.all(
      requiredRoles.map(async (role) => {
        const foundRole = await roleModel.findOne({ name: role });
        return userRoles.includes(foundRole._id.toString());
      })
    );

    if (hasRole.some((role) => role)) {
      return next(); // El usuario tiene el rol adecuado
    }

    return res.status(403).send('Acceso denegado'); // Acceso denegado
  };
};

module.exports = checkRole; // Asegúrate de que esté exportado correctamente

// // utils/resolveModel.js
// const roleModel = require('../models/roleModel');

// // Función para resolver y obtener los roles de un usuario
// const resolveUserRoles = async (userId) => {
//   // Aquí debes buscar el usuario y obtener sus roles
//   // Suponiendo que tienes un modelo de usuario que tiene una referencia a roles
//   const user = await UserModel.findById(userId).populate('roles');
//   return user.roles.map(role => role.name); // Devuelve solo los nombres de los roles
// };

// module.exports = { resolveUserRoles };
