const Location = require('../models/locationModel');

// Registrar la ubicación del usuario (cuando se conecta o cuando cambia)
const registerLocation = async (req, res) => {
  try {
    const { userId, latitude, longitude } = req.body;

    // Verificar si los datos de ubicación están completos
    if (!userId || !latitude || !longitude) {
      return res
        .status(400)
        .json({ message: 'Datos de ubicación incompletos.' });
    }

    // Comprobar si ya existe una ubicación del usuario en la base de datos
    const existingLocation = await Location.findOne({ userId });

    if (existingLocation) {
      // Si la ubicación ya existe, actualizarla
      existingLocation.latitude = latitude;
      existingLocation.longitude = longitude;
      existingLocation.timestamp = Date.now(); // Actualizar el timestamp

      await existingLocation.save();
      return res
        .status(200)
        .json({ message: 'Ubicación actualizada correctamente' });
    } else {
      // Si no existe, registrar una nueva ubicación
      const newLocation = new Location({
        userId,
        latitude,
        longitude,
      });

      await newLocation.save();
      return res
        .status(200)
        .json({ message: 'Ubicación registrada correctamente' });
    }
  } catch (err) {
    console.error('Error al registrar la ubicación:', err);
    return res.status(500).json({ message: 'Error al registrar ubicación.' });
  }
};

// Obtener todas las ubicaciones de los usuarios
const getAllLocations = async (req, res) => {
  try {
    const locations = await Location.find().populate('userId', 'name'); // Puedes incluir más campos del usuario aquí
    res.render('locations.njk', {
      locations: locations,
    });
  } catch (err) {
    console.error('Error al obtener las ubicaciones:', err);
    res.status(500).send('Error al obtener las ubicaciones');
  }
};

module.exports = {
  registerLocation,
  getAllLocations,
};
