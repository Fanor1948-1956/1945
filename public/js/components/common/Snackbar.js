// snackbar.js
export function showSnackbar(message, isSuccess) {
  const snackbar = document.getElementById('snackbar');
  snackbar.textContent = message;
  snackbar.className = isSuccess ? 'snackbar success' : 'snackbar error';

  setTimeout(() => {
      snackbar.className = snackbar.className.replace('show', '');
  }, 3000);
}
