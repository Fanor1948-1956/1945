// // app.js o el nombre que tengas para tu archivo principal

// const express = require('express');
// const bodyParser = require('body-parser');
// const nunjucks = require('nunjucks');
// const sessionConfig = require('./config/session');
// const { connectDB } = require('./config/database');
// const authRoutes = require('./routes/authRoutes');
// const permissionRoutes = require('./routes/permissionRoutes');
// const roleRoutes = require('./routes/roleRoutes');
// const userRoutes = require('./routes/userRoutes');
// const serviceRoutes = require('./routes/serviceRoutes');
// const profileRoutes = require('./routes/profileRoutes');
// const registerPublicRoutes = require('./routes/publicRoutes');
// const registerPrivateRoutes = require('./routes/privateRoutes');
// const { verifyToken } = require('./middleware/authMiddleware');

// const specialtyRoutes = require('./routes/specialtyRoutes');
// // Importar la función

// const app = express();
// const port = process.env.PORT || 3000;

// // Conectar a la base de datos
// connectDB();

// // Configurar Nunjucks para las vistas
// const env = nunjucks.configure('views', {
//   autoescape: true,
//   express: app,
//   watch: true, // Opcional, permite ver los cambios en tiempo real
// });
// app.set('view engine', 'njk'); // Establecer Nunjucks como motor de vista
// // Configurar middleware de sesión
// app.use(sessionConfig());
// env.addFilter('date', function (dateString) {
//   const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
//   const date = new Date(dateString);
//   return date.toLocaleDateString('es-ES', options);
// });
// // Definir el filtro intersect
// env.addFilter('intersect', function (arr1, arr2) {
//   return arr1.filter((value) => arr2.includes(value));
// });

// // Agregar un filtro JSON
// env.addFilter('json', function (obj) {
//   return JSON.stringify(obj);
// });
// // Middleware para archivos estáticos
// app.use(express.static('public'));

// // Middleware para manejar JSON y formularios
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Redirección en la ruta raíz
// app.get('/', (req, res) => {
//   if (req.session.authenticated) {
//     return res.redirect('/dashboard'); // Redirige al dashboard si está autenticado
//   } else {
//     return res.redirect('/home'); // Redirige a la página de inicio de sesión si no está autenticado
//   }
// });

// // Registrar rutas usando la función externa
// registerPublicRoutes(app);
// registerPrivateRoutes(app);

// // Importar rutas específicas
// app.use('/permissions', verifyToken, permissionRoutes);
// app.use('/roles', verifyToken, roleRoutes);
// app.use('/users', verifyToken, userRoutes);
// app.use('/services', verifyToken, serviceRoutes);
// app.use('/api', verifyToken, profileRoutes);
// app.use('/auth', authRoutes); // Rutas de autenticación

// app.use('/specialties', verifyToken, specialtyRoutes);

// // Iniciar el servidor
// app.listen(port, () => {
//   console.log(`Servidor corriendo en http://localhost:${port}`);
// });

// app.js o el nombre que tengas para tu archivo principal

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nunjucks = require('nunjucks');
const sessionConfig = require('./config/session');
const { connectDB } = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const permissionRoutes = require('./routes/permissionRoutes');
const roleRoutes = require('./routes/roleRoutes');
const userRoutes = require('./routes/userRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const profileRoutes = require('./routes/profileRoutes');
const registerPublicRoutes = require('./routes/publicRoutes');
const registerPrivateRoutes = require('./routes/privateRoutes');
const { verifyToken } = require('./middleware/authMiddleware');
const specialtyRoutes = require('./routes/specialtyRoutes');

const WebSocket = require('ws'); // Importar WebSocket
const chokidar = require('chokidar'); // Importar Chokidar

const app = express();
const port = process.env.PORT || 5000; // Cambiar a 5000

// Conectar a la base de datos
connectDB();

// Configurar Nunjucks para las vistas
const env = nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true, // Opcional, permite ver los cambios en tiempo real
});
app.set('view engine', 'njk'); // Establecer Nunjucks como motor de vista

// Configurar middleware de sesión
app.use(sessionConfig());
env.addFilter('date', function (dateString) {
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', options);
});
env.addFilter('intersect', function (arr1, arr2) {
  return arr1.filter((value) => arr2.includes(value));
});
env.addFilter('json', function (obj) {
  return JSON.stringify(obj);
});
app.use(cors());
// Middleware para archivos estáticos
app.use(express.static('public'));

// Middleware para manejar JSON y formularios
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Redirección en la ruta raíz
app.get('/', (req, res) => {
  if (req.session.authenticated) {
    return res.redirect('/dashboard');
  } else {
    return res.redirect('/home');
  }
});
app.use(express.static('public'));
// Registrar rutas
registerPublicRoutes(app);
registerPrivateRoutes(app);

// Importar rutas específicas
app.use('/permissions', verifyToken, permissionRoutes);
app.use('/roles', verifyToken, roleRoutes);
app.use('/users', verifyToken, userRoutes);
app.use('/services', verifyToken, serviceRoutes);
app.use('/api', verifyToken, profileRoutes);
app.use('/auth', authRoutes);
app.use('/specialties', verifyToken, specialtyRoutes);

// Iniciar el servidor HTTP
const server = app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
const wss = new WebSocket.Server({ noServer: true });

// En el servidor, cuando envías el mensaje de actualización
wss.clients.forEach((client) => {
  if (client.readyState === WebSocket.OPEN) {
    client.send(JSON.stringify({ type: 'update', message: 'actualizar' }));
  }
});

// Conectar el servidor WebSocket al servidor HTTP existente
server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});

// Configurar Chokidar para vigilar cambios en los archivos .njk
chokidar.watch('views/**/*.njk').on('change', (path) => {
  console.log(`Archivo cambiado: ${path}`);
  notifyClients(); // Notificar a los clientes conectados
});

// Función para notificar a todos los clientes
const notifyClients = () => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send('actualizar'); // Mensaje para recargar la página
    }
  });
  console.log('Notificación enviada a todos los clientes');
};
