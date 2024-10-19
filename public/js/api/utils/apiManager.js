import { apiFetch } from '../apiFetch.js';

export async function registerData(url, data) {
  try {
    const response = await apiFetch(url, 'POST', data);
    console.log('Datos registrados:', response);
    return response;
  } catch (error) {
    console.error('Error al registrar datos:', error);
    return null;
  }
}

export async function updateData(url, data) {
  try {
    const response = await apiFetch(url, 'PUT', data);
    console.log('Datos actualizados:', response);
    return response;
  } catch (error) {
    console.error('Error al actualizar datos:', error);
    return null;
  }
}

export async function fetchAndRenderData(url, renderTable, columnHeaders) {
  try {
    const data = await apiFetch(url);
    console.log('Data received:', data);
    renderTable(data, columnHeaders);
  } catch (error) {
    console.error('Error al obtener los datos:', error);
  }
}
