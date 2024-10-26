let state = {
  permissions: [],
  users: [],
  roles: [],
  profile: {},
  specialties: [],
  uploads: [],
  tems: [],
};

export const getState = () => state;

export const setState = (newState) => {
  state = { ...state, ...newState };
};
