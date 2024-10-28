import {
  openDeleteModal,
  openDetailsModal,
  openEditModal,
  openEditWithFileSelection,
} from './utils.js';

// Función de acción para los elementos del popover
export const onAction = (action, item, ownerModel, owner) => {
  console.log(`Acción "${action}" para el elemento con ID "${item._id}".`);
  console.log(`El modelo de propietario es "${ownerModel}".`);
  console.log(`El propietario es "${owner}".`);

  if (action === 'reactivate') {
    // Llama a la función para reactivar el elemento con el ID correspondiente
    // reactivateItem(item._id);
  }
  //agregar file

  if (action === 'upload') {
    // Llama a la función para abrir el selector de archivos y luego mostrar el modal
    openEditWithFileSelection(item, ownerModel, owner);
  }

  // if (action === 'detail') {
  //   openDetailsModal(item, ownerModel, owner);
  // }

  if (action === 'delete') {
    openDeleteModal(item, ownerModel, owner); // Usa openDeleteModal en lugar de confirm()
  }
};
// Acciones para mostrar en el popover
export const actions = [
  { text: 'Adjuntar Archivo', action: 'upload' },
  { text: 'Ver Detalles', action: 'details' }, // No está implementado en este ejemplo, pero podría ser agregado
  // { text: 'Reordenar', action:'reorder' }, // No está implementado en este ejemplo, pero podría ser agregado

  // { text: 'Descargar', action: 'download' }, // No está implementado en este ejemplo, pero podría ser agregado
  // { text: 'Descartar', action: 'discard' }, // No está implementado en este ejemplo, pero podría ser agregado
  // { text: 'Copiar URL', action: 'copyUrl' }, // No está implementado en este ejemplo, pero podría ser agregado
  // { text: 'Compartir', action: 'share' }, // No está implementado en este ejemplo, pero podría ser agregado
  // { text: 'Imprimir', action: 'print' }, // No está implementado en este ejemplo, pero podría ser agregado
  // { text: 'Reactivar', action:'reactivate' }, // No está implementado en este ejemplo, pero podría ser agregado
  // { text: 'Ver Detalles', action: 'detail' },
  // { text: 'Desactivar', action: 'deactivate' }, // No está implementado en este ejemplo, pero podría ser agregado
  { text: 'Eliminar', action: 'delete' },
];
