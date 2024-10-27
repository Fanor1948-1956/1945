import { uploadFile } from '../../services/uploadService.js';
import { loadUploads } from './uploadLogic.js';

export const handleFileUploadOrUpdate = async (
  uploadId, // ID del archivo para actualizar o null para crear
  description,
  file,
  ownerModel,
  ownerId
) => {
  try {
    // Llama a uploadFile, que se encargará de decidir si hacer una subida o actualización
    await uploadFile(
      file,
      ownerModel,
      ownerId,
      description,
      uploadId // Pasamos el uploadId como argumento
    );

    // Cargar de nuevo los uploads para actualizar la interfaz
    await loadUploads(ownerModel, ownerId);

    // Mostrar el mensaje de éxito
    const successMessage = uploadId
      ? 'Archivo actualizado exitosamente.'
      : 'Archivo subido exitosamente.';
    showSnackbar(successMessage, true);
  } catch (error) {
    console.error('Error al procesar el archivo:', error);
    showSnackbar(error.message || 'Error al procesar el archivo.', false);
  }
};
