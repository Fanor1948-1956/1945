function createDeleteModal(itemId) {
  // Eliminar cualquier modal existente antes de crear uno nuevo
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

  $('body').append(modalHtml); // Añadir el modal al body

  // Mostrar el modal
  $('#confirmDeleteModal').show();

  // Manejar el clic en la opción de cerrar
  $(document).on('click', '#closeConfirmDeleteModal', function () {
    $('#confirmDeleteModal').remove(); // Eliminar modal al cerrarlo
  });
}
