import { validateForm } from './validateForm.js';
import { closeGenericForm } from './genericForm.js';
import { showSnackbar } from '../components/common/Snackbar.js';
export function handleForm(modalId, fields, callback) {
  const modal = document.querySelector(modalId);

  // Limpiar los campos del formulario antes de abrir
  fields.forEach((field) => {
    const input = modal.querySelector(`#${field.id}`);
    input.value = ''; // Asegúrate de que el campo se limpie
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

    // Ejecutar el callback con los datos del formulario
    const response = await callback(data);

    // Agregar logs para depurar
    console.log('Respuesta del callback:', response); // Agrega un log para ver la respuesta

    if (response && response.success) {
      // Verifica si la respuesta es válida
      closeGenericForm(modalId);
      showSnackbar(response.message || 'Operación realizada con éxito.', true); // Mensaje de éxito
    } else {
      showSnackbar(
        response ? response.message : 'Error en la operación',
        false
      ); // Mensaje de error
    }
  };
}
