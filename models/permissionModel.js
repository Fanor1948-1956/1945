
const mongoose = require('mongoose');

const PermissionSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true }, 
  isActive: { type: Boolean, default: true }, 
  createdAt: { type: Date, default: Date.now }, 
});

module.exports = mongoose.model('Permission', PermissionSchema);
