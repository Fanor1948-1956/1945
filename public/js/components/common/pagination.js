


export function renderPagination(
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange
) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  let paginationHtml = "";

  
  if (currentPage > 1) {
    paginationHtml += `<button class="page-button" data-page="${
      currentPage - 1
    }">Anterior</button>`;
  }

  
  for (let i = 1; i <= totalPages; i++) {
    paginationHtml += `
            <button class="page-button ${
              i === currentPage ? "active" : ""
            }" data-page="${i}">${i}</button>
        `;
  }

  
  if (currentPage < totalPages) {
    paginationHtml += `<button class="page-button" data-page="${
      currentPage + 1
    }">Siguiente</button>`;
  }

  return `<div class="pagination">${paginationHtml}</div>`;
}
