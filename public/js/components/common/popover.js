let currentPopoverTarget = null; // Para mantener la referencia al botón actual

// Mostrar popover
export function showPopover(item, targetButton, onAction) {
  const popover = document.getElementById('userActionsPopover');
  const popoverActions = document.getElementById('popoverActions');

  // Verificar si el popover está visible y si se está haciendo clic en el mismo botón
  if (
    popover.style.display === 'block' &&
    currentPopoverTarget === targetButton
  ) {
    // Si el popover ya está abierto para este botón, cerrarlo
    closePopover();
    return;
  }

  currentPopoverTarget = targetButton; // Establecer el botón actual

  // Limpiar las acciones anteriores
  popoverActions.innerHTML = '';

  // Crear los botones dentro del popover
  const actions = [
    { text: 'Ver Detalles', action: 'details' },
    { text: 'Editar', action: 'edit' },
    { text: 'Desactivar', action: 'deactivate' },
    { text: 'Eliminar', action: 'delete' },
  ];

  actions.forEach(({ text, action }) => {
    const button = document.createElement('button');
    button.className = 'button-popper';
    button.innerText = text;
    button.onclick = () => {
      onAction(action, item._id); // Pasar el ID del elemento correspondiente
      closePopover(); // Cierra el popover al seleccionar una opción
    };
    popoverActions.appendChild(button);
  });

  // Mostrar el popover temporalmente para calcular su tamaño
  popover.style.visibility = 'hidden';
  popover.style.display = 'block'; // Mostrarlo, pero invisible

  // Establecer la posición del popover
  setPopoverPosition(popover, targetButton);

  // Ahora hacerlo visible
  popover.style.visibility = 'visible';
}

// Establecer la posición del popover
function setPopoverPosition(popover, targetButton) {
  if (!targetButton) return; // Asegúrate de que hay un botón de destino

  const rect = targetButton.getBoundingClientRect();
  const popoverHeight = popover.offsetHeight;
  const popoverWidth = popover.offsetWidth;

  // Calcular la posición del popover
  let top = rect.bottom + window.scrollY; // Posición por debajo del botón
  let left = rect.left + window.scrollX + rect.width / 2 - popoverWidth / 2; // Centrado

  // Ajustar si el popover se sale por la derecha
  if (left + popoverWidth > window.innerWidth) {
    left = window.innerWidth - popoverWidth - 10; // Ajusta con un pequeño margen
  }

  // Ajustar si el popover se sale por la izquierda
  if (left < 0) {
    left = 10; // Ajusta con un pequeño margen
  }

  // Comprobar espacio disponible por encima y por debajo
  const spaceBelow = window.innerHeight - rect.bottom - 10; // Espacio por debajo del botón
  const spaceAbove = rect.top - 310; // Espacio por encima del botón

  // Si hay más espacio por encima y es suficiente para el popover, mostrarlo arriba
  if (spaceAbove > popoverHeight && spaceAbove >= spaceBelow) {
    top = rect.top + window.scrollY - popoverHeight; // Coloca el popover encima del botón
  }

  // Ajustar si el popover se sale por arriba del viewport
  if (top < 10) {
    top = 10; // Ajusta con un pequeño margen
  }

  // Aplicar las nuevas posiciones
  popover.style.top = `${top}px`;
  popover.style.left = `${left}px`;
  popover.style.position = 'absolute'; // Cambiar a posición absoluta
}

// Cerrar el popover
export function closePopover() {
  const popover = document.getElementById('userActionsPopover');
  popover.style.display = 'none';
  currentPopoverTarget = null; // Restablece el objetivo actual
}

// Cerrar el popover al hacer clic fuera
export function setupPopoverClose() {
  document.addEventListener('click', (event) => {
    const popover = document.getElementById('userActionsPopover');
    const target = event.target;

    // Asegúrate de que el popover se cierra solo al hacer clic fuera de él y del botón "More"
    if (
      popover.style.display === 'block' &&
      !popover.contains(target) &&
      !target.classList.contains('more-button')
    ) {
      closePopover();
    }
  });
}

// Escuchar desplazamientos y ocultar el popover
export function setupScrollListeners() {
  window.addEventListener('scroll', () => {
    closePopover();
  });

  // Cerrar popover en cambio de tamaño de ventana
  window.addEventListener('resize', () => {
    closePopover();
  });
}

// Inicializar los listeners
setupPopoverClose();
setupScrollListeners();
