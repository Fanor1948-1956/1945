
module.exports = (req, res, next) => {
  
  
  req.isApiRequest = req.headers['accept'] === 'application/json';

  next();
};
