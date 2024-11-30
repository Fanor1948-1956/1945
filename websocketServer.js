const WebSocket = require('ws');
const binance = require('binance-api-node').default;

// Crear una instancia de cliente de Binance usando las claves desde el archivo .env
const client = binance({
  apiKey: process.env.API_KEY_BIN,
  apiSecret: process.env.API_SECRET_BIN,
});

const createWebSocketServer = (server) => {
  const wss = new WebSocket.Server({ noServer: true });

  // Manejar conexiones entrantes de WebSocket
  wss.on('connection', (ws) => {
    console.log('Nuevo cliente conectado');
    ws.on('message', (message) => {
      console.log('Mensaje recibido: ', message);
    });

    // Enviar un mensaje de bienvenida al nuevo cliente
    ws.send(
      JSON.stringify({
        type: 'welcome',
        message: 'Bienvenido al servidor WebSocket',
      })
    );
  });

  // Función para notificar a todos los clientes conectados
  const notifyClients = (message) => {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(message)); // Enviar un objeto JSON válido
      }
    });
    console.log('Notificación enviada a todos los clientes');
  };

  // Función para enviar actualizaciones iniciales a los clientes
  const sendInitialUpdate = () => {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(
          JSON.stringify({
            type: 'update',
            message: 'Bienvenido! Datos actualizados',
          })
        );
      }
    });
  };

  // WebSocket de Binance para recibir el precio del BTC/USDT en tiempo real
  const wsBinance = new WebSocket(
    'wss://stream.binance.com:9443/ws/btcusdt@ticker'
  );

  wsBinance.on('message', (data) => {
    const tradeData = JSON.parse(data);
    const price = tradeData.p; // El precio del trade

    console.log(`Nuevo precio de BTC/USDT: ${price}`);

    // Notificar a todos los clientes conectados con el precio de BTC
    notifyClients({ type: 'price-update', symbol: 'BTC/USDT', price });
  });

  wsBinance.on('open', () => {
    console.log('Conexión WebSocket a Binance establecida');
  });

  wsBinance.on('close', () => {
    console.log('Conexión WebSocket cerrada con Binance');
  });

  wsBinance.on('error', (error) => {
    console.error('Error en WebSocket de Binance:', error);
  });

  return { wss, notifyClients, sendInitialUpdate }; // Asegúrate de exportar estas funciones
};

module.exports = { createWebSocketServer };
