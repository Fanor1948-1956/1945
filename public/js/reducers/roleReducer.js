
import { setState, getState } from './state.js';


export const loadRoles = (rolesResponse) => {
  if (Array.isArray(rolesResponse.roles)) {
    setState({ roles: rolesResponse.roles }); 
    console.log('Estado después de cargar roles:', getState());
  } else {
    console.error(
      'loadRoles: La respuesta no contiene un array de roles',
      rolesResponse
    );
  }
};



export const addRole = (newRole) => {
  const currentState = getState();
  
  if (Array.isArray(currentState.roles)) {
    setState({ roles: [...currentState.roles, newRole] });
  } else {
    console.error(
      'addRole: currentState.roles no es un array',
      currentState.roles
    );
  }
};


export const updateRole = (updatedRole) => {
  const currentState = getState();
  const updatedRoles = currentState.roles.map((role) =>
    role._id === updatedRole._id ? updatedRole : role
  );
  setState({ roles: updatedRoles });
};


export const deleteRole = (roleId) => {
  const currentState = getState();
  const updatedRoles = currentState.roles.filter((role) => role._id !== roleId);
  setState({ roles: updatedRoles });
};
