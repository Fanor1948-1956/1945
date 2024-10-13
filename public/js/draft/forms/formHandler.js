import { getFormData, resetForm } from './genericForm.js';
import { validateFormData } from '../validationsForm/validationsForm.js';
import { registerData } from '../js/apiUserManager.js';
import { showSnackbar } from '../js/snackbar.js';
import { loadEndpoints } from '../js/loadEndpoints.js';

// Maneja el envío del formulario para crear un nuevo permiso
export async function submitFormData(formId, resource, action, requiredFields) {
  const formData = getFormData(formId);

  const validation = validateFormData(formData, requiredFields);
  if (!validation.valid) {
    showSnackbar(validation.message, false);
    return;
  }

  const endpoint = loadEndpoints(resource, action);
  const response = await registerData(endpoint, formData);

  if (response) {
    showSnackbar('Datos guardados correctamente', true);
    resetForm(formId);
    return response;
  } else {
    showSnackbar('Error al enviar los datos', false);
  }
}
