// controllers/uploadController.js

const Upload = require('../models/uploadModel');
const resolveModel = require('../utils/modelResolve'); // Importa la función resolver del modelo

// Controlador para subir archivos
const saveOrUpdateUpload = async (req, res) => {
  try {
    const { uploadId, ownerModel, ownerId } = req.params; // Obtiene el ID del archivo, modelo y propietario
    const { description } = req.body;

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

    // Si hay un uploadId, intenta actualizar el archivo existente
    if (uploadId) {
      const existingUpload = await Upload.findById(uploadId);

      if (!existingUpload) {
        return res.status(404).json({ message: 'Archivo no encontrado.' });
      }

      // Si se proporciona un nuevo archivo, reemplaza el existente
      if (req.file) {
        // Primero, puedes eliminar el archivo existente del sistema de archivos (opcional)
        const fs = require('fs');
        const pathToDelete = existingUpload.path;

        fs.unlink(pathToDelete, (err) => {
          if (err)
            console.error('Error al eliminar el archivo del sistema:', err);
        });

        // Actualiza los datos del upload con el nuevo archivo
        existingUpload.filename = req.file.originalname;
        existingUpload.path = req.file.path;
        existingUpload.mimeType = req.file.mimetype;
        existingUpload.size = req.file.size;
      }

      // Actualiza la descripción si se proporciona
      if (description) {
        existingUpload.description = description;
      }

      // Mantener el ownerModel y ownerId (opcional)
      existingUpload.ownerModel = ownerModel;
      existingUpload.owner = ownerId;

      // Guarda los cambios
      const updatedUpload = await existingUpload.save();

      return res.status(200).json({
        success: true,
        message: 'Archivo actualizado exitosamente.',
        data: updatedUpload,
      });
    } else {
      // Si no hay uploadId, sube un nuevo archivo
      if (!req.file) {
        return res
          .status(400)
          .json({ message: 'No se ha subido ningún archivo.' });
      }

      // Crea una nueva instancia de Upload
      const uploadData = new Upload({
        filename: req.file.originalname,
        path: req.file.path,
        mimeType: req.file.mimetype,
        size: req.file.size,
        owner: ownerId,
        ownerModel,
        description,
      });

      // Guarda el archivo en la base de datos
      await uploadData.save();

      // Actualiza el modelo correspondiente para agregar la referencia
      await ModelToUpdate.findByIdAndUpdate(ownerId, {
        $push: { uploads: uploadData._id },
      });

      return res.status(201).json({
        success: true,
        message: 'Archivo subido y guardado en la base de datos',
        data: uploadData,
      });
    }
  } catch (error) {
    console.error('Error al guardar o actualizar el archivo:', error);
    res.status(500).json({
      message: 'Error al guardar o actualizar el archivo.',
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


const updateUpload = async (req, res) => {
  try {
    const { uploadId } = req.params;
    const { description } = req.body;
    const { ownerModel, ownerId } = req.params; // Asegúrate de que ownerModel y ownerId estén en los parámetros

    // Busca el archivo por ID
    const existingUpload = await Upload.findById(uploadId);

    if (!existingUpload) {
      return res.status(404).json({ message: 'Archivo no encontrado.' });
    }

    // Si se proporciona un nuevo archivo, reemplaza el existente
    if (req.file) {
      // Primero, puedes eliminar el archivo existente del sistema de archivos (opcional)
      const fs = require('fs');
      const pathToDelete = existingUpload.path;

      fs.unlink(pathToDelete, (err) => {
        if (err)
          console.error('Error al eliminar el archivo del sistema:', err);
      });

      // Actualiza los datos del upload con el nuevo archivo
      existingUpload.filename = req.file.originalname;
      existingUpload.path = req.file.path;
      existingUpload.mimeType = req.file.mimetype;
      existingUpload.size = req.file.size;
    }

    // Actualiza la descripción si se proporciona
    if (description) {
      existingUpload.description = description;
    }

    // Mantener el ownerModel y ownerId
    existingUpload.ownerModel = ownerModel; // Esto solo si necesitas almacenarlo en el modelo Upload
    existingUpload.owner = ownerId; // Esto solo si necesitas almacenarlo en el modelo Upload

    // Guarda los cambios
    const updatedUpload = await existingUpload.save();

    res.status(200).json({
      success: true,
      message: 'Archivo actualizado exitosamente.',
      data: updatedUpload,
    });
  } catch (error) {
    console.error('Error al actualizar el archivo:', error);
    res.status(500).json({
      message: 'Error al actualizar el archivo.',
      error,
    });
  }
};

const deleteUpload = async (req, res) => {
  try {
    const { uploadId, ownerModel, ownerId } = req.params;

    // Busca y elimina el archivo
    const uploadToDelete = await Upload.findByIdAndDelete(uploadId);

    if (!uploadToDelete) {
      return res.status(404).json({ message: 'Archivo no encontrado.' });
    }

    // Resuelve el modelo del propietario y elimina la referencia del archivo
    const ModelToUpdate = resolveModel(ownerModel);
    if (ModelToUpdate && ownerId) {
      await ModelToUpdate.findByIdAndUpdate(ownerId, {
        $pull: { uploads: uploadId },
      });
    }

    res.status(200).json({
      success: true,
      message: 'Archivo eliminado exitosamente.',
      data: { uploadId }, // Incluye el ID o cualquier otro dato relevante
    });
  } catch (error) {
    console.error('Error al eliminar el archivo:', error);
    res.status(500).json({
      message: 'Error al eliminar el archivo.',
      error,
    });
  }
};

// Exporta los controladores
module.exports = {
  saveOrUpdateUpload,
  getUploadsByModel,
  updateUpload, // Nueva función de actualización
  deleteUpload, // Nueva función de eliminación
};
