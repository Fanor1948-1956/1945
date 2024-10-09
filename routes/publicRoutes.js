const roleModel = require('../models/roleModel');
const { User } = require('../models/userModel');

// Definir las rutas públicas
const publicRoutes = [
  {
    path: '/home',
    title: 'Inicio',
    view: 'pages/publicPages/home.njk',
    items: async () => [], // Cargar datos si es necesario
  },
  {
    path: '/about',
    title: 'Sobre Nosotros',
    view: 'pages/publicPages/about.njk',
    items: async () => [], // Cargar datos si es necesario
  },
  {
    title: 'Contacto', // Sin path ni view
    subRoutes: [
      {
        path: '/settings',
        title: 'Configuraciones',
        view: 'pages/publicPages/contact.njk',
        items: async () => [
          {
            title: 'Configuración 1',
            description: 'Descripción de configuración 1',
          },
          {
            title: 'Configuración 2',
            description: 'Descripción de configuración 2',
          },
        ],
      },
    ],
  },
  {
    path: '/register',
    title: 'Registro',
    view: 'pages/publicPages/register.njk',
    items: async () => await roleModel.find(),
  },
  {
    path: '/login',
    title: 'Iniciar Sesión',
    view: 'pages/publicPages/login.njk',
    items: async () => [],
  },

  {
    title: 'Usuarios', // Sin path ni view
    subRoutes: [
      {
        path: '/dosadctor',
        title: 'Médicos',
        view: 'pages/publicPages/home.njk', // Cambiar vista si es necesario
        items: async () => {
          const doctorRole = await roleModel.findOne({ name: 'Doctor' });
          return await User.find({ roles: doctorRole._id }).populate('roles');
        },
      },
    ],
  },
];

const registerPublicRoutes = (app) => {
  publicRoutes.forEach((route) => {
    // Registrar la ruta principal solo si tiene un path
    if (route.path) {
      app.get(route.path, async (req, res) => {
        if (
          req.session.authenticated &&
          (route.path === '/home' || route.path === '/register')
        ) {
          return res.redirect('/dashboard'); // Redirigir si ya está autenticado
        }

        try {
          const items = await route.items(); // Obtener los items

          res.render(route.view, {
            title: route.title,
            items: items,
            publicRoutes, // Rutas públicas

            isAuthenticated: req.session.authenticated,
            username: req.session.name,
          });
        } catch (error) {
          console.error(`Error al cargar los datos para ${route.path}:`, error);
          res.status(500).send('Error al cargar los datos');
        }
      });
    }

    // Registrar las subrutas dinámicamente
    if (route.subRoutes && route.subRoutes.length > 0) {
      route.subRoutes.forEach((subRoute) => {
        const fullSubRoutePath = `${subRoute.path}`; // Concatenar la ruta principal y la subruta

        // Registrar subrutas con middleware de acceso
        app.get(fullSubRoutePath, async (req, res) => {
          try {
            const items = await subRoute.items(); // Obtener los items
            res.render(subRoute.view, {
              title: subRoute.title,
              items: items,
              publicRoutes, // Rutas públicas
              isAuthenticated: req.session.authenticated,
              username: req.session.name,
            });
          } catch (error) {
            console.error(
              `Error al cargar los datos para ${subRoute.path}:`,
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
