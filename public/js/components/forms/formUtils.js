export const clearFormFields = (formId) => {
  const form = document.getElementById(formId);
  if (form) {
    form.reset();
  }
};

export const clearSelection = (containerId) => {
  const container = document.getElementById(containerId);
  if (container) {
    const checkboxes = container.querySelectorAll(
      'input[type="checkbox"]:checked'
    );
    checkboxes.forEach((checkbox) => (checkbox.checked = false));
  }
};

export const resetFormFields = (fieldIds) => {
  fieldIds.forEach((fieldId) => {
    const field = document.getElementById(fieldId);
    if (field) {
      field.value = '';
    }
  });
};

export const clearSelectionsAndArray = (containerId, selectedArray) => {
  clearSelection(containerId);
  selectedArray.length = 0;
};

// formUtils.js

// Función para habilitar o deshabilitar campos de un formulario
export function toggleFields(fieldIds, enabled) {
  fieldIds.forEach((id) => {
    const field = document.getElementById(id);
    if (field) {
      field.disabled = !enabled;
    }
  });
}
