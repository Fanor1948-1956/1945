
import {
  registerData,
  updateData,
  fetchAndRenderData,
} from "../api/common/apiUserManager.js";
import {
  loadPermissions,
  addPermission,
  updatePermission,
} from "../reducers/permissionReducer.js";
import { permissionEndpoints } from "../config/apiEndpoints.js";


export const createPermission = async (newPermission) => {
  try {
    const response = await registerData(
      permissionEndpoints.create,
      newPermission
    ); 
    if (response) {
      addPermission(response); 
      return response.message; 
    }
  } catch (error) {
    console.error("Error creando permiso:", error);
    return "Error al crear el permiso."; 
  }
};


export const updatePermissionService = async (updatedPermission) => {
  try {
    const response = await updateData(
      `${permissionEndpoints.update}/${updatedPermission._id}`, 
      updatedPermission
    );
    if (response) {
      updatePermission(response); 
      return response.message; 
    }
  } catch (error) {
    console.error("Error actualizando permiso:", error);
    return "Error al actualizar el permiso."; 
  }
};

export const deletePermissionService = async (permissionId) => {
  try {
    const response = await deleteData(
      `${permissionEndpoints.delete}/${permissionId}`
    );
    if (response) {
      
      return response.message; 
    }
  } catch (error) {
    console.error("Error eliminando permiso:", error);
    return "Error al eliminar el permiso."; 
  }
};
