import './apiRequest/apiFetchs.js';
import './apiRequest/ajaxRequest.js';
import './components/custom/userTable.js';
import './components/global/sidebar.js';
import './components/global/navbar.js';
import './components/global/snackbar.js';
import './components/global/modal.js';
import './components/global/dropdown.js';
import './components/global/toggleFields.js';
import './components/common/popover.js';

// import './init.js'
import './components/custom/icons.js';

import './components/custom/modal.js';

import './libraries/select2.min.js';
let modal; // Variable para almacenar el modal

// Función para obtener la ruta actual
function getCurrentPath() {
  return window.location.pathname;
}

// Función para setear el currentPath en localStorage
function setCurrentPath(path) {
  localStorage.setItem('currentPath', path);
}

// Función para obtener el currentPath desde localStorage
function getCurrentPathFromLocalStorage() {
  return localStorage.getItem('currentPath');
}

// Función para obtener el token de autenticación desde localStorage
function getToken() {
  return localStorage.getItem('token');
}

// Función para verificar si el usuario está autenticado
function isAuthenticated() {
  // Aquí verificamos que el token esté presente y que el estado de autenticación sea verdadero
  return getToken() && localStorage.getItem('isAuthenticated') === 'true';
}

// Función para manejar la navegación y verificar autenticación
function handleRouteNavigation() {
  const currentPath = getCurrentPath();
  setCurrentPath(currentPath);

  // Mensajes condicionales para el modal
  let modalMessage;

  // Si el usuario está en el dashboard pero no autenticado
  if (currentPath === '/dashboard' && !isAuthenticated()) {
    modalMessage = 'Necesitas iniciar sesión para acceder a esta ruta.';
    openWarningModal(modalMessage);
  }

  // Si el usuario está en el login y ya está autenticado
  if (currentPath === '/login' && isAuthenticated()) {
    modalMessage = 'Ya estás autenticado. Serás redirigido al Dashboard.';
    openWarningModal(modalMessage);

    // Redirigir al dashboard y deshabilitar el retroceso
    history.replaceState(null, null, '/dashboard'); // Reemplaza el estado actual
    setTimeout(() => {
      window.location.href = '/dashboard'; // Redirige después de un pequeño retraso
    }, 2000); // Espera 2 segundos para que el usuario vea el modal
  }

  // Si el usuario intenta acceder a otras rutas públicas y está autenticado
  const publicRoutes = ['/login', '/home']; // Rutas públicas
  if (publicRoutes.includes(currentPath) && isAuthenticated()) {
    modalMessage =
      'No puedes acceder a esta ruta. Serás redirigido al Dashboard.';
    openWarningModal(modalMessage);

    // Redirigir a la ruta principal (ejemplo: /dashboard)
    history.replaceState(null, null, '/dashboard'); // Reemplaza el estado actual
    setTimeout(() => {
      window.location.href = '/dashboard'; // Redirige después de un pequeño retraso
    }, 2000); // Espera 2 segundos para que el usuario vea el modal
  }

  // Manejar retroceso en rutas restringidas
  if (isAuthenticated()) {
    const restrictedRoutes = ['/login', '/home']; // Rutas que no deberían ser accesibles
    if (restrictedRoutes.includes(currentPath)) {
      // Impide el retroceso a rutas restringidas
      history.replaceState(null, null, '/dashboard'); // Cambia el historial a dashboard
      modalMessage = 'Acceso restringido. Serás redirigido al Dashboard.';
      openWarningModal(modalMessage);
      setTimeout(() => {
        window.location.href = '/dashboard'; // Redirige después de un pequeño retraso
      }, 2000);
    }
  }
}

// Función para crear el modal
function createModal() {
  modal = document.createElement('div');
  modal.style.display = 'none'; // Inicialmente oculto
  modal.style.position = 'fixed';
  modal.style.zIndex = '1500';
  modal.style.left = '0';
  modal.style.top = '0';
  modal.style.width = '100%';
  modal.style.height = '100%';
  modal.style.backgroundColor = 'rgba(250, 150, 20, 0.8)';
  modal.style.paddingTop = '60px';

  const modalContent = document.createElement('div');
  modalContent.style.backgroundColor = '#0f0248';
  modalContent.style.margin = '15% auto';
  modalContent.style.padding = '20px';
  modalContent.style.border = '1px solid #888';
  modalContent.style.width = '80%';

  const message = document.createElement('p');
  modalContent.appendChild(message); // Mover el mensaje aquí para actualizarlo después

  const redirectButton = document.createElement('button');
  redirectButton.innerText = 'Volver';
  redirectButton.onclick = function () {
    window.location.href = '/login';
  };

  modalContent.appendChild(redirectButton);
  modal.appendChild(modalContent);
  document.body.appendChild(modal); // Agregar el modal al body
}

// Función para mostrar el modal con un mensaje personalizado
function openWarningModal(messageText) {
  if (!modal) createModal(); // Crear modal si no existe
  modal.querySelector('p').innerText = messageText; // Actualizar el texto del mensaje
  modal.style.display = 'block'; // Mostrar el modal
}

// Guardar el currentPath actual al cargar la página
window.addEventListener('load', () => {
  const currentPath = getCurrentPath();
  setCurrentPath(currentPath);
  handleRouteNavigation();
});

// Guardar el currentPath al cambiar la URL (enlaces o navegación interna)
window.addEventListener('popstate', () => {
  const currentPath = getCurrentPath();
  setCurrentPath(currentPath);
  handleRouteNavigation();
});

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

// Conexión WebSocket
const socket = new WebSocket(
  'wss://6000-fanor19481956-1945-7e1k25j94um.ws-us116.gitpod.io'
); // Cambia a tu URL de WebSocket

// Manejar la conexión
socket.addEventListener('open', () => {
  console.log('Conectado al servidor WebSocket');
});

socket.addEventListener('message', (event) => {
  if (event.data === 'actualizar') {
    console.log('Actualizando la página...');

    const loadingDiv = document.createElement('div');
    loadingDiv.id = 'loadingMessage';
    loadingDiv.style.position = 'fixed';
    loadingDiv.style.top = '50%';
    loadingDiv.style.left = '50%';
    loadingDiv.style.transform = 'translate(-50%, -50%)';
    loadingDiv.style.opacity = '0';
    loadingDiv.style.transition = 'opacity 0.5s';
    document.body.appendChild(loadingDiv);

    setTimeout(() => {
      loadingDiv.style.opacity = '0';
    }, 500);

    setTimeout(() => {
      location.reload();
    }, 500);
  }
});

socket.addEventListener('error', (error) => {
  console.error('Error en la conexión WebSocket:', error);
});

// Manejar cierre de conexión
socket.addEventListener('close', () => {
  console.log('Conexión cerrada');
});
