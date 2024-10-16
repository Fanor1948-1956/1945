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

// // snackbar.js
// export function showSnackbar(message, isSuccess) {
//   const snackbar = document.getElementById('snackbar');
//   snackbar.textContent = message;
//   snackbar.className = isSuccess ? 'snackbar success' : 'snackbar error';

//   setTimeout(() => {
//       snackbar.className = snackbar.className.replace('show', '');
//   }, 3000);
// }
