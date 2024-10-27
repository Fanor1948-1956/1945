import { showPopover } from '../../components/common/popover.js';

import { openDeleteModal, openEditModal } from './utils.js';
import { getState } from '../../reducers/state.js';
// Función de acción para los elementos del popover
export const onAction = (action, file, ownerModel, owner) => {
  console.log(`Acción "${action}" para el elemento con ID "${file._id}".`);
  console.log(`El modelo de propietario es "${ownerModel}".`);
  console.log(`El propietario es "${owner}".`);

  if (action === 'edit') {
    openEditModal(file, ownerModel, owner);
  }

  if (action === 'delete') {
    openDeleteModal(file, ownerModel, owner); // Usa openDeleteModal en lugar de confirm()
  }
};

export function handleActionClick(event, actions, onActionCallback) {
  const button = event.target;
  const fileId = button.getAttribute('data-id');
  const ownerModel = button.getAttribute('data-owner-model'); // Obtener ownerModel
  const owner = button.getAttribute('data-owner'); // Obtener owner

  // Encuentra el archivo en el estado global para pasar todos sus datos
  const file = getState().uploads.find((file) => file._id === fileId);

  if (file) {
    // Mostrar el popover con acciones, pasando el callback de acción
    showPopover(file, actions, button, (action) => {
      onActionCallback(action, file, ownerModel, owner);
    });
  }

  event.stopPropagation();
}

// Acciones para mostrar en el popover
export const actions = [
  { text: 'Editar', action: 'edit' },
  { text: 'Eliminar', action: 'delete' },
];
