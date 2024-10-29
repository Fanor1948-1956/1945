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
    console.log('Model:', ownerModel, 'Owner ID:', ownerId);

    // Validación de parámetros
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
    console.log('Owner Exists:', ownerExists);

    if (!ownerExists) {
      return res.status(404).json({ message: 'Propietario no encontrado.' });
    }

    // Recuperar uploads
    const uploads = await Upload.find({
      owner: ownerId,
      ownerModel: ownerModel,
    });
    console.log('Uploads Found:', uploads);

    // Respuesta con los uploads
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

const deleteUpload = async (req, res) => {
  try {
    const { uploadId, ownerModel, ownerId } = req.params;

    // Busca el archivo en la base de datos
    const uploadToDelete = await Upload.findById(uploadId);

    if (!uploadToDelete) {
      return res.status(404).json({ message: 'Archivo no encontrado.' });
    }

    // Actualizar el archivo para marcarlo como eliminado
    await Upload.findByIdAndUpdate(uploadId, { isSelected: true });

    // Eliminar referencia en el modelo de propietario
    const ModelToUpdate = resolveModel(ownerModel);
    if (ModelToUpdate && ownerId) {
      await ModelToUpdate.findByIdAndUpdate(ownerId, {
        $pull: { uploads: uploadId },
      });
    }

    res.status(200).json({
      success: true,
      message: 'Archivo eliminado exitosamente.',
      data: { uploadId },
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
  deleteUpload, // Nueva función de eliminación
};
