// deleteAllPermissions.js
const mongoose = require("mongoose");
const connectDB = require("./database");
const roleModel = require("../models/roleModel");


// Función para eliminar todos los permisos
const eliminarTodosLosPermisos = async () => {
  try {
           await connectDB();
    const result = await roleModel.deleteMany({});
    console.log("Todos los permisos eliminados:", result);
  } catch (error) {
    console.error("Error al eliminar los permisos:", error);
  } finally {
    mongoose.connection.close();
  }
};

// Ejecutar
eliminarTodosLosPermisos();
