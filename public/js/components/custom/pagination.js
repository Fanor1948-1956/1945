import { generateCards } from '../../generate/generateCards.js';
export function customPagination(
  totalItems,
  currentPage,
  itemsPerPage,
  containerId,
  items
) {
  const container = document.getElementById(containerId);

  // Número total de páginas
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Rango de páginas a mostrar (ajustar según necesidad)
  const pageRange = 2; // Número de páginas a mostrar a la izquierda y derecha de la página actual

  // Crear los botones de paginación
  let paginationHtml = '<div class="customPagination">';

  // Botón "Anterior" con icono de flecha
  if (currentPage > 1) {
    paginationHtml += `
      <button class="prev-page" data-page="${currentPage - 1}">
       
      </button>
    `;
  } else {
    paginationHtml += `
      <button class="prev-page" disabled>
      
      </button>
    `;
  }

  // Agregar primeros botones con "..."
  if (currentPage - pageRange > 1) {
    paginationHtml += `<button class="page-button" data-page="1">1</button>`;
    paginationHtml += `<span>...</span>`;
  }

  // Botones de página (mostrar rango alrededor de la página actual)
  const startPage = Math.max(1, currentPage - pageRange);
  const endPage = Math.min(totalPages, currentPage + pageRange);

  for (let page = startPage; page <= endPage; page++) {
    paginationHtml += `
      <button class="page-button" data-page="${page}" 
        ${page === currentPage ? 'class="active"' : ''}>
        ${page}
      </button>
    `;
  }

  // Agregar "..." y el último botón de página
  if (currentPage + pageRange < totalPages) {
    paginationHtml += `<span>...</span>`;
    paginationHtml += `<button class="page-button" data-page="${totalPages}">${totalPages}</button>`;
  }

  // Botón "Siguiente" con icono de flecha
  if (currentPage < totalPages) {
    paginationHtml += `
      <button class="next-page" data-page="${currentPage + 1}">
    
      </button>
    `;
  } else {
    paginationHtml += `
      <button class="next-page" disabled>
     
      </button>
    `;
  }

  paginationHtml += '</div>';

  // Agregar la paginación al contenedor
  container.innerHTML = paginationHtml;

  // Inicializar los eventos de los botones de paginación
  initializePaginationButtons(currentPage, totalPages, itemsPerPage, items);
}

function initializePaginationButtons(
  currentPage,
  totalPages,
  itemsPerPage,
  items
) {
  // Asegurarse de que el primer botón esté activado por defecto
  updateActiveButton(currentPage);

  // Manejar los clics de los botones de página
  const pageButtons = document.querySelectorAll('.page-button');
  pageButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      const newPage = parseInt(event.currentTarget.getAttribute('data-page'));

      // Actualizamos la página y eliminamos la clase active de la página anterior
      if (newPage !== currentPage) {
        loadPage(newPage, itemsPerPage, items);

        // Actualizamos la clase "active" de las páginas
        updateActiveButton(newPage);
      }
    });
  });

  // Manejar los botones de "Anterior" y "Siguiente"
  const prevButton = document.querySelector('.prev-page');
  const nextButton = document.querySelector('.next-page');

  if (prevButton) {
    prevButton.addEventListener('click', () => {
      loadPage(currentPage - 1, itemsPerPage, items);
      updateActiveButton(currentPage - 1);
    });
  }

  if (nextButton) {
    nextButton.addEventListener('click', () => {
      loadPage(currentPage + 1, itemsPerPage, items);
      updateActiveButton(currentPage + 1);
    });
  }
}

// Función para cargar una nueva página con los datos correspondientes
function loadPage(page, itemsPerPage, items) {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = page * itemsPerPage;
  const itemsToShow = items.slice(startIndex, endIndex);

  // Actualizar el contenedor de tarjetas
  generateCards(itemsToShow, 'cards-container');

  // Después de cargar la página, actualizamos la paginación
  customPagination(
    items.length,
    page,
    itemsPerPage,
    'pagination-container',
    items
  );
}

// Función para actualizar la clase active de los botones de paginación
function updateActiveButton(newPage) {
  const pageButtons = document.querySelectorAll('.page-button');
  pageButtons.forEach((button) => {
    const buttonPage = parseInt(button.getAttribute('data-page'));
    if (buttonPage === newPage) {
      button.classList.add('active');
    } else {
      button.classList.remove('active');
    }
  });
}
