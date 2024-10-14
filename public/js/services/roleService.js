import {
  registerData,
  updateData,
  fetchAndRenderData,
  deleteData,
  deactivateData,
  activateData,
} from '../api/apiUserManager.js';

export const fetchRoles = async (itemEndpoints, loadItems) => {
  try {
    const response = await fetchAndRenderData(itemEndpoints.list);
    console.log('response', response);

    // Llama a loadRoles con la respuesta completa
    loadItems(response); // Carga los roles en el estado
  } catch (error) {
    console.error('Error al obtener items:', error);
  }
};

// Crear un nuevo rol
export const createRole = async (newRole, itemEndpoints, addItem) => {
  try {
    const response = await registerData(itemEndpoints.create, newRole); // Llama a tu función de registro
    if (response) {
      addItem(response); // Agrega el nuevo rol al estado
      return response.message; // Devuelve el mensaje del servidor
    }
  } catch (error) {
    console.error('Error al crear el item:', error);
    return 'Error al crear el rol.'; // Mensaje de error por defecto
  }
};

// Actualizar un rol existente
export const updateRoleService = async (
  updatedRole,
  itemEndpoints,
  updateItem
) => {
  try {
    const response = await updateData(
      `${itemEndpoints.update}/${updatedRole._id}`, // Asume que el endpoint de actualización requiere el ID
      updatedRole
    );
    if (response) {
      updateItem(response); // Agrega el rol actualizado al estado
      return response.message; // Devuelve el mensaje del servidor
    }
  } catch (error) {
    console.error('Error al actualizar el item:', error);
    return 'Error al actualizar el rol.'; // Mensaje de error por defecto
  }
};
// Eliminar un rol existente
export const deleteRoleService = async (itemId, itemEndpoints, deleteItem) => {
  try {
    const response = await deleteData(`${itemEndpoints.delete}/${itemId}`);
    if (response) {
      deleteItem(itemId); // Elimina el rol del estado
      return response.message; // Devuelve el mensaje del servidor
    }
  } catch (error) {
    console.error('Error al eliminar el item:', error);
    return 'Error al eliminar el rol.'; // Mensaje de error por defecto
  }
};

// Desactivar un rol existente
export const deactivateRoleService = async (itemId, itemEndpoints) => {
  try {
    const response = await deactivateData(
      `${itemEndpoints.deactivate}/${itemId}`
    ); // Asegúrate de que el endpoint sea correcto
    if (response) {
      // Aquí podrías manejar el estado si es necesario
      return response.message; // Devuelve el mensaje del servidor
    }
  } catch (error) {
    console.error('Error al desactivar el rol:', error);
    return 'Error al desactivar el rol.'; // Mensaje de error por defecto
  }
};

// Activar un rol existente
export const activateRoleService = async (itemId) => {
  try {
    const response = await activateData(`${itemEndpoints.activate}/${itemId}`); // Asegúrate de que el endpoint sea correcto
    if (response) {
      // Aquí podrías manejar el estado si es necesario
      return response.message; // Devuelve el mensaje del servidor
    }
  } catch (error) {
    console.error('Error al activar el rol:', error);
    return 'Error al activar el rol.'; // Mensaje de error por defecto
  }
};
