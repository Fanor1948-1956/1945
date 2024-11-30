import { actions } from '../utils/index.js';
import { showPopover } from './popover.js';

export function renderCards(
  headers,
  data,
  currentPage,
  itemsPerPage,
  onAction
) {
  // Calcular el inicio y el final de los datos paginados
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginatedData = data.slice(start, end);

  const cardContainer = document.getElementById('userTableContainer');
  cardContainer.innerHTML = ''; // Limpia el contenido anterior

  let cardHtml = '<div class="card-container">';

  // Generar el HTML para cada tarjeta
  paginatedData.forEach((item, index) => {
    const cardNumber = start + index + 1; // Número de la tarjeta
    cardHtml += `
      <div class="card" data-id="${
        item._id
      }"> <!-- Usamos data-id en lugar de id -->
        <div class="card-header">
          <span class="card-number">#${cardNumber}</span>
          <button class="more-button" data-id="${item._id}">
            <i class="icon-three-dots">⋮</i>
          </button>
        </div>
        <div class="card-body">
          ${headers
            .filter((header) => header !== '_id') // Filtra el campo _id
            .map(
              (header, idx) => `
            <div class="card-field">
              <span class="field-name">${header}:</span>
              <span class="field-value">${
                Object.values(item).filter((_, i) => i !== 0)[idx]
              }</span>
            </div>`
            )
            .join('')}
        </div>
        <div class="card-footer">
          <span class="footer-text">Más detalles...</span>
        </div>
      </div>
    `;
  });

  cardHtml += '</div>'; // Cierra el contenedor de tarjetas

  // Inserta el HTML generado en el contenedor del DOM
  cardContainer.innerHTML = cardHtml;

  // Configurar los tooltips y listeners
  initializeListeners(paginatedData, onAction);
}

function initializeListeners(paginatedData, onAction) {
  // Eliminar cualquier listener previo antes de agregar uno nuevo
  const actionButtons = document.querySelectorAll('.more-button');
  actionButtons.forEach((button) => {
    button.removeEventListener('click', handleActionClick); // Remueve el listener existente
    button.addEventListener('click', handleActionClick); // Agrega el nuevo listener
  });

  // Función que maneja el clic en el botón
  function handleActionClick(event) {
    const itemId = event.target.closest('.more-button').getAttribute('data-id'); // Asegúrate de obtener el ID correctamente
    const item = paginatedData.find((dataItem) => dataItem._id === itemId);
    showPopover(item, actions, event.target, onAction);
    event.stopPropagation();
  }
}
