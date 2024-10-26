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
    if (response) {
      setState({ uploads: response.data });
      return response.message;
    }
    console.log('Archivos obtenidos:', response.data);
  } catch (error) {
    console.error('Error al obtener archivos:', error);
    throw error;
  }
};

// Subir un archivo
export const uploadFile = async (
  file,
  ownerModel,
  ownerId,
  description = ''
) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('description', description); // La descripción se queda en el body

  try {
    const response = await apiFetch(
      `${uploadEndpoints.add}/${ownerModel}/${ownerId}`, // Asegúrate de que la URL incluya el modelo y el ID
      'POST',
      formData
    );

    console.log('Upload complete for upload ', response);
    if (response) {
      setState({ uploads: [...getState().uploads, response] });
      return response.message;
    }
  } catch (error) {
    console.error('Error al subir el archivo:', error);
    throw error;
  }
};
