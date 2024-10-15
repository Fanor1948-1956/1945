// app.js o el nombre que tengas para tu archivo principal

const express = require('express');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const session = require('express-session');
const MongoStore = require('connect-mongo');
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
const apiRoutes = require('./routes/api');
const specialtyRoutes = require('./routes/specialtyRoutes');
// Importar la función

const app = express();
const port = 5000;

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
app.use(
  session({
    secret: 'mi_secreto', // Cambia esto por una clave más segura en producción
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl:
        'mongodb+srv://fanoro1945:fanoro1945@cluster0.j7bgf.mongodb.net/andres?retryWrites=true&w=majority',
    }),
    cookie: {
      secure: process.env.NODE_ENV === 'production', // Usa true si estás en producción
      maxAge: 1000 * 60 * 60, // 1 hora
      sameSite: 'lax',
    },
  })
);
env.addFilter('date', function (dateString) {
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', options);
});
// Definir el filtro intersect
env.addFilter('intersect', function (arr1, arr2) {
  return arr1.filter((value) => arr2.includes(value));
});

// Middleware para archivos estáticos
app.use(express.static('public'));

// Middleware para manejar JSON y formularios
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Redirección en la ruta raíz
app.get('/', (req, res) => {
  if (req.session.authenticated) {
    return res.redirect('/dashboard'); // Redirige al dashboard si está autenticado
  } else {
    return res.redirect('/home'); // Redirige a la página de inicio de sesión si no está autenticado
  }
});

// Registrar rutas usando la función externa
registerPublicRoutes(app);
registerPrivateRoutes(app);

app.use(apiRoutes);
// Importar rutas específicas
app.use('/permissions', verifyToken, permissionRoutes);
app.use('/roles', verifyToken, roleRoutes);
app.use('/users', verifyToken, userRoutes);
app.use('/services', verifyToken, serviceRoutes);
app.use('/api', verifyToken, profileRoutes);
app.use('/auth', authRoutes); // Rutas de autenticación

app.use('/specialties', verifyToken, specialtyRoutes);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
