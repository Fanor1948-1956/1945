// js/components/common/renders/renderItems.js

import { renderTable } from '../components/common/table.js';
import { renderCards } from '../components/common/card.js';
import { renderMedia } from '../components/common/media.js';
import { renderPagination } from '../components/common/pagination.js';

export const renderItems = (
  currentView,
  items,
  headers,
  currentPage,
  itemsPerPage,
  containerId, // Esto es un string, no un nodo.
  itemRenderer,
  isPublic,
  cardClass
) => {
  console.log('currentView', currentView);
  const data = items.map(itemRenderer); // Usa itemRenderer para convertir items en el formato adecuado
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
      case 'media':
      case 'carouselMedia':
        renderMedia(...commonArgs);
        break;
      default:
        console.warn(`Vista desconocida: ${view}`);
    }
  });

  //   // Solo renderiza la paginación si no es un 'carousel'
  if (currentView !== 'carousel' && currentView !== 'carouselMedia') {
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
        ) // Pasar currentView y otros argumentos
    );

    // Convertir containerId en un nodo real del DOM si es solo una cadena
    const containerElement = document.getElementById(containerId);

    if (containerElement) {
      containerElement.insertAdjacentHTML('beforeend', paginationHtml);
    } else {
      console.error('No se encontró el contenedor con id: ', containerId);
    }

    // Inicializar listeners para botones de paginación
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
