const socket = new WebSocket(
  'wss://6001-fanoro1956-1945-zibszpmbub3.ws-us116.gitpod.io'
);

// Crear un div para el mensaje de reconexión
const reconnectingDiv = document.createElement('div');
reconnectingDiv.id = 'reconnectingMessage';
reconnectingDiv.style.position = 'fixed';
reconnectingDiv.style.bottom = '10px'; // Posicionar en la parte inferior
reconnectingDiv.style.left = '10px'; // Posicionar a la izquierda
reconnectingDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.8)'; // Fondo semi-transparente
reconnectingDiv.style.color = '#fff'; // Texto en blanco
reconnectingDiv.style.padding = '10px';
reconnectingDiv.style.borderRadius = '5px';
reconnectingDiv.style.display = 'none'; // Inicialmente oculto
document.body.appendChild(reconnectingDiv); // Añadir el mensaje al cuerpo del documento

// Manejar la conexión
socket.addEventListener('open', () => {
  console.log('Conectado al servidor WebSocket');
  reconnectingDiv.style.display = 'none'; // Ocultar mensaje si la conexión es exitosa
});

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
  reconnectingDiv.style.display = 'block'; // Mostrar mensaje de reconexión
  reconnectingDiv.textContent = 'Reconectando...'; // Cambiar el texto del mensaje
});

// Manejar cierre de conexión
socket.addEventListener('close', () => {
  console.log('Conexión cerrada');
  reconnectingDiv.style.display = 'block'; // Mostrar mensaje de reconexión
  reconnectingDiv.textContent = 'Reconectando...'; // Cambiar el texto del mensaje

  // Intentar reconectar después de un tiempo
  setTimeout(() => {
    // Volver a intentar la conexión
    const newSocket = new WebSocket(
      'wss://6001-fanoro1956-1945-zibszpmbub3.ws-us116.gitpod.io'
    );

    // Manejar la nueva conexión
    newSocket.addEventListener('open', () => {
      console.log('Reconectado al servidor WebSocket');
      reconnectingDiv.style.display = 'none'; // Ocultar mensaje si la reconexión es exitosa
    });

    // Copiar eventos del socket original al nuevo
    newSocket.addEventListener('message', (event) => {
      // Manejar mensajes del servidor
      if (event.data === 'actualizar') {
        console.log('Actualizando la página...');
        // (La lógica de actualización va aquí)
      }
    });

    newSocket.addEventListener('error', (error) => {
      console.error('Error en la reconexión WebSocket:', error);
    });

    newSocket.addEventListener('close', () => {
      console.log('Conexión cerrada nuevamente');
      reconnectingDiv.style.display = 'block'; // Mostrar mensaje de reconexión
    });
  }, 3000); // Intentar reconectar cada 3 segundos (ajusta según sea necesario)
});
