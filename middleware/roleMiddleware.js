
const roleModel = require('../models/roleModel');


const checkRole = (requiredRoles) => {
  return async (req, res, next) => {
    
    const userRoles = req.session.roles || []; 

    
    const hasRole = await Promise.all(
      requiredRoles.map(async (role) => {
        const foundRole = await roleModel.findOne({ name: role });
        return userRoles.includes(foundRole._id.toString());
      })
    );

    if (hasRole.some((role) => role)) {
      return next(); 
    }

    return res.status(403).send('Acceso denegado'); 
  };
};

module.exports = checkRole; 













