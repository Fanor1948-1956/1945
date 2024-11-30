let state = {
  permissions: [],
  users: [],
  roles: [],
  profile: {},
  specialties: [],
  uploads: [],
  schedules: [],
  tems: [],
};

export const getState = () => state;

export const setState = (newState) => {
  state = { ...state, ...newState };
};

// Función para resetear el estado
export const resetState = () => {
  state = {
    permissions: [],
    users: [],
    roles: [],
    profile: {},
    specialties: [],
    schedules: [],
    uploads: [],
    tems: [],
  };
};
