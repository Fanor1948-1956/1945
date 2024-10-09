const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://fanoro1945:fanoro1945@cluster0.j7bgf.mongodb.net/andres?retryWrites=true&w=majority'
    );
    console.log('Conectado a MongoDB');
  } catch (error) {
    console.error('Error conectando a MongoDB', error);
    process.exit(1);
  }
};

module.exports = { connectDB };
