const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY;

// Middleware combinado para verificar JWT o sesión
const verifyToken = (req, res, next) => {
  // Verifica si existe una sesión activa
  if (req.session && req.session.authenticated) {
    return next(); // Continuar si el usuario está autenticado por sesión
  }

  // Si no hay sesión, verificamos el token JWT
  let token;

  if (req.cookies && req.cookies.token) {
    token = req.cookies.token; // Busca el token en las cookies
  } else if (req.headers['authorization']) {
    token = req.headers['authorization'].split(' ')[1]; // O en los headers (Bearer token)
  }

  // Si no hay token, redirige al login
  if (!token) {
    return res.status(401).redirect('/login');
  }

  // Verifica el token JWT
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).redirect('/login'); // Token inválido, redirigir
    }

    // Si es válido, guarda el ID del usuario en la request
    req.userId = decoded.id;
    next(); // Continúa con la siguiente función
  });
};

// Middleware para usuarios no autenticados
const isNotAuthenticated = (req, res, next) => {
  if (!req.session || !req.session.authenticated) {
    return next(); // Continuar si no está autenticado
  }
  return res.redirect('/dashboard'); // Redirigir si ya está autenticado
};

module.exports = { verifyToken, isNotAuthenticated };
