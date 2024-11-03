// // Función para generar el HTML del sidebar
// export function renderSidebar(routes) {
//   const sidebar = document.createElement('aside');
//   sidebar.id = 'sidebar';
//   sidebar.className = 'sidebar';

//   const ul = document.createElement('ul');

//   // Agregar rutas públicas
//   routes.publicRoutes.forEach((route) => {
//     ul.appendChild(createMenuItem(route));
//   });

//   // Agregar rutas privadas si el usuario está autenticado
//   if (routes.isAuthenticated) {
//     routes.privateRoutes.forEach((route) => {
//       if (route.path !== '/logout' && hasAccess(routes.userRoles, route)) {
//         ul.appendChild(createMenuItem(route));
//       }
//     });
//   }

//   // Agregar botón de logout si está autenticado
//   if (routes.isAuthenticated) {
//     const logoutItem = routes.privateRoutes.find((r) => r.path === '/logout');
//     if (logoutItem) {
//       const logoutDiv = document.createElement('div');
//       logoutDiv.className = 'logout-container';
//       logoutDiv.appendChild(createLink(logoutItem));
//       sidebar.appendChild(logoutDiv);
//     }
//   }

//   sidebar.appendChild(ul);
//   document.body.appendChild(sidebar);
// }

// // Función para crear un elemento de menú con enlaces y submenús
// function createMenuItem(route) {
//   const li = document.createElement('li');
//   const link = createLink(route);
//   li.appendChild(link);

//   // Agregar submenús si existen
//   if (route.subRoutes) {
//     const submenu = document.createElement('ul');
//     submenu.className = 'submenu';
//     route.subRoutes.forEach((subRoute) => {
//       submenu.appendChild(createMenuItem(subRoute));
//     });
//     li.appendChild(submenu);
//   }

//   return li;
// }

// // Función para crear un enlace
// function createLink(route) {
//   const a = document.createElement('a');
//   a.href = route.path;
//   a.className = route.subRoutes ? 'has-submenu' : 'menu-item';
//   a.dataset.route = route.path;
//   a.innerHTML = `<div class="icon">${route.icon}</div> ${route.title}`;
//   return a;
// }

// document.addEventListener('DOMContentLoaded', () => {
//   renderSidebar(routes);
// });
