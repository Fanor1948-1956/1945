
import { fetchAndRenderData } from "../api/common/apiUserManager.js";
import { profileEndpoints } from "../config/apiEndpoints.js";
import {  setState } from "../reducers/state.js";




export const loadUserProfile = async () => {
  try {
    const data = await fetchAndRenderData(profileEndpoints.get);
    if (data && data.user) {
      setState({ profile: data.user }); 
      return data.user; 
    } else {
      throw new Error("No se encontró el objeto user en la respuesta.");
    }
  } catch (error) {
    console.error("Error al obtener el perfil del usuario:", error);
    throw error; 
  }
};
