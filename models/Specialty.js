

const mongoose = require("mongoose");

const SpecialtySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true, 
    },
    description: {
      type: String,
      required: true,
      trim: true, 
    },
    isActive: {
      type: Boolean,
      default: true, 
    },
  },
  { timestamps: true }
); 

const Specialty = mongoose.model("Specialty", SpecialtySchema);
module.exports = Specialty;
