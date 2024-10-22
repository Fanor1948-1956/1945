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

    
    loadItems(response); 
  } catch (error) {
    console.error('Error al obtener items:', error);
  }
};


export const createRole = async (newRole, itemEndpoints, addItem) => {
  try {
    const response = await registerData(itemEndpoints.create, newRole); 
    if (response) {
      addItem(response); 
      return response.message; 
    }
  } catch (error) {
    console.error('Error al crear el item:', error);
    return 'Error al crear el rol.'; 
  }
};


export const updateRoleService = async (
  updatedRole,
  itemEndpoints,
  updateItem
) => {
  try {
    const response = await updateData(
      `${itemEndpoints.update}/${updatedRole._id}`, 
      updatedRole
    );
    if (response) {
      updateItem(response); 
      return response.message; 
    }
  } catch (error) {
    console.error('Error al actualizar el item:', error);
    return 'Error al actualizar el rol.'; 
  }
};

export const deleteRoleService = async (roleId, itemEndpoints, deleteItem) => {
  try {
    const response = await deleteData(`${itemEndpoints.delete}/${roleId}`);
    if (response) {
      deleteItem(roleId); 
      return response.message; 
    }
  } catch (error) {
    console.error('Error al eliminar el item:', error);
    return 'Error al eliminar el rol.'; 
  }
};


export const deactivateRoleService = async (roleId, itemEndpoints) => {
  try {
    const response = await deactivateData(
      `${itemEndpoints.deactivate}/${roleId}`
    ); 
    if (response) {
      
      return response.message; 
    }
  } catch (error) {
    console.error('Error al desactivar el rol:', error);
    return 'Error al desactivar el rol.'; 
  }
};


export const activateRoleService = async (roleId) => {
  try {
    const response = await activateData(`${itemEndpoints.activate}/${roleId}`); 
    if (response) {
      
      return response.message; 
    }
  } catch (error) {
    console.error('Error al activar el rol:', error);
    return 'Error al activar el rol.'; 
  }
};
