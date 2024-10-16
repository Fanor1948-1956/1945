// permissionService.js
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
    console.error("Error creando permiso:", error);
    return "Error al crear el permiso."; // Mensaje de error por defecto
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
    console.error("Error actualizando permiso:", error);
    return "Error al actualizar el permiso."; // Mensaje de error por defecto
  }
};
// Eliminar un permiso existente
export const deletePermissionService = async (permissionId) => {
  try {
    const response = await deleteData(
      `${permissionEndpoints.delete}/${permissionId}`
    );
    if (response) {
      // Elimina el permiso del estado
      return response.message; // Devuelve el mensaje del servidor
    }
  } catch (error) {
    console.error("Error eliminando permiso:", error);
    return "Error al eliminar el permiso."; // Mensaje de error por defecto
  }
};
