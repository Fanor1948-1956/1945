// js/components/common/renders/renderItems.js

import { renderTable } from '../components/common/table.js';
import { renderCards } from '../components/common/card.js';
import { renderPagination } from '../components/common/pagination.js';

export const renderItems = (
  currentView,
  items,
  headers,
  currentPage,
  itemsPerPage,
  containerId, // Esto es un string, no un nodo.
  itemRenderer
) => {
  console.log('currentView', currentView);
  const data = items.map(itemRenderer); // Usa itemRenderer para convertir items en el formato adecuado

  if (currentView === 'table') {
    renderTable(
      headers,
      data,
      currentPage,
      itemsPerPage,
      containerId,
      onAction,
      currentView
    );
  } else {
    renderCards(
      headers,
      data,
      currentPage,
      itemsPerPage,
      containerId,
      onAction,
      currentView
    );
  }

  // Solo renderiza la paginación si no es un 'carousel'
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
          itemRenderer
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
      itemRenderer
    );
  }
};

// Función para manejar el cambio de página
function handlePageChange(
  newPage,
  currentView,
  items,
  headers,
  itemsPerPage,
  containerId,
  itemRenderer
) {
  renderItems(
    currentView,
    items,
    headers,
    newPage,
    itemsPerPage,
    containerId,
    itemRenderer
  );
}

// Función para inicializar los listeners de los botones de paginación
function initializePaginationButtons(
  currentView,
  items,
  headers,
  itemsPerPage,
  containerId,
  itemRenderer
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
        itemRenderer
      );
    });
  });
}

// Manejo del clic en los botones de paginación
function handlePageClick(event) {
  const newPage = parseInt(event.currentTarget.getAttribute('data-page'));
  handlePageChange(newPage);
}
