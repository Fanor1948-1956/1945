// permissionReducer.js
import { setState, getState } from './state.js';

// Cargar permisos en el estado array
export const loadPermissions = (permissionsResponse) => {
  if (Array.isArray(permissionsResponse.permissions)) {
    setState({ permissions: permissionsResponse.permissions }); // Asigna correctamente el array de permisos
    console.log('Estado después de cargar permisos:', getState());
  } else{
    console.error(
      'loadPermissions: La respuesta no contiene un array de permisos',
      permissionsResponse
    );
  }
}

// Agregar un nuevo permiso
export const addPermission = (newPermission) => {
  const currentState = getState();
  setState({ permissions: [...currentState.permissions, newPermission] });
};

// Actualizar un permiso existente
export const updatePermission = (updatedPermission) => {
  const currentState = getState();
  const updatedPermissions = currentState.permissions.map((permission) =>
    permission._id === updatedPermission._id ? updatedPermission : permission
  );
  setState({ permissions: updatedPermissions });
};
// Eliminar un permiso
export const deletePermission = (permissionId) => {
  const currentState = getState();
  const updatedPermissions = currentState.permissions.filter(
    (permission) => permission._id !== permissionId
  );
  setState({ permissions: updatedPermissions });
};