import { permissionEndpoints, roleEndpoints } from "../config/apiEndpoints.js";
import { loadPermissions } from "../reducers/permissionReducer.js";
import { loadRoles } from "../reducers/roleReducer.js";
import { fetchAndRenderData } from "../api/common/apiUserManager.js";
// Obtener permisos desde la API
export const fetchPermissions = async () => {
  try {
    const response = await fetchAndRenderData(permissionEndpoints.list);
    loadPermissions(response); // Carga los permisos en el estado
  } catch (error) {
    console.error("Error fetching permissions:", error);
  }
};
export const fetchRoles = async () => {
  try {
    const response = await fetchAndRenderData(roleEndpoints.list);
    console.log("response", response);

    // Llama a loadRoles con la respuesta completa
    loadRoles(response); // Carga los roles en el estado
  } catch (error) {
    console.error("Error al obtener items:", error);
  }
};
