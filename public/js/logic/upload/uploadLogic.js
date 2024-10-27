// logic/auth/uploadLogic.js

import { getUploads } from '../../services/uploadService.js';
import { getState } from '../../reducers/state.js';
import { actions, handleActionClick, onAction } from './actions.js';

// Función para cargar archivos y actualizar la interfaz
export const loadUploads = async (ownerModel, ownerId) => {
  try {
    const message = await getUploads(ownerModel, ownerId); // Obtener los archivos
    const uploads = getState().uploads; // Recupera el estado de los uploads
    console.log(uploads);
    displayUploads(uploads); // Implementa displayUploads en tu UI para mostrar archivos

    // Muestra un snackbar con el mensaje de éxito
    showSnackbar(message || 'Archivos cargados exitosamente.', true);
  } catch (error) {
    console.error('Error al cargar los archivos:', error);
    showSnackbar(error.message || 'Error al cargar los archivos.', false); // Muestra el mensaje de error
  }
};

function displayUploads(uploads) {
  const uploadsList = document.getElementById('uploadsList');
  uploadsList.innerHTML = ''; // Limpiar la lista existente

  uploads.forEach((file) => {
    const fileItem = document.createElement('div');
    fileItem.classList.add('file-item');

    fileItem.innerHTML = `
    <div class="image-container" style="position: relative; display: inline-block;">
      <img src="${file.path}" alt="${file.filename}" class="uploaded-image" /> 
      <button class="edit-button" data-id="${file._id}" data-owner-model="${file.ownerModel}" data-owner="${file.owner}">Editar</button> 
    </div>

         <p> ${file._id}</p>
              <p> ${file.owner}</p>

  `;

    uploadsList.appendChild(fileItem);
  });

  // Inicializar los listeners de botones después de renderizar
  initializeListeners('.edit-button', actions, onAction);
}
export function initializeListeners(buttonSelector, actions, onActionCallback) {
  // Selecciona los botones según el selector proporcionado
  const actionButtons = document.querySelectorAll(buttonSelector);

  actionButtons.forEach((button) => {
    // Remover y agregar el listener para evitar múltiples registros
    button.removeEventListener('click', (event) =>
      handleActionClick(event, actions, onActionCallback)
    );
    button.addEventListener('click', (event) =>
      handleActionClick(event, actions, onActionCallback)
    );
  });
}
