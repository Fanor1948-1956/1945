// snackbar.js

// Función para mostrar notificaciones (snackbar)
function showSnackbar(message, success) {
  const snackbar = $('#snackbar');
  snackbar.html(message);
  snackbar.css('background-color', success ? '#051706' : '#f44336');
  snackbar.addClass('show');
  setTimeout(() => snackbar.removeClass('show'), 3000);
}

// Exportar la función para uso global
window.showSnackbar = showSnackbar;
