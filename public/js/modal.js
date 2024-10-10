// modal.js

$(document).ready(function () {
  // Función para abrir cualquier modal
  function openModal(modalSelector) {
    $(modalSelector).fadeIn();
  }

  // Función para cerrar cualquier modal
  function closeModal(modalSelector) {
    $(modalSelector).fadeOut();
  }

  // Evento para cerrar el modal (clic en el botón de cerrar o fuera del modal)
  $(document).on('click', '.close-button', function (e) {
    const modal = $(this).closest('.modal'); // Encuentra el modal asociado
    closeModal(modal);
  });

  $(document).on('click', '.modal', function (e) {
    if ($(e.target).hasClass('modal')) {
      closeModal(e.target);
    }
  });

  // Exportar las funciones para usarlas en otros lugares
  window.Modal = {
    open: openModal,
    close: closeModal,
  };
});
