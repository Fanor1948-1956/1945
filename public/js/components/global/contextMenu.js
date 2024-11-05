// Almacenar el tema elegido por el usuario
function saveTheme(theme) {
  localStorage.setItem('theme', theme);
}

// Aplicar el tema almacenado
function applyTheme() {
  const theme = localStorage.getItem('theme');
  if (theme) {
    document.body.classList.add(theme);
  }
}

document.addEventListener('DOMContentLoaded', applyTheme);

let currentElement; // Elemento actualmente seleccionado
let isDragging = false; // Indica si el elemento está en modo de arrastre
let initialX = 0,
  initialY = 0; // Posición inicial del ratón al arrastrar
let currentX = 0,
  currentY = 0; // Desplazamiento actual

// Crear un elemento para mostrar las coordenadas
const coordinatesDisplay = document.createElement('div');
coordinatesDisplay.style.position = 'fixed';
coordinatesDisplay.style.bottom = '10px';
coordinatesDisplay.style.right = '10px';
coordinatesDisplay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
coordinatesDisplay.style.color = 'white';
coordinatesDisplay.style.padding = '5px';
coordinatesDisplay.style.borderRadius = '5px';
document.body.appendChild(coordinatesDisplay);

// Crear el menú contextual
const contextMenu = document.createElement('div');
contextMenu.className = 'context-menu';
contextMenu.style.position = 'absolute';
contextMenu.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
contextMenu.style.padding = '10px';
contextMenu.style.borderRadius = '5px';
contextMenu.style.display = 'none';
document.body.appendChild(contextMenu);

// Opciones del menú contextual con submenús
const options = [
  { label: 'Copiar', action: copyElement },
  {
    label: 'Alinear',
    subOptions: [
      { label: 'Izquierda', action: () => setTextAlign('left') },
      { label: 'Centro', action: () => setTextAlign('center') },
      { label: 'Derecha', action: () => setTextAlign('right') },
    ],
  },
  {
    label: 'Color',
    subOptions: [
      { label: 'Fondo', action: () => changeColor('backgroundColor') },
      { label: 'Texto', action: () => changeColor('color') },
    ],
  },
  { label: 'Mover/Reacomodar', action: enableDragMode },
  { label: 'Eliminar', action: removeElement },
];
// Función para eliminar el elemento seleccionado
function removeElement() {
  if (currentElement) {
    currentElement.remove(); // Elimina el elemento seleccionado del DOM
    currentElement = null; // Reinicia la variable para que no siga apuntando a un elemento eliminado
  }
}

// Función para crear los elementos del menú contextual
function createMenu(options, parentMenu) {
  options.forEach((option) => {
    const item = document.createElement('div');
    item.innerText = option.label;
    item.style.padding = '8px 12px';
    item.style.cursor = 'pointer';
    item.style.color = '#fff';
    item.style.position = 'relative';

    if (option.subOptions) {
      const subMenu = document.createElement('div');
      subMenu.style.position = 'absolute';
      subMenu.style.left = '100%';
      subMenu.style.top = '0';
      subMenu.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
      subMenu.style.padding = '5px';
      subMenu.style.borderRadius = '5px';
      subMenu.style.display = 'none';

      createMenu(option.subOptions, subMenu);
      item.appendChild(subMenu);

      item.addEventListener('mouseenter', () => {
        subMenu.style.display = 'block';
      });

      item.addEventListener('mouseleave', () => {
        subMenu.style.display = 'none';
      });
    } else {
      item.addEventListener('click', () => {
        contextMenu.style.display = 'none';
        option.action();
      });
    }

    parentMenu.appendChild(item);
  });
}

// Crear el menú contextual inicial
createMenu(options, contextMenu);

// Mostrar el menú contextual
document.addEventListener('contextmenu', (event) => {
  event.preventDefault();
  currentElement = event.target;
  if (currentElement) {
    contextMenu.style.display = 'block';
    contextMenu.style.left = `${event.pageX}px`;
    contextMenu.style.top = `${event.pageY}px`;
  }
});

// Ocultar el menú al hacer clic en cualquier otro lugar
window.addEventListener('click', () => {
  contextMenu.style.display = 'none';
});

// Función para copiar el elemento
function copyElement() {
  if (currentElement) {
    const clone = currentElement.cloneNode(true);
    document.body.appendChild(clone);
    clone.style.position = 'absolute';
    clone.style.left = `${parseInt(currentElement.style.left || 0) + 10}px`;
    clone.style.top = `${parseInt(currentElement.style.top || 0) + 10}px`;
  }
}

// Función para establecer alineación
function setTextAlign(alignment) {
  if (currentElement) {
    currentElement.style.textAlign = alignment;
  }
}

// Función genérica para cambiar color de fondo o de texto
function changeColor(type) {
  const colorPicker = document.createElement('input');
  colorPicker.type = 'color';
  colorPicker.value =
    localStorage.getItem(type) ||
    (type === 'backgroundColor' ? '#ffffff' : '#000000');

  colorPicker.addEventListener('input', () => {
    if (currentElement) {
      currentElement.style[type] = colorPicker.value;
      localStorage.setItem(type, colorPicker.value);
      applyStoredColors();
    }
  });
  colorPicker.click();
}

// Aplicar colores guardados al cargar la página
function applyStoredColors() {
  const editableElements = document.querySelectorAll(
    '[contenteditable="true"]'
  );
  const bgColor = localStorage.getItem('backgroundColor');
  const textColor = localStorage.getItem('color');

  editableElements.forEach((element) => {
    if (bgColor) element.style.backgroundColor = bgColor;
    if (textColor) element.style.color = textColor;
  });
}

document.addEventListener('DOMContentLoaded', applyStoredColors);

// Habilitar el modo de arrastre
function enableDragMode() {
  if (currentElement) {
    isDragging = true;
    initialX = event.clientX;
    initialY = event.clientY;

    if (
      !currentElement.style.position ||
      currentElement.style.position === 'static'
    ) {
      currentElement.style.position = 'relative';
    }

    currentElement.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
    currentElement.style.zIndex = '1000';

    document.addEventListener('mousemove', dragElement);
    document.addEventListener('mouseup', stopDrag);
  }
}

// Función para arrastrar el elemento usando `transform: translate()`
function dragElement(event) {
  if (isDragging && currentElement) {
    const deltaX = event.clientX - initialX;
    const deltaY = event.clientY - initialY;

    currentX += deltaX;
    currentY += deltaY;

    currentElement.style.transform = `translate(${currentX}px, ${currentY}px)`;
    coordinatesDisplay.innerText = `X: ${currentX}px, Y: ${currentY}px`;

    initialX = event.clientX;
    initialY = event.clientY;
  }
}

// Detener el arrastre y quitar la sombra de elevación
function stopDrag() {
  if (isDragging) {
    isDragging = false;
    currentElement.style.boxShadow = '';
    currentElement.style.zIndex = '';

    document.removeEventListener('mousemove', dragElement);
    document.removeEventListener('mouseup', stopDrag);
  }
}
