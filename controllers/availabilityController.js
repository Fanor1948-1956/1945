// controllers/availabilityController.js
const Availability = require('../models/Availability');

exports.createAvailability = async (req, res) => {
  try {
    const availability = new Availability(req.body);
    await availability.save();
    res.status(201).json(availability);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear disponibilidad', error });
  }
};

exports.getAvailability = async (req, res) => {
  try {
    const availability = await Availability.find().populate('specialty');
    res.status(200).json(availability);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error al obtener disponibilidades', error });
  }
};
