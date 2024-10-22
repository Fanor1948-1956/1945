
export function getFormData(formId) {
  const form = document.getElementById(formId);
  const formData = new FormData(form);
  let formValues = {};

  for (let [key, value] of formData.entries()) {
    formValues[key] = value.trim();
  }

  return formValues;
}


export function resetForm(formId) {
  document.getElementById(formId).reset();
}
