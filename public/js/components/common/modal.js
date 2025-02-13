import { renderCards } from '../../renders/renderCards.js';
import { customPaginationUi } from '../custom-ui/pagination.js';

export function customModal(
  modalId, // El ID del modal principal
  size, // Tamaño del modal
  title, // Título del modal
  backgroundColor, // Color de fondo del modal
  items,
  content, // Contenido dinámico (no un ID, sino el propio contenido)

  footer = '', // Contenido para el footer
  isStateType = '' // Para determinar si es paginación o acciones
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

  // Establecer título
  modalTitle.innerHTML = title;

  // Aplicar color de fondo si se proporciona
  if (backgroundColor) {
    modalContent.style.backgroundColor = backgroundColor;
  }

  // Limpiar el contenido previo del modalBody
  modalBody.innerHTML = '';

  // Insertar el contenido dinámico (las tarjetas) en el modalBody
  if (content) {
    modalBody.appendChild(content); // Aquí se agrega el contenedor de tarjetas
  } else {
    console.error(`El contenido no es válido.`);
  }

  // Limpiar el footer antes de añadir nuevo contenido
  modalFooter.innerHTML = '';

  // Agregar footer dinámico según el tipo de estado (paginación o acciones)
  if (isStateType === 'pagination') {
    const paginationContainer = document.createElement('div');
    paginationContainer.id = 'pagination-container';
    modalFooter.appendChild(paginationContainer);
    customPaginationUi(paginationContainer, items, renderCards); // Llamar a la función de paginación
  } else if (isStateType === 'actions') {
    const actionsContainer = document.createElement('div');
    actionsContainer.id = 'actions-container';
    modalFooter.appendChild(actionsContainer);
    actions(actionsContainer); // Llamar a la función de acciones
  } else {
    modalFooter.innerHTML = footer;
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


// export function closeModal(modalId) {
//   const modal = document.getElementById(modalId);
//   if (!modal) {
//     console.error(`Modal con ID '${modalId}' no encontrado.`);
//     return;
//   }

//   const modalContent = modal.querySelector('.customModal-content');

//   modalContent.style.transform = 'translateY(-50px)';
//   modal.style.opacity = 0;

//   setTimeout(() => {
//     modal.style.display = 'none';
//   }, 300);
// }
