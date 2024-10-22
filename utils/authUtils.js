

const jwt = require('jsonwebtoken');


const SECRET_KEY = 'mi-clave-secreta';


const generateToken = (user) => {
  
  const token = jwt.sign(
    {
      userId: user._id,
      email: user.email,
      roles: user.roles,
    },
    SECRET_KEY,
    { expiresIn: '1h' } 
  );

  return token;
};


module.exports = { generateToken };
