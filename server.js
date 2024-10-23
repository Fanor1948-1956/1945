const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nunjucks = require('nunjucks');
const cookieParser = require('cookie-parser');
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

const WebSocket = require('ws'); 
const chokidar = require('chokidar'); 

const app = express();
const port = process.env.PORT || 5000; 


connectDB();


const env = nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true, 
});
app.set('view engine', 'njk'); 


app.use(sessionConfig());
app.use(cookieParser());
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
app.use((req, res, next) => {
  console.log('Sesión antes de redirigir:', req.session);
  next();
});

app.get('/', (req, res) => {
  if (req.session&&req.session.authenticated) {
    return res.redirect('/dashboard');
  } else {
    return res.redirect('/home');
  }
});
//session revisar get req.session.authenticated
app.use(express.static('public'));

registerPublicRoutes(app);


registerPrivateRoutes(app);



//controlar retroceso entre sesiones login y dashboard


app.use('/permissions', permissionRoutes);
app.use('/roles', roleRoutes);
app.use('/users', userRoutes);
app.use('/services', verifyToken, serviceRoutes);
app.use('/api', verifyToken, profileRoutes);
app.use('/auth', authRoutes);
app.use('/specialties', specialtyRoutes);

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
