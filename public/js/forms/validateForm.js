export function validateForm(fields) {
  let isValid = true;
  let message = '';

  fields.forEach((field) => {
    const value = document.getElementById(field.id).value.trim();
    if (!value) {
      isValid = false;
      message = `Por favor, complete el campo ${field.label}.`;
    }
  });

  return { isValid, message };
}
