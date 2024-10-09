// models/accountModel.js
const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Referencia al modelo de usuario
    required: true,
  },
  accountType: {
    type: String,
    enum: ['Patient', 'Doctor', 'Admin', 'ChiefMedical', 'Temporary'],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Fecha de creación por defecto
  },
});

// Crea el modelo de cuenta
const Account = mongoose.model('Account', accountSchema);

module.exports = Account;
