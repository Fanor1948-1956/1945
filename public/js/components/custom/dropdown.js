// customDropdown.js
export function createCustomDropdown(config) {
  const select = document.createElement('select');
  select.id = config.id;
  select.name = config.name;
  select.className = config.className || 'custom-dropdown'; // Aplicar clase personalizada
  select.disabled = config.isDisabled || false;

  // Agregar opciones
  config.options.forEach((option) => {
    const optionElement = document.createElement('option');
    optionElement.value = option.value;
    optionElement.textContent = option.label;
    select.appendChild(optionElement);
  });

  select.value = config.defaultValue || config.options[0].value;

  // Agregar evento de cambio si existe
  if (config.onChange) {
    select.addEventListener('change', config.onChange);
  }

  return select;
}
