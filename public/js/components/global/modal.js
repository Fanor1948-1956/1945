

$(document).ready(function () {
  
  function openModal(modalSelector) {
    $(modalSelector).fadeIn();
  }

  
  function closeModal(modalSelector) {
    $(modalSelector).fadeOut();
  }

  
  $(document).on('click', '.close-button', function (e) {
    const modal = $(this).closest('.modal'); 
    closeModal(modal);
  });

  $(document).on('click', '.modal', function (e) {
    if ($(e.target).hasClass('modal')) {
      closeModal(e.target);
    }
  });

  
  window.Modal = {
    open: openModal,
    close: closeModal,
  };
});
