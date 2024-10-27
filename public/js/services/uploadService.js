import { getState, setState } from '../reducers/state.js';
import { apiFetch } from '../api/apiFetch.js';
import { uploadEndpoints } from '../config/apiEndpoints.js';

// Obtener archivos subidos por el usuario
export const getUploads = async (ownerModel, ownerId) => {
  try {
    const response = await apiFetch(
      `${uploadEndpoints.get}/${ownerModel}/${ownerId}`,
      'GET'
    );

    if (response && response.success) {
      setState({ uploads: response.data });
      console.log('Archivos obtenidos:', response.data);
      return response.message;
    } else {
      throw new Error(response.message || 'Error al obtener archivos');
    }
  } catch (error) {
    console.error('Error al obtener archivos:', error);
    throw error;
  }
};
// Función para subir un archivo, que maneja la lógica para crear o actualizar
export const uploadFile = async (
  file,
  ownerModel,
  ownerId,
  description = '',
  uploadId = null // uploadId como parámetro opcional
) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('description', description); // Agrega la descripción

  try {
    let response;

    // Determina si hacer una solicitud PUT o POST
    if (uploadId) {
      // Actualizar el archivo existente
      response = await apiFetch(
        `${uploadEndpoints.add}/${ownerModel}/${ownerId}/${uploadId}`,
        'POST', // Cambiamos a PUT para actualización
        formData
      );
    } else {
      // Crear un nuevo archivo
      response = await apiFetch(
        `${uploadEndpoints.add}/${ownerModel}/${ownerId}`,
        'POST', // Usamos POST para creación
        formData
      );
    }

    if (response && response.success) {
      const updatedUploads = [...getState().uploads, response.data];
      setState({ uploads: updatedUploads });
      console.log('Archivo procesado exitosamente:', response.data);
      return response.message;
    } else {
      throw new Error(response.message || 'Error al procesar el archivo');
    }
  } catch (error) {
    console.error('Error al procesar el archivo:', error);
    throw error;
  }
};

// Eliminar un archivo
export const deleteUpload = async (uploadId, ownerModel, ownerId) => {
  try {
    const response = await apiFetch(
      `${uploadEndpoints.delete}/${uploadId}/${ownerModel}/${ownerId}`,
      'DELETE'
    );

    if (response && response.success) {
      const updatedUploads = getState().uploads.filter(
        (upload) => upload._id !== uploadId
      );
      setState({ uploads: updatedUploads });
      console.log('Archivo eliminado exitosamente:', response.data);
      return response.message;
    } else {
      throw new Error(response.message || 'Error al eliminar el archivo');
    }
  } catch (error) {
    console.error('Error al eliminar el archivo:', error);
    throw error;
  }
};
