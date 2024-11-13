const mongoose = require('mongoose')

const scheduleSchema = new mongoose.Schema(
  {
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' }, // Relacionado con el Doctor
    dayOfWeek: {
      type: String,
      enum: [
        'Lunes',
        'Martes',
        'Miércoles',
        'Jueves',
        'Viernes',
        'Sábado',
        'Domingo'
      ],
      required: true
    },
    startTime: {
      type: String,
      required: true,
      match: /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/ // Formato de hora válido
    },
    endTime: {
      type: String,
      required: true,
      match: /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/ // Formato de hora válido
    }
  },
  { timestamps: true }
)

const Schedule = mongoose.model('Schedule', scheduleSchema)

module.exports = Schedule
