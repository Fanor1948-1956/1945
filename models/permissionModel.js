const mongoose = require('mongoose')

const PermissionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },

    charts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chart' }], // Referencia a los uploads
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Permission', PermissionSchema)
