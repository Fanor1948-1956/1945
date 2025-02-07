export function renderPagination(currentPage, totalItems, itemsPerPage) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  let paginationHtml = '';

  // Contenedor para los botones de paginación
  paginationHtml += `<div class="pagination">
    <button class="custom-button" id="customButton">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-gear" viewBox="0 0 16 16">
        <path d="M8 4.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zM2 8a6 6 0 1 1 12 0 6 6 0 0 1-12 0zm6-7a1 1 0 0 1 .8 1.6l-.8.4-.8-.4A1 1 0 1 1 8 1zm-4.3 1.4a1 1 0 0 1 1.4.3l.4.8-.4.8a1 1 0 0 1-1.4-.3l-.4-.8a1 1 0 0 1 .3-1.4zm8.4 0a1 1 0 0 1 .4 1.4l-.4.8-.4-.8a1 1 0 0 1 .3-1.4zM1 8a1 1 0 0 1 0-2h1.5a1 1 0 0 1 0 2H1zm12.5 0a1 1 0 0 1 0-2H15a1 1 0 0 1 0 2h-1.5zm-2.5 4.5a1 1 0 0 1-.4 1.4l-.8-.4-.4.8a1 1 0 0 1-1.6-.8l.4-.8-.8-.4a1 1 0 0 1 0-1.6l.8-.4-.4-.8a1 1 0 0 1 1.4-1.6l.8.4.4-.8a1 1 0 0 1 1.6 1.6l-.4.8.8.4a1 1 0 0 1 0 1.6l-.8.4.4.8a1 1 0 0 1-1.4 1.6l-.4-.8-.8.4a1 1 0 0 1-.8 0zm-7.4 0a1 1 0 0 1-1.4-1.6l.4-.8-.8-.4a1 1 0 0 1 0-1.6l.8-.4-.4-.8a1 1 0 0 1 1.6-1.6l.4.8.8-.4a1 1 0 0 1 0 1.6l-.8.4.4.8a1 1 0 0 1-1.4 1.6l-.4-.8-.8.4z"/>
      </svg>
    </button>
    <div class="pagination-buttons">`;

  // Botón para la página anterior
  if (currentPage > 1) {
    paginationHtml += `<button class="page-button" data-page="${
      currentPage - 1
    }">Anterior</button>`;
  }

  // Mostrar siempre las primeras páginas y las últimas
  const maxVisibleButtons = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxVisibleButtons / 2));
  let endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1);

  if (endPage - startPage < maxVisibleButtons - 1) {
    startPage = Math.max(1, endPage - maxVisibleButtons + 1);
  }

  // Mostrar el primer grupo de páginas
  if (startPage > 1) {
    paginationHtml += `<button class="page-button" data-page="1">1</button>`;
    if (startPage > 2) paginationHtml += `<span class="dots">...</span>`;
  }

  // Agregar las páginas visibles en el rango
  for (let i = startPage; i <= endPage; i++) {
    paginationHtml += `<button class="page-button ${
      i === currentPage ? 'active' : ''
    }" data-page="${i}">${i}</button>`;
  }

  // Mostrar el último grupo de páginas
  if (endPage < totalPages) {
    if (endPage < totalPages - 1)
      paginationHtml += `<span class="dots">...</span>`;
    paginationHtml += `<button class="page-button" data-page="${totalPages}">${totalPages}</button>`;
  }

  // Botón para la página siguiente
  if (currentPage < totalPages) {
    paginationHtml += `<button class="page-button" data-page="${
      currentPage + 1
    }">Siguiente</button>`;
  }

  paginationHtml += `</div></div>`; // Cierra el contenedor de los botones de paginación

  // Agregar event listeners

  return paginationHtml;
}
