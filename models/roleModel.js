const mongoose = require('mongoose')

const RoleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    alias: { type: String, required: true },
    description: { type: String },
    permissions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Permission' }],

    charts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chart' }], // Referencia a los uploads
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
)

RoleSchema.pre('save', function (next) {
  this.updatedAt = Date.now()
  next()
})

module.exports = mongoose.model('Role', RoleSchema)
