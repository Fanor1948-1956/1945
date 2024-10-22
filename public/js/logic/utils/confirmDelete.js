function createDeleteModal(itemId) {
  
  $('#confirmDeleteModal').remove();

  const modalHtml = `
        <div id="confirmDeleteModal" class="modal">
            <div class="modal-content">
                <span class="close-button" id="closeConfirmDeleteModal">&times;</span>
                <h2>Confirmar Eliminación</h2>
                <p id="deleteConfirmationMessage">¿Estás seguro de que deseas eliminar este elemento?</p>
                <button id="confirmDeleteButton">Eliminar</button>
                <button id="cancelDeleteButton">Cancelar</button>
            </div>
        </div>
    `;

  $('body').append(modalHtml); 

  
  $('#confirmDeleteModal').show();

  
  $(document).on('click', '#closeConfirmDeleteModal', function () {
    $('#confirmDeleteModal').remove(); 
  });
}
