const Permission = require('../models/permissionModel');

exports.createPermission = async (req, res) => {
  const { name } = req.body;
  try {
    const newPermission = new Permission({ name });
    await newPermission.save();
    res.redirect('/permissions');
  } catch (err) {
    console.log(err);
    res.status(500).send('Error creando el permiso');
  }
};
