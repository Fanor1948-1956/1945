const mongoose = require('mongoose');
const connectDB = require('./database');
// const roleModel = require('../models/roleModel');
// const uploadModel = require('../models/uploadModel');
const chartModel = require('../models/chartModel');
const Schedule = require('../models/scheduleModel');
const { Doctor } = require('../models/userModel');
const permissionModel = require('../models/permissionModel');
const eliminarTodosLosPermisos = async () => {
  try {
    await connectDB();
    const result = await permissionModel.deleteMany({});
    console.log('Todos los permisos eliminados:', result);
  } catch (error) {
    console.error('Error al eliminar los permisos:', error);
  } finally {
    mongoose.connection.close();
  }
};

eliminarTodosLosPermisos();
