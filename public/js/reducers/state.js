
let state = {
  permissions: [], 
  users: [],
  roles: [], 
  profile: {},
  specialties: [], 
  common: [],
  tems: [],
};


export const getState = () => state;


export const setState = (newState) => {
  state = { ...state, ...newState };
};
