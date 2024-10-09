// // /utils/authUtils.js
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');

// // Función para generar un token JWT
// const generateToken = (user) => {
//   return jwt.sign({ id: user.id, username: user.username }, 'mi_secreto', {
//     expiresIn: '1h', // Token válido por 1 hora
//   });
// };

// // Función para verificar la contraseña
// const verifyPassword = (password, hashedPassword) => {
//   return bcrypt.compareSync(password, hashedPassword);
// };

// module.exports = { generateToken, verifyPassword };
const jwt = require('jsonwebtoken');

// Clave secreta para firmar el token JWT
const SECRET_KEY = 'mi-clave-secreta';

// Función para generar un token JWT
const generateToken = (user) => {
  // Crear el token con la información del usuario
  const token = jwt.sign(
    {
      userId: user._id,
      email: user.email,
      roles: user.roles,
    },
    SECRET_KEY,
    { expiresIn: '1h' } // El token expira en 1 hora
  );

  return token;
};

// Exportar la función para que pueda ser usada en otras partes de la app
module.exports = { generateToken };
