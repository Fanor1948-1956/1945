// common.js
import { getState } from '../../reducers/state.js';
import { loadUploads } from '../../logic/upload/uploadLogic.js';
import { handleItemUploadOrUpdate } from '../upload/handlers.js';

/**
 * Carga el perfil de usuario y los archivos asociados, y actualiza el estado global.
 * @param {Function} fetchModelFunc - La función para cargar el perfil (por ejemplo, loadUserProfile).
 * @param {String} keyModel - La clave del modelo en el estado global (por ejemplo, 'profile').
 */
export async function initializeModelAndUploads(ownerModel, ownerId, count) {
  try {
    // await fetchModelFunc();

    // // Obtiene ownerModel y ownerId del estado global
    // const { ownerModel, ownerId } = getState()[keyModel];
    console.log('Owner Model:', ownerModel);
    console.log('Owner ID:', ownerId);

    // Cargar archivos del usuario de manera dinámica
    if (ownerModel && ownerId) {
      await loadUploads(ownerModel, ownerId, count);
    } else {
      console.error('No se encontró el modelo o el ID del propietario.');
    }
  } catch (error) {
    console.error('Error al cargar el perfil y los archivos:', error);
  }
}
// Configurar el botón de subida
export function setupUploadButton(fetchModelFunc, keyModel) {
  const uploadButton = document.getElementById('uploadButton');
  const fileInput = document.getElementById('uploadInput');

  uploadButton.addEventListener('click', async () => {
    const file = fileInput.files[0];
    const { ownerModel, ownerId } = getState()[keyModel];

    if (!file) {
      alert('Selecciona un archivo antes de subir.');
      return;
    }

    if (ownerModel && ownerId) {
      const description = 'Archivo de perfil';

      // Manejar la subida del archivo y luego recargar uploads
      await handleItemUploadOrUpdate(
        null, // Sin uploadId
        description,
        file,
        ownerModel,
        ownerId._id
      );

      // Recargar uploads para actualizar la lista
      await loadUploads(ownerModel, ownerId._id);

      fileInput.value = ''; // Limpiar entrada
    } else {
      console.error('No se encontró el modelo o el ID del propietario.');
    }
  });
}
