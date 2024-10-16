const mongoose = require("mongoose");
require("dotenv").config(); // Para cargar las variables de entorno desde .env


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Conectado a MongoDB");
  } catch (error) {
    console.error("Error conectando a MongoDB", error);
    process.exit(1); // Finaliza el proceso en caso de error
  }
};

module.exports = connectDB;

