// form.js
import { apiFetch } from './api.js';

export async function handleFormSubmit(url, id, data, onSuccess) {
  try {
    const method = id ? 'PUT' : 'POST';
    const finalUrl = id ? `${url}/${id}` : url;
    await apiFetch(finalUrl, method, data);
    onSuccess();
  } catch (error) {
    console.error('Error en la solicitud del formulario:', error);
    showSnackbar('Error al guardar los datos', false);
  }
}
