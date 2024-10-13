import { registerData, updateData } from '../apiUserManager.js';
import { loadEndpoints } from '../endpoints/loadEndpoints.js';

/**
 * Maneja la creación de un recurso
 * @param {string} resource - El tipo de recurso (ej. "permissions", "users")
 * @param {object} data - Los datos a enviar al servidor
 * @returns {Promise<{success: boolean, message: string}>}
 */
export const saveResource = async (resource, data) => {
  try {
    const endpoint = loadEndpoints(resource, 'create');
    const response = await registerData(endpoint, data);

    if (response) {
      console.log(`${resource} agregado:`, response);
      return {
        success: true,
        message:
          response.message ||
          `${
            resource.charAt(0).toUpperCase() + resource.slice(1)
          } agregado correctamente.`,
      };
    } else {
      return { success: false, message: `Error al agregar el ${resource}.` };
    }
  } catch (error) {
    console.error('Error en la creación del recurso:', error);
    return { success: false, message: 'Error en la conexión con el servidor.' };
  }
};

/**
 * Maneja la actualización de un recurso
 * @param {string} resource - El tipo de recurso (ej. "permissions", "users")
 * @param {string} id - El ID del recurso a actualizar
 * @param {object} data - Los datos a enviar al servidor
 * @returns {Promise<{success: boolean, message: string}>}
 */
export const updateResource = async (resource, id, data) => {
  try {
    const endpoint = loadEndpoints(resource, 'update', id);
    const response = await updateData(endpoint, data);

    if (response) {
      console.log(`${resource} actualizado:`, response);
      return {
        success: true,
        message:
          response.message ||
          `${
            resource.charAt(0).toUpperCase() + resource.slice(1)
          } actualizado correctamente.`,
      };
    } else {
      return { success: false, message: `Error al actualizar el ${resource}.` };
    }
  } catch (error) {
    console.error('Error en la actualización del recurso:', error);
    return { success: false, message: 'Error en la conexión con el servidor.' };
  }
};

/**
 * Maneja la eliminación de un recurso
 * @param {string} resource - El tipo de recurso (ej. "permissions", "users")
 * @param {string} id - El ID del recurso a eliminar
 * @returns {Promise<{success: boolean, message: string}>}
 */
export const deleteResource = async (resource, id) => {
  try {
    const endpoint = loadEndpoints(resource, 'delete', id);
    const response = await fetch(endpoint, {
      method: 'DELETE', // Método HTTP para eliminar
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error al eliminar ${resource}: ${response.statusText}`);
    }

    const result = await response.json();

    if (result.success) {
      console.log(`${resource} eliminado:`, result);
      return {
        success: true,
        message:
          result.message ||
          `${
            resource.charAt(0).toUpperCase() + resource.slice(1)
          } eliminado correctamente.`,
      };
    } else {
      return { success: false, message: `Error al eliminar el ${resource}.` };
    }
  } catch (error) {
    console.error('Error en la eliminación del recurso:', error);
    return { success: false, message: 'Error en la conexión con el servidor.' };
  }
};
