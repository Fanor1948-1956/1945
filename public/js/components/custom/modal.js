export function openModal(modalId, size, title) {
  const modal = document.getElementById(modalId);

  // Verificar si el modal existe antes de continuar
  if (!modal) {
    console.error(`Modal con ID '${modalId}' no encontrado.`);
    return; // Detener la ejecución si no se encuentra el modal
  }

  const modalContent = modal.querySelector('.modal-content');

  // Añadir clases de tamaño del modal
  modalContent.className = 'modal-content'; // Restablecer clases anteriores

  if (size === 'small') {
    modalContent.classList.add('small');
  } else if (size === 'medium') {
    modalContent.classList.add('medium');
  } else if (size === 'fullwidth') {
    modalContent.classList.add('fullwidth');
  } else if (size === 'maxwidth') {
    modalContent.classList.add('maxwidth');
  } else if (size === 'fullscreen') {
    modalContent.classList.add('fullscreen');
  } else if (size === 'minheight') {
    modalContent.classList.add('minheight');
  }

  // Establecer el título del modal
  modal.querySelector('.modal-title').textContent = title;

  // Mostrar el modal
  modal.style.display = 'flex';
  modal.style.opacity = 0;
  modalContent.style.transform = 'translateY(-50px)';

  // Transición de apertura
  setTimeout(() => {
    modal.style.opacity = 1;
    modalContent.style.transform = 'translateY(0)';
  }, 10);
}

export function closeModal(modalId) {
  const modal = document.getElementById(modalId);

  // Verifica si el modal existe antes de proceder
  if (!modal) {
    console.error(`Modal con ID '${modalId}' no encontrado.`);
    return; // Detener la ejecución si no se encuentra el modal
  }

  const modalContent = modal.querySelector('.modal-content');

  // Verifica si modalContent existe
  if (!modalContent) {
    console.error(
      `No se encontró .modal-content dentro del modal con ID '${modalId}'`
    );
    return;
  }

  // Animación de cierre del modal
  modalContent.style.transform = 'translateY(-50px)';
  modal.style.opacity = 0;

  setTimeout(() => {
    modal.style.display = 'none';
  }, 300); // Espera 300ms antes de ocultar completamente el modal
}
