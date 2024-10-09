
// middleware/authMiddleware.js
const verifyToken = (req, res, next) => {
  if (req.session && req.session.authenticated) {
    return next(); // Si el usuario está autenticado, continuar
  }
  return res.redirect('/login'); // Si no, redirigir a la página de inicio de sesión
};
// middleware/auth.js
const isNotAuthenticated = (req, res, next) => {
  if (!req.session || !req.session.authenticated) {
    return next(); // Si no está autenticado, continuar
  } else {
    return res.redirect('/dashboard'); // Redirigir a dashboard si ya está autenticado
  }
};

module.exports = { verifyToken, isNotAuthenticated };
