// public/js/modal.js
$(document).ready(function () {
  // Función para abrir el modal
  function openModal(modalId, formUrl) {
    $.ajax({
      url: formUrl,
      type: 'GET',
      success: function (response) {
        $(`#${modalId} .modal-content`).html(response); // Cargar el contenido en el modal
        $(`#${modalId}`).fadeIn(); // Mostrar el modal
      },
      error: function (xhr) {
        showSnackbar('Error al obtener el formulario', false);
      },
    });
  }

  // Función para cerrar el modal
  function closeModal(modalId) {
    $(`#${modalId}`).fadeOut(); // Ocultar el modal
  }

  // Eventos para abrir y cerrar el modal
  $(document).on('click', '.edit-button', function (e) {
    e.preventDefault();
    const userId = $(this).attr('href').split('/').pop(); // Obtener el ID del usuario
    openModal('editUserModal', `/users/${userId}/edit`); // Abrir el modal con el contenido del formulario
  });

  // Cerrar el modal al hacer clic en la "X"
  $(document).on('click', '.close-button', function () {
    closeModal('editUserModal');
  });

  // Cerrar el modal al hacer clic fuera del contenido
  $(window).click(function (event) {
    const modal = $('#editUserModal');
    if (event.target == modal[0]) {
      closeModal('editUserModal');
    }
  });

  window.closeModal = closeModal; // Exponer la función para cerrarlo
});
