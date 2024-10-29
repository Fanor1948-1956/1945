import { closeModal, openModal } from '../../components/custom/modal.js';
import { deleteUpload } from '../../services/uploadService.js';
import { loadUploads } from './uploadLogic.js';
import { handleItemUploadOrUpdate } from './handlers.js';
import { showPopover } from '../../components/common/popover.js';
import { onAction } from './actions.js';

export function openDetailsModal(file) {
  // Elementos del modal de detalles
  const descriptionInput = document.querySelector('#genericDescriptionInput');
  const currentImage = document.querySelector('#genericCurrentImage');

  // Configura los valores iniciales en el modal
  descriptionInput.value = file.description || ''; // Solo muestra la descripción
  currentImage.src = file.path || ''; // Muestra la imagen
  currentImage.style.display = file.path ? 'block' : 'none'; // Ocultar si no hay imagen

  openModal('genericModal', 'small', 'Detalles del Archivo'); // Abre el modal de detalles
}

export function openEditModal(file, ownerModel, ownerId) {
  // Elementos del modal
  const descriptionInput = document.querySelector('#genericDescriptionInput');
  const fileInput = document.querySelector('#genericFileInput');
  const currentImage = document.querySelector('#genericCurrentImage');
  const selectedFileName = document.querySelector('#selectedFileName');
  const saveButton = document.querySelector('#genericSaveButton');

  // Configura los valores iniciales en el modal
  const defaultAvatar = `<svg class="icon" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-3.31 0-10 1.67-10 5v3h20v-3c0-3.33-6.69-5-10-5z"/></svg>`;
  descriptionInput.value = file.description || ''; // Recupera la descripción
  currentImage.src = file.path || null; // Recupera el path de la imagen
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
    await handleItemUploadOrUpdate(
      file._id, // ID del archivo a actualizar
      newDescription,
      newFile,
      ownerModel,
      ownerId
    );

    closeModal('genericModal'); // Cierra el modal después de guardar
  };
}
export async function openEditWithFileSelection(
  file,
  ownerModel,
  ownerId,
  index
) {
  const fileInput = document.querySelector('#hiddenFileInput');
  const currentImage = document.querySelector('#genericCurrentImage');
  const descriptionInput = document.querySelector('#genericDescriptionInput');
  const saveButton = document.querySelector('#genericSaveButton');

  console.log(`Editando archivo en índice: ${index}`);

  // Abrir el selector de archivo automáticamente
  fileInput.click();

  // Cuando el usuario selecciona un archivo
  fileInput.onchange = () => {
    const selectedFile = fileInput.files[0];

    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        currentImage.src = e.target.result;
        currentImage.style.display = 'block';
      };
      reader.readAsDataURL(selectedFile);

      descriptionInput.value = file.description || '';
      openModal('genericModal', 'small', 'Editar Archivo');

      // Botón "Confirmar"
      saveButton.onclick = async () => {
        const newDescription = descriptionInput.value;

        await handleItemUploadOrUpdate(
          file._id || null, // Usar null si no hay ID
          newDescription,
          selectedFile,
          ownerModel,
          ownerId,
          index
        );

        console.log(`Confirmado: Archivo actualizado en índice: ${index}`);
        closeModal('genericModal');
      };
    }
  };
}

// Función para abrir el modal de confirmación de eliminación
export function openDeleteModal(file, ownerModel, ownerId, index) {
  // Abre el modal con el mensaje de confirmación
  openModal('deleteModal', 'small', 'Eliminar Archivo');

  // Configura el contenido del modal
  const deleteMessage = document.querySelector('#deleteMessage');
  deleteMessage.textContent = `¿Estás seguro de que deseas eliminar el archivo "${file.description}"?`;

  const confirmButton = document.querySelector('#confirmDelete');
  const cancelButton = document.querySelector('#cancelDeleteButton');
  console.log(`Editando archivo en índice: ${index}`); // Imprime el índice en la consola
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

// Función para inicializar los listeners de botones
export function initializeListeners(buttonId, handler, data) {
  const button = document.getElementById(buttonId);

  if (button) {
    // Remover y agregar el listener para evitar múltiples registros
    button.removeEventListener('click', (event) => handler(event, data));
    button.addEventListener('click', (event) => handler(event, data));
  } else {
    console.warn(`Botón no encontrado: ${buttonId}`); // Mensaje de advertencia si el botón no se encuentra
  }
}

// Manejador de clics genérico
export function handleGenericClick(event, data) {
  const button = event.currentTarget; // Obtener el botón que disparó el evento
  console.log(button);
  // Mostrar el popover con acciones, pasando el callback de acción
  showPopover(data.item, data.actions, button, (action) => {
    onAction(action, data.item, data.ownerModel, data.owner, data.index);
  });

  event.stopPropagation();
}
