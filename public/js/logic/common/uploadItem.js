// common.js
import { getState } from '../../reducers/state.js';
import { loadUploads } from '../../logic/upload/uploadLogic.js';
import { handleFileUploadOrUpdate } from '../upload/handlers.js';

/**
 * Carga el perfil de usuario y los archivos asociados, y actualiza el estado global.
 * @param {Function} fetchModelFunc - La función para cargar el perfil (por ejemplo, loadUserProfile).
 * @param {String} keyModel - La clave del modelo en el estado global (por ejemplo, 'profile').
 */
export async function initializeModelAndUploads(fetchModelFunc, keyModel) {
  try {
    await fetchModelFunc();

    // Obtiene ownerModel y ownerId del estado global
    const { ownerModel, ownerId } = getState()[keyModel];
    console.log('Owner Model:', ownerModel);
    console.log('Owner ID:', ownerId);

    // Cargar archivos del usuario de manera dinámica
    if (ownerModel && ownerId) {
      await loadUploads(ownerModel, ownerId._id);
    } else {
      console.error('No se encontró el modelo o el ID del propietario.');
    }
  } catch (error) {
    console.error('Error al cargar el perfil y los archivos:', error);
  }
}

// Función para configurar el botón de subida
export function setupUploadButton(fetchModelFunc, keyModel) {
  const uploadButton = document.getElementById('uploadButton');
  const fileInput = document.getElementById('uploadInput');

  uploadButton.addEventListener('click', async () => {
    await fetchModelFunc();

    const file = fileInput.files[0];
    const { ownerModel, ownerId } = getState()[keyModel];

    if (!file) {
      alert('Selecciona un archivo antes de subir.');
      return;
    }

    if (ownerModel && ownerId) {
      const description = 'Archivo de perfil';

      await handleFileUploadOrUpdate(
        null, // En este caso, no hay uploadId ya que es una nueva carga
        description,
        file,
        ownerModel,
        ownerId._id
      );
      fileInput.value = ''; // Limpiar el campo de entrada
    } else {
      console.error('No se encontró el modelo o el ID del propietario.');
    }
  });
}
