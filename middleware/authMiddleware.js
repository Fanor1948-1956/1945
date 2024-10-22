// middleware/authMiddleware.js
// Middleware para proteger rutas (rutas privadas)
const verifyToken = (req, res, next) => {
  let token;

  // Verifica si el token está en las cookies
  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  } else if (req.headers['authorization']) {
    // Verifica si el token viene de los headers (localStorage)
    token = req.headers['authorization'].split(' ')[1];
  }

  // Si no hay token, redirige al login
  if (!token) {
    return res.status(401).redirect('/login');
  }

  // Verifica el token
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).redirect('/login'); // Token inválido, redirige al login
    }

    // Si es válido, guarda el ID del usuario en la request
    req.userId = decoded.id;
    next(); // Continúa a la siguiente función
  });
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

