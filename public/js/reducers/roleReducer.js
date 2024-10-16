// roleReducer.js
import { setState, getState } from './state.js';


export const loadRoles = (rolesResponse) => {
  if (Array.isArray(rolesResponse.roles)) {
    setState({ roles: rolesResponse.roles }); // Asigna correctamente el array de roles
    console.log('Estado después de cargar roles:', getState());
  } else {
    console.error(
      'loadRoles: La respuesta no contiene un array de roles',
      rolesResponse
    );
  }
};

// Agregar un nuevo rol (incluyendo permisos)
// Agregar un nuevo rol (incluyendo permisos)
export const addRole = (newRole) => {
  const currentState = getState();
  // Verifica que roles sea un array antes de intentar agregar un nuevo rol
  if (Array.isArray(currentState.roles)) {
    setState({ roles: [...currentState.roles, newRole] });
  } else {
    console.error(
      'addRole: currentState.roles no es un array',
      currentState.roles
    );
  }
};

// Actualizar un rol existente (incluyendo permisos)
export const updateRole = (updatedRole) => {
  const currentState = getState();
  const updatedRoles = currentState.roles.map((role) =>
    role._id === updatedRole._id ? updatedRole : role
  );
  setState({ roles: updatedRoles });
};

// Eliminar un rol
export const deleteRole = (roleId) => {
  const currentState = getState();
  const updatedRoles = currentState.roles.filter((role) => role._id !== roleId);
  setState({ roles: updatedRoles });
};
