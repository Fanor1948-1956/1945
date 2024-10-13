export function openGenericForm(modalId, fields, callback, data = null) {
  const modal = document.querySelector(modalId);

  // Solo limpiar campos si no se están pasando datos (es un nuevo permiso)
  if (!data) {
    fields.forEach((field) => {
      const input = modal.querySelector(`#${field.id}`);
      input.value = ''; // Limpia el campo para un nuevo permiso
    });
  } else {
    // Si hay datos, asignar a los inputs
    fields.forEach((field) => {
      const input = modal.querySelector(`#${field.id}`);
      input.value = data[field.name] || ''; // Asigna el valor correspondiente
    });
  }

  modal.style.display = 'block'; // Abrir el modal

  const saveButton = modal.querySelector('#saveGenericBtn');

  // Manejo de evento para el botón guardar
  saveButton.onclick = async () => {
    const data = {};
    let isValid = true;

    fields.forEach((field) => {
      const input = modal.querySelector(`#${field.id}`);
      const value = input.value.trim();
      data[field.name] = value;
      if (!value) {
        isValid = false;
        showSnackbar(`${field.label} no puede estar vacío.`, false);
      }
    });

    if (!isValid) return; // No continuar si los campos están vacíos

    const response = await callback(data);

    if (response) {
      closeGenericForm(modalId);
      return true; // Indica éxito
    } else {
      showSnackbar('Error en la operación', false);
      return false; // Indica fallo
    }
  };
}

// Cerrar el formulario
export function closeGenericForm(modalId) {
  const modal = document.querySelector(modalId);
  modal.style.display = 'none'; // Cerrar el modal
}
