import { closeModal, openModal } from '../../components/custom/modal.js';
import { deleteUpload } from '../../services/uploadService.js';
import { loadUploads } from './uploadLogic.js';
import { handleFileUploadOrUpdate } from './handlers.js';

export function openEditModal(file, ownerModel, ownerId) {
  // Elementos del modal
  const descriptionInput = document.querySelector('#genericDescriptionInput');
  const fileInput = document.querySelector('#genericFileInput');
  const currentImage = document.querySelector('#genericCurrentImage');
  const selectedFileName = document.querySelector('#selectedFileName');
  const saveButton = document.querySelector('#genericSaveButton');

  // Configura los valores iniciales en el modal
  descriptionInput.value = file.description || ''; // Recupera la descripción
  currentImage.src = file.path || '/path/to/default/image.jpg'; // Recupera el path de la imagen
  currentImage.style.display = file.path ? 'block' : 'none'; // Mostrar u ocultar

  openModal('genericModal', 'small', 'Editar Archivo'); // Abre el modal

  selectedFileName.textContent = ''; // Limpia el nombre de archivo seleccionado

  // Listener para mostrar el nombre del archivo seleccionado
  fileInput.onchange = () => {
    const selectedFile = fileInput.files[0];
    if (selectedFile) {
      selectedFileName.textContent = `Archivo seleccionado: ${selectedFile.name}`;
    } else {
      selectedFileName.textContent = ''; // Limpia si no hay archivo seleccionado
    }
  };

  // Configura el botón de guardar
  saveButton.onclick = async () => {
    const newDescription = descriptionInput.value;
    const newFile = fileInput.files[0] || null; // Recupera el nuevo archivo

    // Aquí llamamos a la función que maneja la subida o actualización
    await handleFileUploadOrUpdate(
      file._id, // ID del archivo a actualizar
      newDescription,
      newFile,
      ownerModel,
      ownerId
    );

    closeModal('genericModal'); // Cierra el modal después de guardar
  };
}

// Función para abrir el modal de confirmación de eliminación
export function openDeleteModal(file, ownerModel, ownerId) {
  // Abre el modal con el mensaje de confirmación
  openModal('deleteModal', 'small', 'Eliminar Archivo');

  // Configura el contenido del modal
  const deleteMessage = document.querySelector('#deleteMessage');
  deleteMessage.textContent = `¿Estás seguro de que deseas eliminar el archivo "${file.description}"?`;

  const confirmButton = document.querySelector('#confirmDelete');
  const cancelButton = document.querySelector('#cancelDeleteButton');

  // Listener para confirmar eliminación
  confirmButton.onclick = async () => {
    await deleteUpload(file._id, ownerModel, ownerId);

    showSnackbar('Archivo Eliminado correctamente', true);
    closeModal('deleteModal'); // Cierra el modal después de confirmar la eliminación
    await loadUploads(ownerModel, ownerId);
  };

  // Listener para cancelar eliminación
  cancelButton.onclick = () => {
    closeModal('deleteModal'); // Solo cierra el modal si se cancela
  };
}
