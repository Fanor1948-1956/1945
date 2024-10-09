// middleware/responseTypeMiddleware.js
module.exports = (req, res, next) => {
  // Determinar si la llamada es desde la API o desde la UI
  // En este ejemplo, se verifica si hay un header 'Accept' que indica JSON
  req.isApiRequest = req.headers['accept'] === 'application/json';

  next();
};
