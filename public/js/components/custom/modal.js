// modal.js

// Función para abrir el modal con un tamaño específico
export function openModal(size, title, showActions = false) {
  const modal = document.getElementById('customModal');
  const modalContent = document.getElementById('modalContent');
  const modalTitle = modalContent.querySelector('.modal-head h3');
  const modalActions = modalContent.querySelector('.modal-actions');
  const closeButton = modalContent.querySelector('#closeButton'); // Asegúrate de usar el ID correcto

  // Remover clases anteriores de tamaño
  modalContent.className = 'modal-content'; // Reinicia las clases de contenido

  // Asignar la clase adecuada según el tamaño especificado
  if (size === 'medium') {
    modalContent.classList.add('medium');
  } else if (size === 'fullwidth') {
    modalContent.classList.add('fullwidth');
  } else if (size === 'maxwidth') {
    modalContent.classList.add('maxwidth');
  } else if (size === 'fullscreen') {
    modalContent.classList.add('fullscreen'); // Añadir clase para pantalla completa
  } else if (size === 'minheight') {
    modalContent.classList.add('minheight'); // Añadir clase para altura mínima
  }

  modalTitle.textContent = title;

  // Mostrar u ocultar la sección de acciones
  modalActions.style.display = showActions ? 'block' : 'none'; // Mostrar o ocultar

  // Ocultar el ícono de cerrar si hay acciones
  closeButton.style.display = showActions ? 'none' : 'block';

  // Mostrar el modal con una transición suave
  modal.style.display = 'flex';
  modal.style.opacity = 0; // Iniciar con opacidad 0
  modalContent.style.transform = 'translateY(-50px)'; // Comienza 50px arriba

  // Iniciar la transición
  setTimeout(() => {
    modal.style.opacity = 1; // Gradualmente hacer visible
    modalContent.style.transform = 'translateY(0)'; // Desplazarse a su posición original
  }, 10);
}

// Función para cerrar el modal
export function closeModal() {
  const modal = document.getElementById('customModal');
  const modalContent = modal.querySelector('.modal-content');

  // Gradualmente hacer desaparecer el modal
  modalContent.style.transform = 'translateY(-50px)'; // Desplazarse hacia arriba
  modal.style.opacity = 0; // Iniciar opacidad a 0
  setTimeout(() => {
    modal.style.display = 'none'; // Ocultar después de la transición
  }, 300); // Asegúrate de que esto coincida con la duración de tu CSS
}
