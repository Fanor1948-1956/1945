// logic/auth/uploadLogic.js

import { getUploads, uploadFile } from '../../services/uploadService.js';
import { getState } from '../../reducers/state.js';

// Función para cargar archivos y actualizar la interfaz
export const loadUploads = async (ownerModel, ownerId) => {
  try {
    const message = await getUploads(ownerModel, ownerId); // Obtener los archivos
    const uploads = getState().uploads; // Recupera el estado de los uploads
    displayUploads(uploads); // Implementa displayUploads en tu UI para mostrar archivos

    // Muestra un snackbar con el mensaje de éxito
    showSnackbar(message || 'Archivos cargados exitosamente.', true);
  } catch (error) {
    console.error('Error al cargar los archivos:', error);
    // showSnackbar(error.message || 'Error al cargar los archivos.', false); // Muestra el mensaje de error
  }
};

// Función para manejar la subida de archivos
export const handleFileUpload = async (
  file,
  ownerModel,
  ownerId,
  description = ''
) => {
  try {
    const uploadResponse = await uploadFile(
      file,
      ownerModel,
      ownerId,
      description
    );
    await loadUploads(ownerModel, ownerId); // Actualiza la lista de archivos tras la subida
    showSnackbar(
      uploadResponse.message || 'Archivo subido exitosamente.',
      true
    ); // Usar el mensaje del servidor
  } catch (error) {
    console.error('Error al subir el archivo:', error);
    showSnackbar(error.message || 'Error al subir el archivo.', false); // Mensaje de error
  }
};
function displayUploads(uploads) {
  const uploadsList = document.getElementById('uploadsList');
  uploadsList.innerHTML = ''; // Limpiar la lista existente

  uploads.forEach((file) => {
    const fileItem = document.createElement('div');
    fileItem.classList.add('file-item');

    // Asegúrate de que file.id sea el ID que deseas mostrar
    fileItem.innerHTML = `
      <img src="${file.path}" alt="${file.filename}" class="uploaded-image" /> 
      <p>ID: ${file.id}</p>
    `;

    uploadsList.appendChild(fileItem);
  });
}
