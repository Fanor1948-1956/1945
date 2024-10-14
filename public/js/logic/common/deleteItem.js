// deleteItem.js

export let itemToDelete; // Variable global para el ítem a eliminar
export let itemType; // Tipo de ítem a eliminar para el título

// Mostrar el modal de confirmación de eliminación
export function showDeleteConfirmationModal(entryPoint, itemId, type) {
  itemToDelete = itemId; // Guardar el ID del ítem a eliminar
  itemType = type; // Guardar el tipo de ítem para el título
  $('#deleteConfirmationMessage').text(
    `¿Estás seguro de que deseas eliminar el ${itemType}?`
  );
  $('#confirmDeleteModal').show(); // Mostrar el modal
}

// Manejar clic en el botón de confirmación de eliminación
export function handleDeleteConfirmation(fetchFunction) {
  deleteItem('roles', itemToDelete, fetchFunction); // Llamar a la función genérica
  $('#confirmDeleteModal').hide(); // Cerrar el modal
}

// Función para eliminar un ítem genérico
export function deleteItem(entityType, itemId, fetchFunction) {
  console.log(`Intentando eliminar el ítem: ${itemId}`); // Mensaje de depuración
  apiFetch(`/${entityType}/delete/${itemId}`, 'DELETE') // Endpoint usando 'roles'
    .then((response) => {
      console.log('Respuesta de eliminación:', response); // Ver respuesta de eliminación
      if (response.success) {
        showSnackbar(response.message, true); // Mostrar mensaje de éxito
        fetchFunction(); // Refrescar la lista usando la función proporcionada
      } else {
        showSnackbar(response.message || 'Error al eliminar el ítem', false); // Mensaje de error específico
      }
    })
    .catch((xhr) => {
      console.error('Error en la petición de eliminación:', xhr); // Mensaje de error
      const errorMessage =
        xhr.responseJSON && xhr.responseJSON.message
          ? xhr.responseJSON.message
          : 'Error al eliminar el ítem'; // Mensaje predeterminado si no hay respuesta
      showSnackbar(errorMessage, false); // Mostrar mensaje de error
    });
}
