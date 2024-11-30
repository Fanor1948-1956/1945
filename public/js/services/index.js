import {
  registerData,
  updateData,
  fetchAndRenderData,
  deleteData,
  deactivateData,
  activateData,
} from "../api/common/apiUserManager.js";

export const fetchServices = async (itemEndpoints, loadItems) => {
  try {
    const response = await fetchAndRenderData(itemEndpoints.list);
    console.log("response", response);

    
    loadItems(response); 
  } catch (error) {
    console.error("Error al obtener items:", error);
  }
};


export const createService = async (newItem, itemEndpoints, addItem) => {
  try {
    const response = await registerData(itemEndpoints.create, newItem); 
    if (response) {
      addItem(response); 
      return response.message; 
    }
  } catch (error) {
    console.error("Error al crear el item:", error);
    return "Error al crear el item."; 
  }
};


export const updateService = async (
  updatedService,
  itemEndpoints,
  updateItem
) => {
  try {
    const response = await updateData(
      `${itemEndpoints.update}/${updatedService._id}`, 
      updatedService
    );
    if (response) {
      updateItem(response); 
      return response.message; 
    }
  } catch (error) {
    console.error("Error al actualizar el item:", error);
    return "Error al actualizar el item."; 
  }
};

export const deleteService = async (itemId, itemEndpoints, deleteItem) => {
  try {
    const response = await deleteData(`${itemEndpoints.delete}/${itemId}`);
    if (response) {
      deleteItem(itemId); 
      return response.message; 
    }
  } catch (error) {
    console.error("Error al eliminar el item:", error);
    return "Error al eliminar el item."; 
  }
};


export const deactivateService = async (itemId, itemEndpoints) => {
  try {
    const response = await deactivateData(
      `${itemEndpoints.deactivate}/${itemId}`
    ); 
    if (response) {
      
      return response.message; 
    }
  } catch (error) {
    console.error("Error al desactivar el item:", error);
    return "Error al desactivar el item."; 
  }
};


export const activateService = async (itemId) => {
  try {
    const response = await activateData(`${itemEndpoints.activate}/${itemId}`); 
    if (response) {
      
      return response.message; 
    }
  } catch (error) {
    console.error("Error al activar el item:", error);
    return "Error al activar el item."; 
  }
};
