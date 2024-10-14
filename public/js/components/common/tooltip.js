// scripts/tooltip.js

export function Tooltip(elements) {
  elements.forEach(function (element) {
    // Crear el div del tooltip
    const tooltipText = document.createElement('div');
    tooltipText.className = 'tooltip-text';
    tooltipText.innerText = element.getAttribute('data-tooltip');

    // Agregar el tooltip al DOM
    element.appendChild(tooltipText);

    // Mostrar tooltip al pasar el mouse
    element.addEventListener('mouseenter', function () {
      tooltipText.classList.add('tooltip-text-visible'); // Usar la clase para hacer visible el tooltip
    });

    // Ocultar tooltip al salir
    element.addEventListener('mouseleave', function () {
      tooltipText.classList.remove('tooltip-text-visible'); // Remover la clase para ocultar el tooltip
    });
  });
}
