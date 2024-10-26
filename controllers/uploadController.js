// controllers/uploadController.js

const Upload = require('../models/uploadModel');
const resolveModel = require('../utils/modelResolve'); // Importa la función resolver del modelo

// Controlador para subir archivos
const uploadFile = async (req, res) => {
  try {
    // Verifica si hay un archivo en la solicitud
    if (!req.file) {
      return res
        .status(400)
        .json({ message: 'No se ha subido ningún archivo.' });
    }

    // Asegúrate de que el ownerModel y ownerId se pasen en la solicitud
    const { ownerModel, ownerId } = req.params; // Obtiene ownerModel y ownerId de los parámetros
    const { description } = req.body; // Obtiene la descripción del cuerpo de la solicitud
    if (!ownerModel || !ownerId) {
      return res.status(400).json({
        message: 'Falta el modelo de propietario o el ID del propietario.',
      });
    }

    // Resuelve el modelo correspondiente
    const ModelToUpdate = resolveModel(ownerModel);
    if (!ModelToUpdate) {
      return res
        .status(400)
        .json({ message: 'Modelo de propietario no válido.' });
    }

    // Verifica si el propietario existe
    const ownerExists = await ModelToUpdate.exists({ _id: ownerId });
    if (!ownerExists) {
      return res.status(404).json({ message: 'Propietario no encontrado.' });
    }

    // Crea una nueva instancia de Upload
    const uploadData = new Upload({
      filename: req.file.originalname,
      path: req.file.path,
      mimeType: req.file.mimetype,
      size: req.file.size,
      owner: ownerId,
      ownerModel, // Aquí puedes usar cualquier modelo válido
      description, // Agrega descripción desde req.body
    });

    // Guarda el archivo en la base de datos
    await uploadData.save();

    // Actualiza el modelo correspondiente para agregar la referencia
    await ModelToUpdate.findByIdAndUpdate(ownerId, {
      $push: { uploads: uploadData._id },
    });

    res.status(201).json({
      success: true,
      message: 'Archivo subido y guardado en la base de datos',
      data: uploadData,
    });
  } catch (error) {
    console.error('Error al subir el archivo:', error);
    res.status(500).json({
      message: 'Error al guardar el archivo en la base de datos',
      error,
    });
  }
};

const getUploadsByModel = async (req, res) => {
  try {
    const { ownerModel, ownerId } = req.params;
    console.log('Model:', ownerModel, 'Owner ID:', ownerId); // Log para depuración

    if (!ownerModel || !ownerId) {
      return res.status(400).json({
        message: 'Falta el modelo de propietario o el ID del propietario.',
      });
    }

    const ModelToQuery = resolveModel(ownerModel);
    if (!ModelToQuery) {
      return res
        .status(400)
        .json({ message: 'Modelo de propietario no válido.' });
    }

    const ownerExists = await ModelToQuery.exists({ _id: ownerId });
    console.log('Owner Exists:', ownerExists); // Log para depuración

    if (!ownerExists) {
      return res.status(404).json({ message: 'Propietario no encontrado.' });
    }

    const uploads = await Upload.find({
      owner: ownerId,
      ownerModel: ownerModel,
    });
    console.log('Uploads Found:', uploads); // Log para depuración

    if (!uploads || uploads.length === 0) {
      return res.status(404).json({ message: 'No se encontraron uploads.' });
    }

    res.status(200).json({
      success: true,
      message: 'Uploads recuperados exitosamente.',
      data: uploads,
    });
  } catch (error) {
    console.error('Error al obtener los uploads:', error);
    res.status(500).json({
      message: 'Error al obtener los uploads.',
      error,
    });
  }
};

// Exporta los controladores
module.exports = {
  uploadFile,
  getUploadsByModel,
};
