const roleModel = require('../models/roleModel');
const { validateIcon, generateIdFromPath } = require('../utils/iconUtils');

const publicRoutes = [
  {
    path: '/home',
    icon: validateIcon('hospital'),
    title: 'Inicio',
    view: 'pages/publicPages/home.njk',
    isPublic: true,
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
      { id: 'news', title: 'Noticias', icon: validateIcon('news') },
    ],
  },
  {
    path: '/about',
    icon: validateIcon('stethoscope'),
    id: generateIdFromPath('/about'),
    title: 'Sobre Nosotros',
    view: 'pages/publicPages/about.njk',
    isPublic: true,
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
    isPublic: true,
    items: async () => [],
  },
  {
    path: '/register',
    icon: validateIcon('register'),
    id: generateIdFromPath('/register'),
    title: 'Registro',
    view: 'pages/publicPages/register.njk',
    isPublic: true,
    items: async () => await roleModel.find(),
  },
  {
    path: '/login',
    icon: validateIcon('login'),
    id: generateIdFromPath('/login'),
    title: 'Iniciar Sessión',
    view: 'pages/publicPages/login.njk',
    items: async () => [],
    isPublic: true,
  },
];

const registerPublicRoutes = (app) => {
  publicRoutes.forEach((route) => {
    if (route.path) {
      app.get(route.path, async (req, res) => {
        // Verificar autenticación aquí también
        if (req.session.authenticated) {
          return res.redirect('/dashboard'); // Redirigir a dashboard si ya está autenticado
        } 

        try {
          const items = await route.items();
          res.render(route.view, {
            title: route.title,
            items: items,
            publicRoutes,
              currentPath: route.path, 
          });
        } catch (error) {
          console.error(`Error al cargar los datos para ${route.path}:`, error);
          res.status(500).send('Error al cargar los datos');
        }
      });
    }

    // Manejo de subrutas
    if (route.subRoutes) {
      route.subRoutes.forEach((subRoute) => {
        const subRoutePath = `${route.path}/${subRoute.id}`;
        app.get(subRoutePath, async (req, res) => {
          // Verificar autenticación aquí también
          if (req.session.authenticated) {
            return res.redirect('/dashboard'); // Redirigir a dashboard si ya está autenticado
          }

          try {
            const items = (await subRoute.items) ? await subRoute.items() : [];
            res.render(route.view, {
              title: subRoute.title,
              items: items,
              publicRoutes,
              currentPath: route.path,
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

