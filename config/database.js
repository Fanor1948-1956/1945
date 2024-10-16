const mongoose = require("mongoose");
require("dotenv").config(); // Cargar variables de entorno

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI); // Eliminar las opciones en desuso
    console.log("Conectado a MongoDB");
  } catch (error) {
    console.error("Error conectando a MongoDB", error);
    process.exit(1); // Terminar el proceso en caso de error
  }
};

module.exports = { connectDB };

