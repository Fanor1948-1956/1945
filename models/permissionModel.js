const mongoose = require('mongoose');

const PermissionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },

    charts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chart' }], // Referencia a los uploads
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

PermissionSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Permission', PermissionSchema);
