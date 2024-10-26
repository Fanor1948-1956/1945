// js/services/updateProfile.js
import { updateUserProfile } from '../../services/profileService.js';
import { setState } from '../../reducers/state.js';

import { toggleFields } from '../../components/forms/formUtils.js';

export async function handleProfileUpdate(event) {
  event.preventDefault(); // Evita el envío del formulario por defecto

  // Captura los datos del formulario
  const profileData = {
    name: document.getElementById('nameInput').value,
    surnames: document.getElementById('surnamesInput').value,
    email: document.getElementById('emailInput').value,
    gender: document.getElementById('genderSelect').value,
  };

  try {
    // Actualiza el perfil usando el servicio
    const message = await updateUserProfile(profileData); // Espera el mensaje de éxito
    console.log('Perfil actualizado:', message);

    // Mostrar el mensaje en el Snackbar
    showSnackbar(message, true); // Mensaje de éxito

    // Actualiza el estado si es necesario
    setState({ profile: profileData }); // Actualiza el estado con los nuevos datos

    // Deshabilita los campos nuevamente
    toggleFields(
      ['nameInput', 'surnamesInput', 'emailInput', 'genderSelect'],
      false
    );
    document.getElementById('updateButton').style.display = 'none';
    document.getElementById('cancelButton').style.display = 'none';
    document.getElementById('editButton').style.display = 'inline-block';
  } catch (error) {
    console.error('Error al actualizar el perfil:', error);

    // Mostrar el mensaje de error en el Snackbar
    showSnackbar(
      error.message ||
        'No se pudo actualizar el perfil. Intenta de nuevo más tarde.',
      false
    ); // Mensaje de error
  }
}
