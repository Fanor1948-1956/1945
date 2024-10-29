import { uploadFile } from '../../services/uploadService.js';
import { loadUploads } from './uploadLogic.js';

export const handleItemUploadOrUpdate = async (
  uploadId,
  description,
  file,
  ownerModel,
  ownerId,
  index
) => {
  try {
    // Realizar la operación de subida o actualización
    const responseMessage = await uploadFile(
      file,
      ownerModel,
      ownerId,
      description,
      uploadId
    );

    // Condicional para mostrar mensaje dependiendo de si se está subiendo o actualizando
    const successMessage = uploadId
      ? responseMessage.message || 'Archivo actualizado exitosamente.'
      : responseMessage.message || 'Archivo subido exitosamente.';

    console.log(successMessage, `en índice: ${index}`);
    showSnackbar(successMessage, true);

    // Recargar lista o actualizar solo la posición del índice especificado
    await loadUploads(ownerModel, ownerId, index);
  } catch (error) {
    console.error('Error al procesar el archivo:', error);
    showSnackbar(error.message || 'Error al procesar el archivo.', false);
  }
};
