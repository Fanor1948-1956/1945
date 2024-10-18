const roleModel = require('../models/roleModel');
const { getIcon } = require('../utils/iconUtils');

const generateIdFromPath = (path) => {
  return path
    .replace(/\//g, '-')
    .replace(/[^a-z0-9-]/gi, '')
    .toLowerCase();
};

// Función para validar y obtener un ícono
const validateIcon = (iconName) => {
  const icon = getIcon(iconName);
  // Si el ícono no existe, podrías devolver un ícono por defecto o null
  return icon ? icon : getIcon('defaultIcon'); // Cambia 'defaultIcon' por el ícono que prefieras
};

const publicRoutes = [
  {
    path: '/home',
    icon: validateIcon('hospital'),
    title: 'Inicio',
    view: 'pages/publicPages/home.njk',
    items: async () => [],
    subRoutes: [
      { id: 'practices', title: 'Prácticas', icon: validateIcon('practices') },
      { id: 'doctors', title: 'Médicos', icon: validateIcon('doctors') },
      { id: 'schedule', title: 'Agendar Cita', icon: validateIcon('agendar') },
      {
        id: 'features',
        title: 'Características',
        icon: validateIcon('features'),
      },
      { id: 'news', title: 'Noticias', icon: validateIcon('new') },
    ],
  },
  {
    path: '/about',
    icon: validateIcon('about'),
    id: generateIdFromPath('/about'),
    title: 'Sobre Nosotros',
    view: 'pages/publicPages/about.njk',
    subRoutes: [
      { id: 'mission', title: 'Nuestra Misión', icon: validateIcon('mission') },
      { id: 'vision', title: 'Nuestra Visión', icon: validateIcon('vision') },
    ],
    items: async () => [],
  },
  {
    path: '/contact',
    icon: validateIcon('contact'),
    id: generateIdFromPath('/contact'),
    title: 'Contacto',
    view: 'pages/publicPages/contact.njk',
    items: async () => [],
  },
  {
    path: '/register',
    icon: validateIcon('register'),
    id: generateIdFromPath('/register'),
    title: 'Regidsstro',
    view: 'pages/publicPages/register.njk',
    items: async () => await roleModel.find(),
  },
  {
    path: '/login',
    icon: validateIcon('login'),
    id: generateIdFromPath('/login'),
    title: 'Inicisdsdar Sessión',
    view: 'pages/publicPages/login.njk',
    items: async () => [],
  },
];

const registerPublicRoutes = (app) => {
  publicRoutes.forEach((route) => {
    // Ruta principal
    if (route.path) {
      app.get(route.path, async (req, res) => {
        if (
          req.session.authenticated &&
          (route.path === '/home' || route.path === '/register')
        ) {
          return res.redirect('/dashboard');
        }

        try {
          const items = await route.items();
          res.render(route.view, {
            title: route.title,
            items: items,
            publicRoutes,
            isAuthenticated: req.session.authenticated,
            username: req.session.name,
          });
        } catch (error) {
          console.error(`Error al cargar los datos para ${route.path}:`, error);
          res.status(500).send('Error al cargar los datos');
        }
      });
    }

    // Subrutas
    if (route.subRoutes) {
      route.subRoutes.forEach((subRoute) => {
        const subRoutePath = `${route.path}/${subRoute.id}`;
        app.get(subRoutePath, async (req, res) => {
          try {
            const items = (await subRoute.items) ? await subRoute.items() : [];
            res.render(route.view, {
              title: subRoute.title,
              items: items,
              publicRoutes,
              isAuthenticated: req.session.authenticated,
              username: req.session.name,
              icon: subRoute.icon, // Pasa el ícono de la subruta
            });
          } catch (error) {
            console.error(
              `Error al cargar los datos para ${subRoutePath}:`,
              error
            );
            res.status(500).send('Error al cargar los datos');
          }
        });
      });
    }
  });
};

module.exports = registerPublicRoutes;
