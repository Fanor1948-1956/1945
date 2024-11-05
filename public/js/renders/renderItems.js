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

  container,
  itemRenderer
) => {
  const data = items.map(itemRenderer); // Usa itemRenderer para convertir items en el formato adecuado
  container.innerHTML = ''; // Limpiar contenido previo

  if (currentView === 'table') {
    renderTable(headers, data, currentPage, itemsPerPage, onAction);
  } else {
    renderCards(headers, data, currentPage, itemsPerPage, onAction);
  }

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
        container,
        itemRenderer
      ) // Pasar currentView y otros argumentos
  );

  container.insertAdjacentHTML('beforeend', paginationHtml);

  // Inicializar listeners para botones de paginación
  initializePaginationButtons(
    currentView,
    items,
    headers,
    itemsPerPage,
    container,
    itemRenderer
  );
};

// Función para manejar el cambio de página
function handlePageChange(
  newPage,
  currentView,
  items,
  headers,
  itemsPerPage,
  container,
  itemRenderer
) {
  renderItems(
    currentView,
    items,
    headers,
    newPage,
    itemsPerPage,
    container,
    itemRenderer
  );
}

// Función para inicializar los listeners de los botones de paginación
function initializePaginationButtons(
  currentView,
  items,
  headers,
  itemsPerPage,
  container,
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
        container,
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
// Función de renderizado de usuario
