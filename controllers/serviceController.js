
const Service = require('../models/Service'); 
const services = [
  { title: 'Services1', description: 'Descripción de la Services1' },
  { title: 'Services2', description: 'Descripción de la Services2' },
  { title: 'Services3', description: 'Descripción de la Services3' },
];

exports.getAllServices = async (req, res) => {
  try {
    
    res.render('pages/privatePages/services.njk', {
      title: 'Servicios Ofrecidos',
      items: services,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener servicios');
  }
};


exports.createService = async (req, res) => {
  if (!req.session.authenticated) {
    return res.status(403).send('No tienes permiso para crear un servicio.');
  }

  try {
    const { name, description, price } = req.body;
    const newService = new Service({ name, description, price });
    await newService.save();
    res.redirect('/services'); 
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al crear servicio');
  }
};
