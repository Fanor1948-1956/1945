// reducer.js
const actionTypes = {
  SET_USER: 'SET_USER',
  SET_SCHEDULES: 'SET_SCHEDULES',
};

export const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return { ...state, user: action.payload };
    case actionTypes.SET_SCHEDULES:
      return { ...state, schedules: action.payload };
    default:
      return state;
  }
};

export const setUser = (user) => ({
  type: actionTypes.SET_USER,
  payload: user,
});

export const setSchedules = (schedules) => ({
  type: actionTypes.SET_SCHEDULES,
  payload: schedules,
});
