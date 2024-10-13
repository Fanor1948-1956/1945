// pagination.js

// Función para renderizar la paginación genérica
export function renderPagination(
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange
) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  let paginationHtml = '';

  // Botón "Anterior"
  if (currentPage > 1) {
    paginationHtml += `<button class="page-button" data-page="${
      currentPage - 1
    }">Anterior</button>`;
  }

  // Botones de página
  for (let i = 1; i <= totalPages; i++) {
    paginationHtml += `
            <button class="page-button ${
              i === currentPage ? 'active' : ''
            }" data-page="${i}">${i}</button>
        `;
  }

  // Botón "Siguiente"
  if (currentPage < totalPages) {
    paginationHtml += `<button class="page-button" data-page="${
      currentPage + 1
    }">Siguiente</button>`;
  }

  return `<div class="pagination">${paginationHtml}</div>`;
}
