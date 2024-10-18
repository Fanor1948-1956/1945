// formUtils.js

/**
 * Limpia todos los campos de texto de un formulario dado.
 * @param {string} formId - ID del formulario que se desea limpiar.
 */
export const clearFormFields = (formId) => {
  const form = document.getElementById(formId);
  if (form) {
    form.reset();
  }
};

/**
 * Limpia una selección específica, como checkboxes o radios, en un contenedor.
 * @param {string} containerId - ID del contenedor donde están los inputs seleccionables.
 */
export const clearSelection = (containerId) => {
  const container = document.getElementById(containerId);
  if (container) {
    const checkboxes = container.querySelectorAll(
      'input[type="checkbox"]:checked'
    );
    checkboxes.forEach((checkbox) => (checkbox.checked = false));
  }
};

/**
 * Resetea campos específicos de un formulario, como los campos de texto.
 * @param {Array} fieldIds - Lista de IDs de los campos de texto que se desean resetear.
 */
export const resetFormFields = (fieldIds) => {
  fieldIds.forEach((fieldId) => {
    const field = document.getElementById(fieldId);
    if (field) {
      field.value = '';
    }
  });
};

/**
 * Limpia todas las selecciones (checkboxes, radios, etc.) en un contenedor y actualiza un array de seleccionados.
 * @param {string} containerId - ID del contenedor donde están los inputs seleccionables.
 * @param {Array} selectedArray - Array donde se almacenan los elementos seleccionados.
 */
export const clearSelectionsAndArray = (containerId, selectedArray) => {
  clearSelection(containerId);
  selectedArray.length = 0; // Vacía el array de seleccionados
};
