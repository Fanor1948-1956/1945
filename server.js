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

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  if (req.session.authenticated) {
    return res.redirect('/dashboard');
  } else {
    return res.redirect('/home');
  }
});
app.use(express.static('public'));

registerPublicRoutes(app);
registerPrivateRoutes(app);

app.use('/permissions', verifyToken, permissionRoutes);
app.use('/roles', verifyToken, roleRoutes);
app.use('/users', verifyToken, userRoutes);
app.use('/services', verifyToken, serviceRoutes);
app.use('/api', verifyToken, profileRoutes);
app.use('/auth', authRoutes);
app.use('/specialties', verifyToken, specialtyRoutes);

const server = app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
const wss = new WebSocket.Server({ noServer: true });

wss.clients.forEach((client) => {
  if (client.readyState === WebSocket.OPEN) {
    client.send(JSON.stringify({ type: 'update', message: 'actualizar' }));
  }
});

server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});

const watcher = chokidar.watch(['./**/*.njk', './**/*.js', './**/*.css']);
watcher.on('change', (path) => {
  console.log(`Archivo cambiado: ${path}`);
  notifyClients();
});

const notifyClients = () => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send('actualizar');
    }
  });
  console.log('Notificación enviada a todos los clientes');
};
