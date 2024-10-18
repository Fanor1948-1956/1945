// Importa todos los scripts que necesitas
import './apiRequest/apiFetch.js';
import './apiRequest/ajaxRequest.js';
import './components/custom/userTable.js';
import './components/global/sidebar.js';
import './components/global/navbar.js';
import './components/global/snackbar.js';
import './components/global/modal.js';
import './components/global/dropdown.js';
import './components/global/toggleFields.js';

/*icons*/
import './components/custom/icons.js';

/*libraries*/
import './libraries/select2.min.js';
// Conexión WebSocket desde el cliente
const socket = new WebSocket(
  'wss://6001-fanoro1956-1945-zibszpmbub3.ws-us116.gitpod.io'
);

// Manejar la conexión
socket.addEventListener('open', () => {
  console.log('Conectado al servidor WebSocket');
});

// Manejar mensajes del servidor
// Manejar mensajes del servidor
socket.addEventListener('message', (event) => {
  if (event.data === 'actualizar') {
    console.log('Actualizando la página...');

    // Crear un div para el mensaje de carga
    const loadingDiv = document.createElement('div');
    loadingDiv.id = 'loadingMessage';
    loadingDiv.style.position = 'fixed';
    loadingDiv.style.top = '50%';
    loadingDiv.style.left = '50%';
    loadingDiv.style.transform = 'translate(-50%, -50%)';
    loadingDiv.style.opacity = '0'; // Hacerlo invisible
    loadingDiv.style.transition = 'opacity 0.5s'; // Transición para el cambio de opacidad
    document.body.appendChild(loadingDiv); // Añadir el mensaje al cuerpo del documento

    // Mostrar el mensaje de carga
    setTimeout(() => {
      loadingDiv.style.opacity = '0'; // Se mantiene invisible
    }, 100); // Un breve retraso antes de mostrar el mensaje

    // Esperar un tiempo antes de recargar
    setTimeout(() => {
      location.reload(); // Agregar un retraso antes de recargar
    }, 500); // Ajusta el tiempo según sea necesario
  }
});

// Manejar errores de conexión
socket.addEventListener('error', (error) => {
  console.error('Error en la conexión WebSocket:', error);
});

// Manejar cierre de conexión
socket.addEventListener('close', () => {
  console.log('Conexión cerrada');
});
