

export let itemToDelete; 
export let itemType; 


export function showDeleteConfirmationModal(entryPoint, itemId, type) {
  itemToDelete = itemId; 
  itemType = type; 
  $('#deleteConfirmationMessage').text(
    `¿Estás seguro de que deseas eliminar el ${itemType}?`
  );
  $('#confirmDeleteModal').show(); 
}


export function handleDeleteConfirmation(fetchFunction) {
  deleteItem('roles', itemToDelete, fetchFunction); 
  $('#confirmDeleteModal').hide(); 
}


export function deleteItem(entityType, itemId, fetchFunction) {
  console.log(`Intentando eliminar el ítem: ${itemId}`); 
  apiFetch(`/${entityType}/delete/${itemId}`, 'DELETE') 
    .then((response) => {
      console.log('Respuesta de eliminación:', response); 
      if (response.success) {
        showSnackbar(response.message, true); 
        fetchFunction(); 
      } else {
        showSnackbar(response.message || 'Error al eliminar el ítem', false); 
      }
    })
    .catch((xhr) => {
      console.error('Error en la petición de eliminación:', xhr); 
      const errorMessage =
        xhr.responseJSON && xhr.responseJSON.message
          ? xhr.responseJSON.message
          : 'Error al eliminar el ítem'; 
      showSnackbar(errorMessage, false); 
    });
}
