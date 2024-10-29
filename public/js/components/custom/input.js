// customInput.js
export function createCustomInputs(inputConfigs) {
  const container = document.createElement('div');

  inputConfigs.forEach((config) => {
    const input = document.createElement('input');
    input.id = config.id;
    input.name = config.name;
    input.type = config.type || 'text';
    input.placeholder = config.placeholder || '';
    input.value = config.defaultValue || '';
    input.className = config.className || 'custom-input'; // Aplicar clase personalizada
    input.disabled = config.isDisabled || false;

    // Evento de cambio, si está definido
    if (config.onChange) {
      input.addEventListener('input', config.onChange);
    }

    // Crear label
    const label = document.createElement('label');
    label.htmlFor = config.id;
    label.innerText = config.label || '';

    // Crear un div para errores
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message'; // Aplicar clase personalizada para errores

    // Contenedor del input y el mensaje de error
    const inputContent = document.createElement('div');
    inputContent.className = 'input-content'; // Aplicar clase al contenedor

    inputContent.appendChild(label);
    inputContent.appendChild(input);
    inputContent.appendChild(errorDiv); // Agregar div de error debajo del input
    container.appendChild(inputContent); // Agregar contenedor principal
  });

  return container;
}
