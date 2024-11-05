// Funciones para guardar y aplicar el tema
function saveTheme(theme) {
  localStorage.setItem('theme', theme);
}

function applyTheme() {
  const theme = localStorage.getItem('theme');
  if (theme) {
    document.body.classList.add(theme);
  }
}

document.addEventListener('DOMContentLoaded', applyTheme);

// Variables globales
let currentElement;
let isDragging = false;
let initialX = 0,
  initialY = 0;
let currentX = 0,
  currentY = 0;

// Crear elemento para mostrar coordenadas
const coordinatesDisplay = document.createElement('div');
coordinatesDisplay.style.position = 'fixed';
coordinatesDisplay.style.bottom = '10px';
coordinatesDisplay.style.right = '10px';
coordinatesDisplay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
coordinatesDisplay.style.color = 'white';
coordinatesDisplay.style.padding = '5px';
coordinatesDisplay.style.borderRadius = '5px';
document.body.appendChild(coordinatesDisplay);

// Crear menú contextual y opciones
const contextMenu = document.createElement('div');
contextMenu.className = 'context-menu';
document.body.appendChild(contextMenu);

// Opciones del menú
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
    label: 'Distribución',
    subOptions: [
      { label: 'Inicio', action: () => setJustifyContent('flex-start') },
      { label: 'Centrado', action: () => setJustifyContent('center') },
      { label: 'Final', action: () => setJustifyContent('flex-end') },
      {
        label: 'Espaciado Entre',
        action: () => setJustifyContent('space-between'),
      },
    ],
  },
  {
    label: 'Color',
    subOptions: [
      { label: 'Fondo', action: () => changeColor('backgroundColor') },
      { label: 'Texto', action: () => changeColor('color') },
    ],
  },
  {
    label: 'Ver',
    subOptions: [
      {
        label: 'PDF',
        action: () => openLink('http://ejemplo.com/document.pdf'),
      },
      {
        label: 'Imagen',
        action: () => openLink('http://ejemplo.com/image.png'),
      },
    ],
  },
  {
    label: 'Descargar',
    subOptions: [
      { label: 'Imagen', action: downloadImage },
      { label: 'PDF', action: downloadPDF },
      { label: 'Word', action: downloadWord },
      { label: 'Excel', action: downloadExcel },
    ],
  },
  { label: 'Subir', action: uploadFile },
  { label: 'Mover/Reacomodar', action: enableDragMode },
  { label: 'Eliminar', action: removeElement },
  {
    label: 'Abrir Enlace',
    subOptions: [
      {
        label: ' en nueva pestaña',
        action: () => openLink(getCurrentPath()),
      },
      {
        label: ' en nueva ventana',
        action: () => openLink(getCurrentPath(), true),
      },
    ],
  },
  { label: 'Actualizar', action: () => location.reload() },
];

// Crear los elementos del menú con submenús
function createMenu(options, parent) {
  options.forEach((option) => {
    const item = document.createElement('div');
    item.innerText = option.label;
    item.style.padding = '8px 12px';
    item.style.cursor = 'pointer';
    item.style.color = '#fff';
    item.style.position = 'relative'; // Para permitir el posicionamiento de submenús

    // Añadir flecha para submenús
    if (option.subOptions) {
      const arrow = document.createElement('span');
      arrow.innerText = ' ▶'; // Puedes cambiar esto por un icono si prefieres
      arrow.style.fontSize = '0.8em';
      arrow.style.marginLeft = '5px'; // Espacio entre texto y flecha
      item.appendChild(arrow);

      const subMenu = document.createElement('div');
      subMenu.className = 'sub-menu';
      subMenu.style.display = 'none';
      subMenu.style.position = 'absolute';
      subMenu.style.left = '100%'; // Mover submenú a la derecha
      subMenu.style.top = '0';
      subMenu.style.backgroundColor = '#333';
      subMenu.style.zIndex = '1000'; // Asegurarse que esté por encima
      subMenu.style.minWidth = '150px'; // Ancho mínimo del submenú
      subMenu.style.borderRadius = '5px'; // Bordes redondeados

      option.subOptions.forEach((subOption) => {
        const subItem = document.createElement('div');
        subItem.innerText = subOption.label;
        subItem.style.padding = '8px 12px';
        subItem.style.cursor = 'pointer';
        subItem.style.color = '#fff';
        subItem.style.display = 'flex'; // Usar flex para aplicar justify-between
        item.style.justifyContent = 'space-between';
        item.style.alignItems = 'center';

        item.style.whiteSpace = 'nowrap';
        ertb;
        item.style.textOverflow = 'ellipsis';

        subItem.addEventListener('click', (event) => {
          event.stopPropagation(); // Para evitar que se cierre el menú principal
          contextMenu.style.display = 'none';
          subOption.action();
        });

        subMenu.appendChild(subItem);
      });

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

    parent.appendChild(item);
  });
}

createMenu(options, contextMenu);

// Mostrar menú contextual
document.addEventListener('contextmenu', (event) => {
  event.preventDefault();
  currentElement = event.target;
  if (currentElement) {
    contextMenu.style.display = 'block';
    contextMenu.style.left = `${event.pageX}px`;
    contextMenu.style.top = `${event.pageY}px`;
  }
});

window.addEventListener('click', () => {
  contextMenu.style.display = 'none';
});

// Funciones de acciones
function copyElement() {
  if (currentElement) {
    const clone = currentElement.cloneNode(true);
    document.body.appendChild(clone);
    clone.style.position = 'absolute';
    clone.style.left = `${parseInt(currentElement.style.left || 0) + 10}px`;
    clone.style.top = `${parseInt(currentElement.style.top || 0) + 10}px`;
  }
}

function setTextAlign(alignment) {
  if (currentElement) {
    currentElement.style.textAlign = alignment;
  }
}

function setJustifyContent(value) {
  if (currentElement && currentElement.style.display === 'flex') {
    currentElement.style.justifyContent = value;
  }
}

function changeColor(type) {
  const colorPicker = document.createElement('input');
  colorPicker.type = 'color';
  colorPicker.value = localStorage.getItem(type) || '#ffffff';

  colorPicker.addEventListener('input', () => {
    if (currentElement) {
      currentElement.style[type] = colorPicker.value;
      localStorage.setItem(type, colorPicker.value);
    }
  });
  colorPicker.click();
}

// Función para obtener el enlace actual del localStorage
function getCurrentPath() {
  return localStorage.getItem('currentPath') || 'http://ejemplo.com';
}

// Función para abrir enlaces
function openLink(url, newTab = false) {
  if (newTab) {
    window.open(url, '_blank');
  } else {
    window.location.href = url;
  }
}

// Funciones para descargar diferentes formatos
function downloadImage() {
  console.log('Descargar Imagen');
  // Implementar lógica para descargar imagen
}

function downloadPDF() {
  console.log('Descargar PDF');
  // Implementar lógica para descargar PDF
}

function downloadWord() {
  console.log('Descargar Word');
  // Implementar lógica para descargar Word
}

function downloadExcel() {
  console.log('Descargar Excel');
  // Implementar lógica para descargar Excel
}

function uploadFile() {
  console.log('Subir Archivo');
  // Implementar lógica para subir archivo
}

function removeElement() {
  if (currentElement) {
    currentElement.remove();
    currentElement = null;
  }
}

// Funciones de arrastre
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

function stopDrag() {
  if (isDragging) {
    isDragging = false;
    currentElement.style.boxShadow = '';
    currentElement.style.zIndex = '';
    document.removeEventListener('mousemove', dragElement);
    document.removeEventListener('mouseup', stopDrag);
  }
}
