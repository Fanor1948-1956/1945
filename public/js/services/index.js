import {
  registerData,
  updateData,
  fetchAndRenderData,
  deleteData,
  deactivateData,
  activateData,
} from '../api/apiUserManager.js';

export const fetchServices = async (itemEndpoints, loadItems) => {
  try {
    const response = await fetchAndRenderData(itemEndpoints.list);
    console.log('response', response);

    // Llama a loaditemes con la respuesta completa
    loadItems(response); // Carga los itemes en el estado
  } catch (error) {
    console.error('Error al obtener items:', error);
  }
};

// Crear un nuevo item
export const createService = async (newItem, itemEndpoints, addItem) => {
  try {
    const response = await registerData(itemEndpoints.create, newItem); // Llama a tu función de registro
    if (response) {
      addItem(response); // Agrega el nuevo item al estado
      return response.message; // Devuelve el mensaje del servidor
    }
  } catch (error) {
    console.error('Error al crear el item:', error);
    return 'Error al crear el item.'; // Mensaje de error por defecto
  }
};

// Actualizar un item existente
export const updateService = async (
  updatedService,
  itemEndpoints,
  updateItem
) => {
  try {
    const response = await updateData(
      `${itemEndpoints.update}/${updatedService._id}`, // Asume que el endpoint de actualización requiere el ID
      updatedService
    );
    if (response) {
      updateItem(response); // Agrega el item actualizado al estado
      return response.message; // Devuelve el mensaje del servidor
    }
  } catch (error) {
    console.error('Error al actualizar el item:', error);
    return 'Error al actualizar el item.'; // Mensaje de error por defecto
  }
};
// Eliminar un item existente
export const deleteService = async (itemId, itemEndpoints, deleteItem) => {
  try {
    const response = await deleteData(`${itemEndpoints.delete}/${itemId}`);
    if (response) {
      deleteItem(itemId); // Elimina el item del estado
      return response.message; // Devuelve el mensaje del servidor
    }
  } catch (error) {
    console.error('Error al eliminar el item:', error);
    return 'Error al eliminar el item.'; // Mensaje de error por defecto
  }
};

// Desactivar un item existente
export const deactivateService = async (itemId, itemEndpoints) => {
  try {
    const response = await deactivateData(
      `${itemEndpoints.deactivate}/${itemId}`
    ); // Asegúrate de que el endpoint sea correcto
    if (response) {
      // Aquí podrías manejar el estado si es necesario
      return response.message; // Devuelve el mensaje del servidor
    }
  } catch (error) {
    console.error('Error al desactivar el item:', error);
    return 'Error al desactivar el item.'; // Mensaje de error por defecto
  }
};

// Activar un item existente
export const activateService = async (itemId) => {
  try {
    const response = await activateData(`${itemEndpoints.activate}/${itemId}`); // Asegúrate de que el endpoint sea correcto
    if (response) {
      // Aquí podrías manejar el estado si es necesario
      return response.message; // Devuelve el mensaje del servidor
    }
  } catch (error) {
    console.error('Error al activar el item:', error);
    return 'Error al activar el item.'; // Mensaje de error por defecto
  }
};
