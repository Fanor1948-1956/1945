// permissionService.js
import {
  registerData,
  updateData,
  fetchAndRenderData,
} from '../api/apiUserManager.js';
import {
  loadPermissions,
  addPermission,
  updatePermission,
} from '../reducers/permissionReducer.js';
import { permissionEndpoints } from '../config/apiEndpoints.js';

// Obtener permisos desde la API
export const fetchPermissions = async () => {
  try {
    const response = await fetchAndRenderData(permissionEndpoints.list);
    loadPermissions(response); // Carga los permisos en el estado
  } catch (error) {
    console.error('Error fetching permissions:', error);
  }
};

// Crear un nuevo permiso
export const createPermission = async (newPermission) => {
  try {
    const response = await registerData(
      permissionEndpoints.create,
      newPermission
    ); // Llama a tu función de registro
    if (response) {
      addPermission(response); // Agrega el nuevo permiso al estado
      return response.message; // Devuelve el mensaje del servidor
    }
  } catch (error) {
    console.error('Error creando permiso:', error);
    return 'Error al crear el permiso.'; // Mensaje de error por defecto
  }
};

// Actualizar un permiso existente
export const updatePermissionService = async (updatedPermission) => {
  try {
    const response = await updateData(
      `${permissionEndpoints.update}/${updatedPermission._id}`, // Asume que el endpoint de actualización requiere el ID
      updatedPermission
    );
    if (response) {
      updatePermission(response); // Agrega el permiso actualizado al estado
      return response.message; // Devuelve el mensaje del servidor
    }
  } catch (error) {
    console.error('Error actualizando permiso:', error);
    return 'Error al actualizar el permiso.'; // Mensaje de error por defecto
  }
};
