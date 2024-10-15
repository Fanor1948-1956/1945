// state.js
let state = {
  permissions: [], // Lista de permisos
  roles: [], // Lista de roles del usuario
profile:{}
};

// Obtener el estado actual
export const getState = () => state;

// Actualizar el estado
export const setState = (newState) => {
  state = { ...state, ...newState };
};
