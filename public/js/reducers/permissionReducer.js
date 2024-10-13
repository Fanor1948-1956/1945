// permissionReducer.js
import { setState, getState } from './state.js';

// Cargar permisos en el estado
export const loadPermissions = (permissions) => {
  setState({ permissions });
};

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
