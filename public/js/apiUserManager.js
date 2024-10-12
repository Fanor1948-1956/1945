// import { apiFetch } from './apiFetch.js'; // Asegúrate de la ruta correcta

// // Obtener y renderizar usuarios
// export async function fetchUsers(renderTable) {
//   try {
//     const users = await apiFetch(
//       'https://8000-fanoro1956-1945-50am2qruf9y.ws-us116.gitpod.io/users/getUsers'
//     );
//     const userHeaders = {
//       name: 'Nombre',
//       email: 'Correo Electrónico',
//       phone: 'Teléfono',
//     };
//     renderTable(users, 'userTableContainer', userHeaders);
//   } catch (error) {
//     console.error('Error al obtener usuarios:', error);
//   }
// }

// // Obtener y renderizar especialidades
// export async function fetchSpecialties(renderTable) {
//   try {
//     const specialties = await apiFetch(
//       'https://8000-fanoro1956-1945-50am2qruf9y.ws-us116.gitpod.io/api/specialties'
//     );
//     const specialtyHeaders = {
//       name: 'Nombre de Especialidad',
//       description: 'Descripción',
//       category: 'Categoría',
//     };
//     renderTable(specialties, 'specialtyTableContainer', specialtyHeaders);
//   } catch (error) {
//     console.error('Error al obtener especialidades:', error);
//   }
// }
// apiUserManager.js
import { apiFetch } from './apiFetch.js'; // Asegúrate de la ruta correcta

// Función genérica para obtener y renderizar datos
export async function fetchAndRenderData(url, renderTable, columnHeaders) {
  try {
    const data = await apiFetch(url);
    console.log('Data received:', data);
    renderTable(data, columnHeaders);
  } catch (error) {
    console.error('Error al obtener los datos:', error);
  }
}
