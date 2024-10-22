import './apiRequest/apiFetchs.js';
import './apiRequest/ajaxRequest.js';
import './components/custom/userTable.js';
import './components/global/sidebar.js';
import './components/global/navbar.js';
import './components/global/snackbar.js';
import './components/global/modal.js';
import './components/global/dropdown.js';
import './components/global/toggleFields.js';


import './components/custom/icons.js';

import './components/custom/modal.js';



import './libraries/select2.min.js';


const socket = new WebSocket(
  'wss://7000-fanoro1956-1945-69ikfchcawk.ws-us116.gitpod.io'
);
socket.addEventListener('open', () => {
  console.log('Conectado al servidor WebSocket');
});

socket.addEventListener('message', (event) => {
  if (event.data === 'actualizar') {
    console.log('Actualizando la página...');

    // Crear y mostrar el spinner
    const spinnerDiv = document.createElement('div');
    spinnerDiv.id = 'loadingSpinner'; // Asignar ID para el spinner
    document.body.appendChild(spinnerDiv); // Agregar el spinner al DOM

    // Recargar la página después de mostrar el spinner
    setTimeout(() => {
      spinnerDiv.remove(); // Eliminar el spinner del DOM
      location.reload(); // Recargar la página
    }, 2000); // Mostrar el spinner durante 2 segundos
  }
});

socket.addEventListener('error', (error) => {
  console.error('Error en la conexión WebSocket:', error);
});

socket.addEventListener('close', () => {
  console.log('Conexión cerrada');
});








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
  const token = getToken();
  return token !== null;
}

// Función para manejar la navegación y verificar autenticación
function handleRouteNavigation() {
  const currentPath = getCurrentPath();
  setCurrentPath(currentPath);

  // Mensajes condicionales para el modal
  let modalMessage;
  if (currentPath === '/dashboard' && !isAuthenticated()) {
    modalMessage = 'Necesitas iniciar sesión para acceder a esta ruta.';
    openWarningModal(modalMessage);
  }

  if (currentPath === '/login' && isAuthenticated()) {
    modalMessage = 'Ya estás autenticado. Serás redirigido al Dashboard.';
    openWarningModal(modalMessage);
    // Aquí podrías usar history.replaceState si no quieres que el usuario vuelva al login
    // history.replaceState(null, null, '/dashboard');
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
  modal.style.backgroundColor = 'rgba(250, 110, 20, 0.8)';
  modal.style.paddingTop = '60px';

  const modalContent = document.createElement('div');
  modalContent.style.backgroundColor = '#fefefe';
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

  const storedPath = getCurrentPathFromLocalStorage();
  if (storedPath && storedPath !== currentPath) {
    window.location.href = storedPath;
  } else {
    handleRouteNavigation();
  }
});

// Guardar el currentPath al cambiar la URL (enlaces o navegación interna)
window.addEventListener('popstate', () => {
  const currentPath = getCurrentPath();
  setCurrentPath(currentPath);
  handleRouteNavigation();
});
