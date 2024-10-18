/**
 * Función para generar formularios dinámicamente, incluyendo arrays de campos.
 * @param {Array} fields - Lista de campos con su configuración.
 * @param {string} formId - ID del formulario donde se va a renderizar.
 */
function generateForm(fields, formId) {
  const form = document.getElementById(formId);
  form.innerHTML = ''; // Limpiar el formulario existente

  fields.forEach((field) => {
    // Crear el contenedor de cada campo
    const fieldWrapper = document.createElement('div');
    fieldWrapper.classList.add('form-group');

    // Crear la etiqueta del campo
    const label = document.createElement('label');
    label.setAttribute('for', field.id);
    label.textContent = field.label;
    fieldWrapper.appendChild(label);

    // Crear el input o el tipo de elemento correspondiente
    let inputElement;

    if (field.type === 'textarea') {
      inputElement = document.createElement('textarea');
    } else if (field.type === 'array') {
      inputElement = createArrayField(field, formId); // Generar campos tipo array
    } else {
      inputElement = document.createElement('input');
      inputElement.setAttribute('type', field.type || 'text');
    }

    inputElement.id = field.id;
    inputElement.name = field.name;
    if (field.required) {
      inputElement.required = true;
    }
    if (field.placeholder) {
      inputElement.placeholder = field.placeholder;
    }

    // Añadir el input al contenedor del campo
    fieldWrapper.appendChild(inputElement);
    form.appendChild(fieldWrapper);
  });

  // Añadir el botón de guardar al final del formulario
  const saveButton = document.createElement('button');
  saveButton.type = 'button';
  saveButton.textContent = 'Guardar';
  saveButton.id = 'saveItemBtn';
  form.appendChild(saveButton);
}

/**
 * Función para crear campos de tipo array.
 * @param {Object} field - Configuración del campo de tipo array.
 * @param {string} formId - ID del formulario donde se va a renderizar.
 */
function createArrayField(field, formId) {
  const arrayWrapper = document.createElement('div');
  arrayWrapper.classList.add('array-wrapper');

  field.values.forEach((value, index) => {
    const arrayFieldWrapper = document.createElement('div');
    arrayFieldWrapper.classList.add('array-field-wrapper');

    const inputElement = document.createElement('input');
    inputElement.setAttribute('type', field.subtype || 'text');
    inputElement.value = value || '';
    inputElement.name = `${field.name}[${index}]`; // Nombre para array
    inputElement.id = `${field.id}_${index}`;

    const removeButton = document.createElement('button');
    removeButton.textContent = '-';
    removeButton.type = 'button';
    removeButton.addEventListener('click', () => {
      arrayFieldWrapper.remove();
    });

    arrayFieldWrapper.appendChild(inputElement);
    arrayFieldWrapper.appendChild(removeButton);
    arrayWrapper.appendChild(arrayFieldWrapper);
  });

  // Botón para agregar más campos
  const addButton = document.createElement('button');
  addButton.type = 'button';
  addButton.textContent = 'Agregar otro';
  addButton.addEventListener('click', () => {
    const newIndex = arrayWrapper.querySelectorAll('input').length;
    const newInputWrapper = document.createElement('div');
    newInputWrapper.classList.add('array-field-wrapper');

    const newInput = document.createElement('input');
    newInput.setAttribute('type', field.subtype || 'text');
    newInput.name = `${field.name}[${newIndex}]`;
    newInput.id = `${field.id}_${newIndex}`;

    const removeButton = document.createElement('button');
    removeButton.textContent = '-';
    removeButton.type = 'button';
    removeButton.addEventListener('click', () => {
      newInputWrapper.remove();
    });

    newInputWrapper.appendChild(newInput);
    newInputWrapper.appendChild(removeButton);
    arrayWrapper.appendChild(newInputWrapper);
  });

  arrayWrapper.appendChild(addButton);
  return arrayWrapper;
}

// Exportar las funciones
export { generateForm };
