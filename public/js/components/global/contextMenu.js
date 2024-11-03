// Almacenar el tema elegido por el usuario
function saveTheme(theme) {
  localStorage.setItem('theme', theme);
}

// Aplicar el tema almacenado
function applyTheme() {
  const theme = localStorage.getItem('theme');
  if (theme) {
    document.body.classList.add(theme); // Supongamos que el tema se aplica con clases
  }
}

// Llamar a applyTheme al cargar la página
document.addEventListener('DOMContentLoaded', applyTheme);

// Variables globales
let currentElement; // Elemento actualmente seleccionado

// Crear el menú contextual
const contextMenu = document.createElement('div');
contextMenu.className = 'context-menu';
document.body.appendChild(contextMenu);

// Opciones del menú
const options = [
  { label: 'Alinear Izquierda', action: () => setTextAlign('left') },
  { label: 'Alinear Centro', action: () => setTextAlign('center') },
  { label: 'Alinear Derecha', action: () => setTextAlign('right') },
  { label: 'Cambiar Color de Fondo', action: changeBackgroundColor },
  { label: 'Cambiar Color de Texto', action: changeTextColor },
];

// Crear los elementos del menú
options.forEach((option) => {
  const item = document.createElement('div');
  item.innerText = option.label;
  item.style.padding = '8px 12px';
  item.style.cursor = 'pointer';
  item.style.color = '#fff';

  item.addEventListener('click', () => {
    contextMenu.style.display = 'none'; // Ocultar menú
    option.action(); // Ejecutar la acción
  });

  contextMenu.appendChild(item);
});

// Mostrar el menú contextual
document.addEventListener('contextmenu', (event) => {
  event.preventDefault();
  currentElement = event.target; // Guardar el elemento actual
  contextMenu.style.display = 'block';
  contextMenu.style.left = `${event.pageX}px`;
  contextMenu.style.top = `${event.pageY}px`;
});

// Ocultar el menú al hacer clic
window.addEventListener('click', () => {
  contextMenu.style.display = 'none';
});

// Función para establecer alineación
function setTextAlign(alignment) {
  if (currentElement) {
    currentElement.style.textAlign = alignment; // Aplicar alineación
  }
}

// Funciones para cambiar colores
function changeBackgroundColor() {
  const colorPicker = document.createElement('input');
  colorPicker.type = 'color';
  colorPicker.value = localStorage.getItem('bgColor') || '#ffffff'; // Establecer el color por defecto

  colorPicker.addEventListener('input', () => {
    if (currentElement) {
      currentElement.style.backgroundColor = colorPicker.value; // Aplicar color de fondo
      localStorage.setItem('bgColor', colorPicker.value); // Guardar en localStorage
      applyStoredColors(); // Aplica el color a todos los elementos editables
    }
  });
  colorPicker.click();
}

// Función para cambiar color de texto
function changeTextColor() {
  const colorPicker = document.createElement('input');
  colorPicker.type = 'color';
  colorPicker.value = localStorage.getItem('textColor') || '#000000'; // Establecer el color por defecto

  colorPicker.addEventListener('input', () => {
    if (currentElement) {
      currentElement.style.color = colorPicker.value; // Aplicar color de texto
      localStorage.setItem('textColor', colorPicker.value); // Guardar en localStorage
      applyStoredColors(); // Aplica el color a todos los elementos editables
    }
  });
  colorPicker.click();
}

// Aplicar colores almacenados al cargar
function applyStoredColors() {
  const editableElements = document.querySelectorAll(
    '[contenteditable="true"]'
  ); // Selecciona todos los elementos editables
  const bgColor = localStorage.getItem('bgColor');
  const textColor = localStorage.getItem('textColor');

  editableElements.forEach((element) => {
    if (bgColor) {
      element.style.backgroundColor = bgColor; // Aplica el color de fondo
    }
    if (textColor) {
      element.style.color = textColor; // Aplica el color de texto
    }
  });
}

// Llamar a applyStoredColors al cargar la página
document.addEventListener('DOMContentLoaded', applyStoredColors);
