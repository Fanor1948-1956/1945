// state.js
let state = {
  permissions: [],
};

const setState = (newState) => {
  state = { ...state, ...newState };
};

const getState = () => state;

export { setState, getState };
