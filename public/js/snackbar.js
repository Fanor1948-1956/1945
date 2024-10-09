// snackbar.js
function showSnackbar(message, isSuccess) {
  const snackbar = document.getElementById('snackbar');
  snackbar.innerHTML = message;
  snackbar.style.backgroundColor = isSuccess ? '#4CAF50' : '#f44336'; // Verde para éxito, rojo para error
  snackbar.className = 'show'; // Agregar clase 'show' para mostrar el snackbar

  // Ocultar el snackbar después de 3 segundos
  setTimeout(function () {
    snackbar.className = snackbar.className.replace('show', ''); // Remover clase 'show'
  }, 3000);
}
