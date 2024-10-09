const permissionModel = require('../models/permissionModel');
const roleModel = require('../models/roleModel');
const { User, Patient } = require('../models/userModel');

// Definir las rutas privadas
const privateRoutes = [
  {
    path: '/dashboard',
    title: 'Dashboard privado',
    view: 'pages/privatePages/dashboard.njk',
    roles: ['Administrador', 'Doctor', 'Paciente', 'Jefe Médico', 'Paciente'],
    items: async () => [
      { title: 'Tarjeta 1', description: 'Descripción de la tarjeta 1' },
      { title: 'Tarjeta 2', description: 'Descripción de la tarjeta 2' },
    ],
  },
  {
    path: '/users',
    title: 'Lista de',
    view: 'pages/privatePages/users.njk',
    roles: ['Administrador', 'Jefe Médico', 'Paciente'],
    items: async () => [],
    subRoutes: [
      {
        path: '/admin',
        title: 'Administradores',
        roles: ['Administrador', 'Jefe Médico', 'Paciente'],
        items: async () => [],
      },
      {
        path: '/chiefMedical',
        title: 'Jefes Médicos',
        roles: ['Administrador', 'Jefe Médico', 'Patient'],
        items: async () => {
          const chiefMedicalRole = await roleModel.findOne({
            name: 'Jefe Médico',
          });
          return await User.find({ roles: chiefMedicalRole._id }).populate(
            'roles'
          );
        },
      },
      {
        path: '/doctor',
        title: 'Médicos',
        roles: ['Jefe Médico'],
        items: async () => {
          const doctorRole = await roleModel.findOne({ name: 'Doctor' });
          return await User.find({ roles: doctorRole._id }).populate('roles');
        },
      },
      {
        path: '/patient',
        title: 'Pacientes',
        roles: ['Doctor'],
        items: async () => {
          const patientRole = await roleModel.findOne({ name: 'Paciente' });
          return await User.find({ roles: patientRole._id }).populate('roles');
        },
      },
    ],
  },
  {
    path: '/schedule',
    title: 'Horarios de Atención',
    view: 'pages/privatePages/permissions.njk',
    roles: ['Doctor', 'Jefe Médico'],
    items: async () => await permissionModel.find(),
  },
  {
    path: '/disponibility',
    title: 'Disponibilidad',
    view: 'pages/privatePages/permissions.njk',
    roles: ['Doctor'],
    items: async () => await permissionModel.find(),
  },
  {
    path: '/speciality',
    title: 'Especialidad',
    view: 'pages/privatePages/specialities.njk',
    roles: ['Doctor', 'Administrador', 'Jefe Médico', 'Paciente'],
    items: async () => await permissionModel.find(),
  },
  {
    path: '/services',
    title: 'Servicio',
    view: 'pages/privatePages/permissions.njk',
    roles: ['Jefe Médico'],
    items: async () => await permissionModel.find(),
  },
  {
    path: '/appointment',
    title: 'Citas Médicas',
    view: 'pages/privatePages/permissions.njk',
    roles: ['Paciente', 'Doctor'],
    items: async () => await permissionModel.find(),
  },
  {
    path: '/prodoucers',
    title: 'Resultados Médicos',
    view: 'pages/privatePages/permissions.njk',
    roles: ['Doctor'],
    items: async () => await permissionModel.find(),
  },
  {
    path: '/historyClinic',
    title: 'Historia Clinico',
    view: 'pages/privatePages/permissions.njk',
    roles: ['Paciente'],
    items: async () => await permissionModel.find(),
  },
  {
    path: '/permissions',
    title: 'Permisos',
    view: 'pages/privatePages/permissions.njk',
    roles: ['Administrador'],
    items: async () => await permissionModel.find(),
  },
  {
    path: '/roles',
    title: 'Roles',
    view: 'pages/privatePages/roles.njk',
    roles: ['Administrador'],
    items: async () => {
      const permissions = await permissionModel.find();
      const roles = await roleModel.find().populate('permissions');
      const users = await User.find().populate('roles');
      return { roles, permissions, users };
    },
  },
];

const hasAccess = (userRoles, route) => {
  return (
    !route.roles ||
    route.roles.length === 0 ||
    route.roles.some((role) => userRoles.includes(role))
  );
};

const getUserRoles = (req) => req.session.roles || [];

const registerPrivateRoutes = (app) => {
  privateRoutes.forEach((route) => {
    app.use(route.path, (req, res, next) => {
      if (!req.session.authenticated) {
        return res.redirect('/home');
      }

      const userRoles = getUserRoles(req);
      if (!hasAccess(userRoles, route)) {
        return res.status(403).send('Acceso denegado');
      }

      next();
    });

    app.get(route.path, async (req, res) => {
      try {
        const items = await route.items();
        const allRoles = await roleModel.find();
        const allUsers = await User.find().populate('roles');

        res.render(route.view, {
          title: route.title,
          items: items,
          userRoles: getUserRoles(req),
          allRoles,
          allUsers,
          privateRoutes,
          isAuthenticated: req.session.authenticated,
          username: req.session.name,
        });
      } catch (error) {
        console.error(`Error al cargar los datos para ${route.path}:`, error);
        res.status(500).send('Error al cargar los datos');
      }
    });

    if (route.subRoutes && route.subRoutes.length > 0) {
      route.subRoutes.forEach((subRoute) => {
        const fullSubRoutePath = `${subRoute.path}`;

        app.use(fullSubRoutePath, (req, res, next) => {
          const userRoles = getUserRoles(req);
          if (!hasAccess(userRoles, subRoute)) {
            return res.status(403).send('Acceso denegado');
          }
          next();
        });

        app.get(fullSubRoutePath, async (req, res) => {
          try {
            const subItems = await subRoute.items();
            const allRoles = await roleModel.find();
            const allUsers = await User.find().populate('roles');
            res.render(route.view, {
              title: `${route.title}+ ${subRoute.title}`,
              items: subItems,
              userRoles: getUserRoles(req),
              allRoles,
              allUsers,
              privateRoutes,
              isAuthenticated: req.session.authenticated,
              username: req.session.name,
            });
          } catch (error) {
            console.error(
              `Error al cargar los datos para ${fullSubRoutePath}:`,
              error
            );
            res.status(500).send('Error al cargar los datos');
          }
        });
      });
    }
  });
};

module.exports = registerPrivateRoutes;
