const socket = new WebSocket(
  'wss:
);


const reconnectingDiv = document.createElement('div');
reconnectingDiv.id = 'reconnectingMessage';
reconnectingDiv.style.position = 'fixed';
reconnectingDiv.style.bottom = '10px'; 
reconnectingDiv.style.left = '10px'; 
reconnectingDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.8)'; 
reconnectingDiv.style.color = '#fff'; 
reconnectingDiv.style.padding = '10px';
reconnectingDiv.style.borderRadius = '5px';
reconnectingDiv.style.display = 'none'; 
document.body.appendChild(reconnectingDiv); 


socket.addEventListener('open', () => {
  console.log('Conectado al servidor WebSocket');
  reconnectingDiv.style.display = 'none'; 
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
    }, 100); 

    
    setTimeout(() => {
      location.reload(); 
    }, 500); 
  }
});


socket.addEventListener('error', (error) => {
  console.error('Error en la conexión WebSocket:', error);
  reconnectingDiv.style.display = 'block'; 
  reconnectingDiv.textContent = 'Reconectando...'; 
});


socket.addEventListener('close', () => {
  console.log('Conexión cerrada');
  reconnectingDiv.style.display = 'block'; 
  reconnectingDiv.textContent = 'Reconectando...'; 

  
  setTimeout(() => {
    
    const newSocket = new WebSocket(
      'wss:
    );

    
    newSocket.addEventListener('open', () => {
      console.log('Reconectado al servidor WebSocket');
      reconnectingDiv.style.display = 'none'; 
    });

    
    newSocket.addEventListener('message', (event) => {
      
      if (event.data === 'actualizar') {
        console.log('Actualizando la página...');
        
      }
    });

    newSocket.addEventListener('error', (error) => {
      console.error('Error en la reconexión WebSocket:', error);
    });

    newSocket.addEventListener('close', () => {
      console.log('Conexión cerrada nuevamente');
      reconnectingDiv.style.display = 'block'; 
    });
  }, 3000); 
});
