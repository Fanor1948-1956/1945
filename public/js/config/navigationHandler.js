// config/navigationHandler.js

// Función para obtener la ruta actual
export function getCurrentPath() {
  return window.location.pathname;
}

// Función para setear el currentPath en localStorage
export function setCurrentPath(path) {
  localStorage.setItem('currentPath', path);
}

// Función para obtener el token de autenticación desde localStorage
export function getToken() {
  return localStorage.getItem('token');
}

// Función para verificar si el usuario está autenticado
export function isAuthenticated() {
  return getToken() && localStorage.getItem('isAuthenticated') === 'true';
}

// Función para manejar la navegación y verificar autenticación
export function handleRouteNavigation() {
  const currentPath = getCurrentPath();
  setCurrentPath(currentPath);

  let modalMessage;

  if (currentPath === '/dashboard' && !isAuthenticated()) {
    modalMessage = 'Necesitas iniciar sesión para acceder a esta ruta.';
    openWarningModal(modalMessage);
  } else if (currentPath === '/login' && isAuthenticated()) {
    modalMessage = 'Ya estás autenticado. Serás redirigido al Dashboard.';
    openWarningModal(modalMessage);

    history.replaceState(null, null, '/dashboard');
    setTimeout(() => {
      window.location.href = '/dashboard';
    }, 2000);
  }

  const publicRoutes = ['/login', '/home'];
  if (publicRoutes.includes(currentPath) && isAuthenticated()) {
    modalMessage =
      'No puedes acceder a esta ruta. Serás redirigido al Dashboard.';
    openWarningModal(modalMessage);

    history.replaceState(null, null, '/dashboard');
    setTimeout(() => {
      window.location.href = '/dashboard';
    }, 2000);
  }

  if (isAuthenticated()) {
    const restrictedRoutes = ['/login', '/home'];
    if (restrictedRoutes.includes(currentPath)) {
      history.replaceState(null, null, '/dashboard');
      modalMessage = 'Acceso restringido. Serás redirigido al Dashboard.';
      openWarningModal(modalMessage);
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 2000);
    }
  }
}

// Función para crear el modal
function createModal() {
  let modal = document.createElement('div');
  modal.style.display = 'none';
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
  modalContent.appendChild(message);

  const redirectButton = document.createElement('button');
  redirectButton.innerText = 'Volver';
  redirectButton.onclick = function () {
    window.location.href = '/login';
  };

  modalContent.appendChild(redirectButton);
  modal.appendChild(modalContent);
  document.body.appendChild(modal);
  return modal;
}

// Función para mostrar el modal con un mensaje personalizado
let modal = createModal();
export function openWarningModal(messageText) {
  modal.querySelector('p').innerText = messageText;
  modal.style.display = 'block';
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
