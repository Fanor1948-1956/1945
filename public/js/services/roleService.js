import {
  registerData,
  updateData,
  fetchAndRenderData,
} from '../api/apiUserManager.js';
import {
  loadRoles,
  addRole,
  updateRole,
  deleteRole,
} from '../reducers/roleReducer.js';
import { roleEndpoints } from '../config/apiEndpoints.js';

// Obtener roles desde la API
// roleService.js
export const fetchRoles = async () => {
  try {
    const response = await fetchAndRenderData(roleEndpoints.list);
    console.log('response', response);

    // Llama a loadRoles con la respuesta completa
    loadRoles(response); // Carga los roles en el estado
  } catch (error) {
    console.error('Error al obtener roles:', error);
  }
};

// Crear un nuevo rol
export const createRole = async (newRole) => {
  try {
    const response = await registerData(roleEndpoints.create, newRole); // Llama a tu función de registro
    if (response) {
      addRole(response); // Agrega el nuevo rol al estado
      return response.message; // Devuelve el mensaje del servidor
    }
  } catch (error) {
    console.error('Error al crear el rol:', error);
    return 'Error al crear el rol.'; // Mensaje de error por defecto
  }
};

// Actualizar un rol existente
export const updateRoleService = async (updatedRole) => {
  try {
    const response = await updateData(
      `${roleEndpoints.update}/${updatedRole._id}`, // Asume que el endpoint de actualización requiere el ID
      updatedRole
    );
    if (response) {
      updateRole(response); // Agrega el rol actualizado al estado
      return response.message; // Devuelve el mensaje del servidor
    }
  } catch (error) {
    console.error('Error al actualizar el rol:', error);
    return 'Error al actualizar el rol.'; // Mensaje de error por defecto
  }
};

// Eliminar un rol existente
export const deleteRoleService = async (roleId) => {
  try {
    const response = await updateData(`${roleEndpoints.delete}/${roleId}`);
    if (response) {
      deleteRole(roleId); // Elimina el rol del estado
      return response.message; // Devuelve el mensaje del servidor
    }
  } catch (error) {
    console.error('Error al eliminar el rol:', error);
    return 'Error al eliminar el rol.'; // Mensaje de error por defecto
  }
};
