// logic/auth/uploadLogic.js

import { getUploads } from '../../services/uploadService.js';
import { actions } from './actions.js';
import { generateEmptyAvatars } from '../../generate/generateEmptyAvatars.js';
const defaultAvatarCount = 25;
import { handleGenericClick, initializeListeners } from './utils.js';

export const loadUploads = async (ownerModel, ownerId) => {
  try {
    const message = await getUploads(ownerModel, ownerId); // Obtener los archivos
    const uploads = message.uploads || []; // Suponiendo que la respuesta tiene una estructura que incluye los uploads

    console.log(uploads);
    displayUploads(uploads, ownerModel); // Pasar ownerModel directamente

    // Calcular cuántos avatares vacíos se necesitan

    const remainingSpaces = Math.max(0, defaultAvatarCount - uploads.length);
    console.log(remainingSpaces);
    // Generar avatares vacíos si es necesario, incluso si no hay uploads
    generateEmptyAvatars(remainingSpaces, ownerModel, ownerId);

    // Muestra un snackbar con el mensaje apropiado
    if (uploads.length === 0) {
      showSnackbar('Aún no tienes archivos. Debes subir algunos.', false); // Mensaje informativo
    } else {
      showSnackbar(message.message || 'Archivos cargados exitosamente.', true); // Mensaje de éxito
    }
  } catch (error) {
    console.error('Error al cargar los archivos:', error);
    showSnackbar(error.message || 'Error al cargar los archivos.', false); // Muestra el mensaje de error

    // Generar avatares vacíos también en caso de error
    generateEmptyAvatars(defaultAvatarCount, ownerModel);
  }
};
function displayUploads(uploads) {
  const uploadsList = document.getElementById('uploadsList');
  uploadsList.innerHTML = ''; // Limpiar la lista existente

  // Si hay archivos, renderizarlos
  uploads.forEach((file) => {
    const fileItem = document.createElement('div');
    fileItem.classList.add('file-item');

    const editButtonId = `edit-button-${file._id}`; // Crear un ID único basado en el ID del archivo

    fileItem.innerHTML = `
      <div class="image-container">
        <img src="${file.path}" alt="${file.filename}" class="uploaded-image" /> 
        <button id="${editButtonId}" class="edit-button" >Editar</button> 
      </div>
      <p>${file._id}</p>
    `;

    uploadsList.appendChild(fileItem);
  });

  // Inicializar listeners para todos los botones de edición
  uploads.forEach((file) => {
    const editButtonId = `edit-button-${file._id}`;
    const data = {
      item: file,
      actions,
      ownerModel: file.ownerModel,
      owner: file.owner,
    };
    initializeListeners(editButtonId, handleGenericClick, data);
  });
}
