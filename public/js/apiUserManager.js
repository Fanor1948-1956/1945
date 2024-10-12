// apiUserManager.js
import { apiFetch } from './apiFetch.js'; // Asegúrate de la ruta correcta

// Función genérica para registrar datos
export async function registerData(url, data) {
  try {
    const response = await apiFetch(url, 'POST', data);
    console.log('Datos registrados:', response);
    return response; // Devuelve la respuesta si es necesario
  } catch (error) {
    console.error('Error al registrar datos:', error);
    return null; // Devuelve null en caso de error
  }
}

// Función genérica para actualizar datos
export async function updateData(url, data) {
  try {
    const response = await apiFetch(url, 'PUT', data);
    console.log('Datos actualizados:', response);
    return response; // Devuelve la respuesta si es necesario
  } catch (error) {
    console.error('Error al actualizar datos:', error);
    return null; // Devuelve null en caso de error
  }
}

// Función para obtener y renderizar datos
export async function fetchAndRenderData(url, renderTable, columnHeaders) {
  try {
    const data = await apiFetch(url);
    console.log('Data received:', data);
    renderTable(data, columnHeaders); // Llama a la función de renderizado
  } catch (error) {
    console.error('Error al obtener los datos:', error);
  }
}
