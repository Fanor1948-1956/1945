export function customModal(
  modalId,
  size,
  title,
  backgroundColor,
  content,
  footer
) {
  const modal = document.getElementById(modalId);

  if (!modal) {
    console.error(`Modal con ID '${modalId}' no encontrado.`);
    return;
  }

  const modalContent = modal.querySelector('.customModal-content');
  const modalTitle = modal.querySelector('.customModal-title');
  const modalBody = modal.querySelector('.customModal-body');
  const modalFooter = modal.querySelector('.customModal-footer');

  // Restablecer clases previas
  modalContent.className = 'customModal-content';

  // Aplicar tamaño si es válido
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

  // Establecer título e icono de cierre
  modalTitle.innerHTML = `${title}`;

  // Aplicar color de fondo
  if (backgroundColor) {
    modalContent.style.backgroundColor = backgroundColor;
  }

  // Agregar contenido dinámico
  modalBody.innerHTML = content;

  // Agregar footer dinámico
  modalFooter.innerHTML = footer;

  // Verificar cantidad de cards
  const cards = modalBody.querySelectorAll('.card');
  if (cards.length > 9) {
    modalBody.classList.add('enable-scroll');
  } else {
    modalBody.classList.remove('enable-scroll');
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
    console.error(`Modal con ID '${modalId}' no encontrado.`);
    return;
  }

  const modalContent = modal.querySelector('.customModal-content');

  // Animación de cierre
  modalContent.style.transform = 'translateY(-50px)';
  modal.style.opacity = 0;

  setTimeout(() => {
    modal.style.display = 'none';
  }, 300);
}
