import { openDeleteModal, openEditWithFileSelection } from './utils.js';

// Función de acción para los elementos del popover
export const onAction = (action, item, ownerModel, owner, index) => {
  // console.log(`Acción "${action}" para el elemento con ID "${item._id}".`);
  // console.log(`El modelo de propietario es "${ownerModel}".`);
  // console.log(`El propietario es "${owner}".`);

  if (action === 'upload') {
    // Llama a la función para abrir el selector de archivos y luego mostrar el modal
    openEditWithFileSelection(item, ownerModel, owner, index);
  }

  if (action === 'delete') {
    openDeleteModal(item, ownerModel, owner, index); // Usa openDeleteModal en lugar de confirm()
  }
};

export const getActions = (item) => {
  // console.log('sdaditem', item);
  const actions = [{ text: 'Adjuntar Archivo', action: 'upload' }];

  // Solo agregar "Eliminar" si hay un ID
  if (item) {
    actions.push({ text: 'Ver Detalles', action: 'details' });
    actions.push({ text: 'Eliminar', action: 'delete' });
  }

  return actions;
};
