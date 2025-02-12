// js/components/common/renders/renderItems.js

import { renderTable } from '../components/common/table.js';
import { renderCards } from '../components/common/card.js';
import { renderAvatars } from '../components/common/avatar.js';
import { renderPagination } from '../components/common/pagination.js';
import { renderHeader } from '../components/common/header.js';
export const renderItems = (
  currentView,
  items,
  headers,
  currentPage,
  itemsPerPage,
  containerId,
  itemRenderer,
  isPublic,
  cardClass
) => {
  console.log('currentView', currentView);

  // 🔹 Recuperamos el array de cardClasses desde localStorage
  let cardClasses = JSON.parse(localStorage.getItem('cardClasses')) || [];

  // 🔹 Si no hay un cardClass válido, asignamos un valor por defecto
  if (!cardClass) {
    cardClass = 'card'; // Aseguramos que nunca sea undefined
  }

  // 🔹 Buscar si ya existe el containerId en el array
  const existingIndex = cardClasses.findIndex(
    (entry) => entry.containerId === containerId
  );

  if (existingIndex !== -1) {
    // Si ya existe, actualizar su cardClass
    cardClasses[existingIndex].cardClass = cardClass;
  } else {
    // Si no existe, agregar una nueva entrada
    cardClasses.push({ containerId, cardClass });
  }

  // 🔹 Guardar el array actualizado en localStorage
  localStorage.setItem('cardClasses', JSON.stringify(cardClasses));

  console.log(`Guardado en localStorage:`, cardClasses);

  const data = items.map(itemRenderer);
  const commonArgs = [
    headers,
    data,
    currentPage,
    itemsPerPage,
    containerId,
    onAction,
    currentView,
    isPublic,
    cardClass,
  ];

  const views = Array.isArray(currentView) ? currentView : [currentView];
  views.forEach((view) => {
    switch (view) {
      case 'table':
        renderTable(...commonArgs);
        break;
      case 'card':
      case 'carousel':
        renderCards(...commonArgs);
        break;
      case 'avatar':
        renderAvatars(...commonArgs);
      default:
        console.warn(`Vista desconocida: ${view}`);
    }
  });

  if (currentView !== 'carousel') {
    const paginationHtml = renderPagination(
      currentPage,
      items.length,
      itemsPerPage,
      (newPage) =>
        handlePageChange(
          newPage,
          currentView,
          items,
          headers,
          itemsPerPage,
          containerId,
          itemRenderer,
          isPublic
        )
    );

    const containerElement = document.getElementById(containerId);
    if (containerElement) {
      containerElement.insertAdjacentHTML('beforeend', paginationHtml);
    } else {
      console.error('No se encontró el contenedor con id: ', containerId);
    }

    initializePaginationButtons(
      currentView,
      items,
      headers,
      itemsPerPage,
      containerId,
      itemRenderer,
      isPublic
    );
  }
};

// // Función para manejar el cambio de página
function handlePageChange(
  newPage,
  currentView,
  items,
  headers,
  itemsPerPage,
  containerId,
  itemRenderer,
  isPublic
) {
  renderItems(
    currentView,
    items,
    headers,
    newPage,
    itemsPerPage,
    containerId,
    itemRenderer,
    isPublic
  );
}

// // Función para inicializar los listeners de los botones de paginación
function initializePaginationButtons(
  currentView,
  items,
  headers,
  itemsPerPage,
  containerId,
  itemRenderer,
  isPublic
) {
  const pageButtons = document.querySelectorAll('.page-button');
  pageButtons.forEach((button) => {
    button.removeEventListener('click', handlePageClick); // Limpiar cualquier listener previo
    button.addEventListener('click', (event) => {
      const newPage = parseInt(event.currentTarget.getAttribute('data-page'));
      handlePageChange(
        newPage,
        currentView,
        items,
        headers,
        itemsPerPage,
        containerId,
        itemRenderer,
        isPublic
      );
    });
  });
}

// // Manejo del clic en los botones de paginación
function handlePageClick(event) {
  const newPage = parseInt(event.currentTarget.getAttribute('data-page'));
  handlePageChange(newPage);
}
