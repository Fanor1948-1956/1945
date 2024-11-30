
const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
  accountType: {
    type: String,
    enum: ['Patient', 'Doctor', 'Admin', 'ChiefMedical', 'Temporary'],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, 
  },
});


const Account = mongoose.model('Account', accountSchema);

module.exports = Account;
