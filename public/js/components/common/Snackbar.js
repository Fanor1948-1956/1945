export function showSnackbar(message, isSuccess) {
  const snackbar = document.getElementById('snackbar');

  // Configura el texto del snackbar
  snackbar.textContent = message;

  // Asegúrate de aplicar las clases correspondientes (éxito o error)
  snackbar.className = 'snackbar'; // Resetea las clases
  snackbar.classList.add(isSuccess ? 'success' : 'error');

  // Añade la clase 'show' para hacer visible el snackbar
  snackbar.classList.add('show');

  // Remover la clase 'show' después de 3 segundos
  setTimeout(() => {
    snackbar.classList.remove('show');
  }, 3000);
}
