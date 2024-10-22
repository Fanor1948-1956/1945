
import { setState, getState } from './state.js';


export const loadPermissions = (permissionsResponse) => {
  if (Array.isArray(permissionsResponse.permissions)) {
    setState({ permissions: permissionsResponse.permissions }); 
    console.log('Estado después de cargar permisos:', getState());
  } else{
    console.error(
      'loadPermissions: La respuesta no contiene un array de permisos',
      permissionsResponse
    );
  }
}


export const addPermission = (newPermission) => {
  const currentState = getState();
  setState({ permissions: [...currentState.permissions, newPermission] });
};


export const updatePermission = (updatedPermission) => {
  const currentState = getState();
  const updatedPermissions = currentState.permissions.map((permission) =>
    permission._id === updatedPermission._id ? updatedPermission : permission
  );
  setState({ permissions: updatedPermissions });
};

export const deletePermission = (permissionId) => {
  const currentState = getState();
  const updatedPermissions = currentState.permissions.filter(
    (permission) => permission._id !== permissionId
  );
  setState({ permissions: updatedPermissions });
};