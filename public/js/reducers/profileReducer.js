// profileReducer.js

// Acciones
const SET_PROFILE = "SET_PROFILE";

// Reducer
const profileReducer = (state, action) => {
  switch (action.type) {
    case SET_PROFILE:
      return {
        ...state,
        profile: action.payload, // Actualiza el perfil con los nuevos datos
      };
    default:
      return state; // Devuelve el estado sin cambios si no hay acción que manejar
  }
};

// Crear un action creator para establecer el perfil
export const setProfile = (profile) => ({
  type: SET_PROFILE,
  payload: profile,
});

export default profileReducer;
