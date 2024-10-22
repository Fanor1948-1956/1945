


const SET_PROFILE = "SET_PROFILE";


const profileReducer = (state, action) => {
  switch (action.type) {
    case SET_PROFILE:
      return {
        ...state,
        profile: action.payload, 
      };
    default:
      return state; 
  }
};


export const setProfile = (profile) => ({
  type: SET_PROFILE,
  payload: profile,
});

export default profileReducer;
