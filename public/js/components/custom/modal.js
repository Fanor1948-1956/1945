export function openModal(modalId, size, title, backgroundColor) {
  const modal = document.getElementById(modalId);

  if (!modal) {
    console.error(`❌ Modal con ID '${modalId}' no encontrado.`);
    return;
  }

  const modalContent = modal.querySelector('.modal-content');
  const modalTitle = modal.querySelector('.modal-title');
  const closeButton = modal.querySelector('.close-button');

  // Verificar si modalTitle y closeButton existen
  if (!modalTitle) {
    console.error(
      `⚠️ No se encontró '.modal-title' dentro del modal '${modalId}'.`
    );
  } else {
    modalTitle.textContent = title; // Establecer el título
  }

  if (!closeButton) {
    console.error(
      `⚠️ No se encontró '.close-button' dentro del modal '${modalId}'.`
    );
  } else {
    closeButton.style.display = 'block'; // Asegurar que el botón de cerrar sea visible
  }

  // Restablecer clases previas
  modalContent.className = 'modal-content';

  // Lista de tamaños permitidos
  const sizeClasses = [
    'small',
    'medium',
    'fullwidth',
    'maxwidth',
    'fullscreen',
    'minheight',
  ];
  if (sizeClasses.includes(size)) {
    modalContent.classList.add(size);
  }

  // Aplicar color de fondo si se especifica
  if (backgroundColor) {
    modalContent.style.backgroundColor = backgroundColor;
  }

  // Mostrar modal con animación
  modal.style.display = 'flex';
  modal.style.opacity = 0;
  modalContent.style.transform = 'translateY(-50px)';

  setTimeout(() => {
    modal.style.opacity = 1;
    modalContent.style.transform = 'translateY(0)';
  }, 10);
}

export function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) {
    console.error(`❌ Modal con ID '${modalId}' no encontrado.`);
    return;
  }

  const modalContent = modal.querySelector('.modal-content');
  if (!modalContent) {
    console.error(
      `⚠️ No se encontró '.modal-content' dentro del modal '${modalId}'.`
    );
    return;
  }

  // Animación de cierre
  modalContent.style.transform = 'translateY(-50px)';
  modal.style.opacity = 0;

  setTimeout(() => {
    modal.style.display = 'none';
  }, 300);
}
