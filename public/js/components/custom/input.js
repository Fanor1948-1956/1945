export function createCustomInputs(
  inputConfigs,
  display = true, // Por defecto muestra los inputs
  layout = 'row',
  justifyContent = 'flex-start',
  alignItems = 'flex-start'
) {
  const container = document.createElement('div');

  inputConfigs.forEach((config) => {
    // Contenedor de cada campo
    const inputContent = document.createElement('div');
    inputContent.className = config.className || 'input-content'; // Clase personalizada o clase por defecto
    inputContent.style.display = display ? 'flex' : 'none';
    inputContent.style.flexDirection = config.layout || layout;
    inputContent.style.justifyContent = justifyContent;
    inputContent.style.alignItems = alignItems;

    // Creación del campo de entrada
    const input = document.createElement('input');
    input.id = config.id;
    input.name = config.name;
    input.type = config.type || 'text';
    input.placeholder = config.placeholder || '';
    input.value = config.defaultValue || '';
    input.className = 'custom-input'; // Aplicar clase de estilo al <input>
    input.disabled = config.isDisabled || false;

    // Evento de cambio, si está definido
    if (config.onChange) {
      input.addEventListener('input', config.onChange);
    }

    // Etiqueta del campo
    const label = document.createElement('label');
    label.htmlFor = config.id;
    label.innerText = config.label || '';

    // Div para mensajes de error
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';

    // Añadir elementos al contenedor del input
    inputContent.appendChild(label);
    inputContent.appendChild(input);
    inputContent.appendChild(errorDiv);

    // Agregar el contenedor completo al contenedor principal
    container.appendChild(inputContent);
  });

  return container;
}
