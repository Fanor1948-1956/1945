export function showSnackbar(message, success) {
  const snackbar = document.getElementById('snackbar');

  
  snackbar.textContent = message;

  
  snackbar.className = 'snackbar'; 
  snackbar.classList.add(success ? 'success' : 'error');

  
  snackbar.classList.add('show');

  
  setTimeout(() => {
    snackbar.classList.remove('show');
  }, 3000);
}
