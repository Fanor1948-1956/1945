// profileService.js
import {
  fetchAndRenderData,
  registerData,
} from '../api/common/apiUserManager.js';
import { profileEndpoints } from '../config/apiEndpoints.js';
import { setState } from '../reducers/state.js';

// Servicio para obtener el perfil
export const loadUserProfile = async () => {
  try {
    const response = await fetchAndRenderData(profileEndpoints.get);
    console.log('Perfil obtenido:', response);

    setState({ profile: response }); // Actualiza el estado con el perfil
    return response.user;
  } catch (error) {
    console.error('Error al obtener el perfil:', error);
    throw error;
  }
};

// Servicio para actualizar el perfil
// Servicio para actualizar el perfil
export const updateUserProfile = async (profileData) => {
  try {
    const response = await registerData(profileEndpoints.update, profileData);
    if (response && response.message) {
      setState({ profile: response.user }); // Actualiza el estado con el nuevo perfil
      return response.message; // Retorna el mensaje de éxito
    } else {
      throw new Error('No se pudo obtener un mensaje de respuesta.');
    }
  } catch (error) {
    // Aquí puedes lanzar un error específico si es necesario
    throw new Error(
      error.message || 'Error desconocido al actualizar el perfil.'
    );
  }
};
