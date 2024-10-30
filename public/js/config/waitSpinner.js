// Spinner
let spinnerDiv = null;

// Función para mostrar el spinner
function showSpinner() {
  if (!spinnerDiv) {
    createSpinner();
  }
  spinnerDiv.style.display = 'block'; // Muestra el spinner
}

// Función para ocultar el spinner
function hideSpinner() {
  if (spinnerDiv) {
    spinnerDiv.style.display = 'none'; // Oculta el spinner
  }
}

// Función para crear el spinner
function createSpinner() {
  spinnerDiv = document.createElement('div');
  spinnerDiv.id = 'loadingSpinner';
  spinnerDiv.style.position = 'fixed';
  spinnerDiv.style.top = '50%';
  spinnerDiv.style.left = '50%';
  spinnerDiv.style.transform = 'translate(-50%, -50%)';
  spinnerDiv.style.border = '8px solid #f3f3f3';
  spinnerDiv.style.borderTop = '8px solid #3498db';
  spinnerDiv.style.borderRadius = '50%';
  spinnerDiv.style.width = '50px';
  spinnerDiv.style.height = '50px';
  spinnerDiv.style.animation = 'spin 1s linear infinite';
  document.body.appendChild(spinnerDiv);

  // Agrega los keyframes para la animación del spinner
  const styleSheet = document.createElement('style');
  styleSheet.type = 'text/css';
  styleSheet.innerText = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(styleSheet);
}
