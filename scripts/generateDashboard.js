const fs = require('fs');
const path = require('path');
const nunjucks = require('nunjucks');
const { privateRoutes } = require('../routes/privateRoutes'); // Asegúrate de exportar el array de rutas

// Configura Nunjucks para que busque las plantillas en el directorio adecuado
nunjucks.configure(path.join(__dirname, '../views'), { autoescape: true });

// Define el archivo de destino para el dashboard
const dashboardFilePath = path.join(
  __dirname,
  '../views/pages/privatePages/dashboard.njk'
);
const createDashboardFile = async (userRoles) => {
  try {
    const dashboardRoute = privateRoutes.find(
      (route) => route.path === '/dashboard'
    );
    if (!dashboardRoute) {
      throw new Error(
        'No se encontró la ruta de dashboard en registerPrivateRoutes'
      );
    }

    // Obtener items del dashboard
    const items = await dashboardRoute.items(userRoles);
    console.log('Items para el dashboard:', items); // Verificar los items

    const dashboard = { title: dashboardRoute.title, sections: items };
    console.log('Dashboard generado:', dashboard); // Verificar el dashboard

    const htmlContent = nunjucks.render('pages/privatePages/dashboard.njk', {
      dashboard,
      roles: userRoles,
    });

    console.log('HTML generado:', htmlContent); // Verificar el HTML

    if (fs.existsSync(dashboardFilePath)) {
      console.log('El archivo ya existe. Se sobrescribirá:', dashboardFilePath);
    } else {
      console.log('Creando nuevo archivo:', dashboardFilePath);
    }

    fs.writeFileSync(dashboardFilePath, htmlContent, 'utf-8');
    console.log('Dashboard creado en:', dashboardFilePath);
  } catch (error) {
    console.error('Error al generar el dashboard:', error);
  }
};

// Llama a la función de prueba con roles específicos
const userRoles = ['Doctor', 'Paciente', 'Administrador'];
createDashboardFile(userRoles).catch((error) => {
  console.error('Error al crear el dashboard:', error);
});
