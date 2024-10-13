import { validateForm } from './validateForm.js';
import { closeGenericForm } from './genericForm.js';
import { showSnackbar } from '../components/common/Snackbar.js';

export function handleForm(modalId, fields, callback, endpoint) {
  const modal = document.querySelector(modalId);

  // Limpiar los campos del formulario antes de abrir
  fields.forEach((field) => {
    const input = modal.querySelector(`#${field.id}`);
    input.value = '';
  });

  modal.style.display = 'block'; // Mostrar el modal

  const saveButton = modal.querySelector('#saveGenericBtn');

  // Validar y enviar los datos
  saveButton.onclick = async () => {
    const validation = validateForm(fields);

    if (!validation.isValid) {
      showSnackbar(validation.message, false);
      return;
    }

    // Obtener los datos del formulario
    const data = {};
    fields.forEach((field) => {
      const input = modal.querySelector(`#${field.id}`);
      data[field.name] = input.value.trim();
    });

    // Ejecutar el callback con los datos del formulario y el endpoint
    const response = await callback(data, endpoint);

    if (response) {
      closeGenericForm(modalId);
      showSnackbar('Operación realizada con éxito', true);
    } else {
      showSnackbar('Error en la operación', false);
    }
  };
}
