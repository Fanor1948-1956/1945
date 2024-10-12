// apiUserManager.js
import { apiFetch } from './apiFetch.js'; // Asegúrate de la ruta correcta

// Obtener usuarios y renderizar la tabla
export async function fetchUsers(renderUserTable) {
  try {
    const users = await apiFetch(
      'https://8000-fanoro1956-1945-50am2qruf9y.ws-us116.gitpod.io/users/getUsers'
    );
    console.log('users', users);
    renderUserTable(users);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
  }
}
