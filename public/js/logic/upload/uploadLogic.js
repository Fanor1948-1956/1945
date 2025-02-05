// logic/auth/uploadLogic.js

import { getUploads } from '../../services/uploadService.js';
import { getActions } from './actions.js';
import { generateEmptyComponents } from '../../generate/generateEmptyComponents.js';
const defaultAvatarCount = 1;
import { handleGenericClick, initializeListeners } from './utils.js';

export const loadUploads = async (ownerModel, ownerId, index) => {
  console.log('Loading uploads02', index);
  try {
    const message = await getUploads(ownerModel, ownerId); // Obtener los archivos
    const uploads = message.uploads || []; // Suponiendo que la respuesta tiene una estructura que incluye los uploads

    console.log(uploads);
    // Filtramos los uploads eliminados
    const deletedUploads = uploads.filter(
      (upload) => upload.isSelected === true
    );
    console.log('Deleted Uploads:', deletedUploads);
    const activeUploads = uploads.filter(
      (upload) => upload.isSelected !== true
    );
    console.log('Active Uploads:', activeUploads);
    // Calcular cuántos avatares vacíos se necesitan
    displayUploads(activeUploads); // Pasar ownerModel directamente

    const remainingSpaces = Math.max(
      0,
      defaultAvatarCount - activeUploads.length
    );
    console.log(remainingSpaces);

    // Generar avatares vacíos si es necesario, incluso si no hay uploads
    const emptyAvatars = generateEmptyComponents(
      remainingSpaces,
      ownerModel,
      ownerId,
      activeUploads.length
    );

    // Muestra un snackbar con el mensaje apropiado
    if (uploads.length === 0) {
      showSnackbar('Aún no tienes archivos. Debes subir algunos.', false); // Mensaje informativo
    } else {
      showSnackbar(message.message || 'Archivos cargados exitosamente.', true); // Mensaje de éxito
    }

    // Aquí actualizamos el conteo de avatares vacíos
    reintegrarAvatarsVacíos(emptyAvatars, activeUploads.length);
  } catch (error) {
    console.error('Error al cargar los archivos:', error);
    showSnackbar(error.message || 'Error al cargar los archivos.', false); // Muestra el mensaje de error

    // Generar avatares vacíos también en caso de error
    generateEmptyComponents(defaultAvatarCount, ownerModel);
  }
};

export function displayUploads(uploads, modelName) {
  const uploadsList = document.getElementById('uploadsList');
  uploadsList.innerHTML = ''; // Limpiar la lista existente

  // Muestra los archivos cargados con numeración
  uploads.forEach((file, index) => {
    const fileItem = document.createElement('div');
    fileItem.classList.add('file-item');

    const editButtonId = `edit-button-${file._id}`;

    fileItem.innerHTML = `
      <div class="image-container">
        <img src="${file.path}" alt="${
      file.filename
    }" class="uploaded-image" /> 
        <button id="${editButtonId}" class="edit-button">Editar</button> 
      </div>
      <p>${index + 1}. ${modelName}</p> <!-- Aquí se agrega la numeración -->
    `;

    uploadsList.appendChild(fileItem);
  });

  // Inicializa listeners para los botones de edición
  uploads.forEach((file, index) => {
    const editButtonId = `edit-button-${file._id}`;
    const data = {
      item: file,
      index: index + 1,
      actions: getActions(file),
      ownerModel: file.ownerModel,
      owner: file.owner,
    };

    initializeListeners(editButtonId, handleGenericClick, data);
  });
}
// Reinserción de avatares vacíos
function reintegrarAvatarsVacíos(emptyAvatars, currentUploadCount) {
  const uploadsList = document.getElementById('uploadsList');
  const emptyAvatarItems = uploadsList.querySelectorAll('.empty-avatar'); // Asegúrate de que tus avatares vacíos tengan esta clase

  // Solo actualizar los avatares existentes y en la posición correcta
  emptyAvatarItems.forEach((avatarItem, index) => {
    if (index < emptyAvatars.length) {
      const totalIndex = currentUploadCount + index + 1; // Mantener la numeración continua
      const avatarId = emptyAvatars[index].id;

      // Actualizar el contenido del avatar vacío existente
      avatarItem.querySelector('p').innerHTML = `${totalIndex}. ${avatarId}`; // Actualiza el número y el ID
      avatarItem.id = avatarId; // También actualiza el ID del elemento para evitar confusiones
    }
  });
}
