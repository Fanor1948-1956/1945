import { actions } from '../utils/index.js';
import { createAvatar } from './avatar.js';
import { showPopover } from './popover.js';

export function renderCards(
  headers,
  data,
  currentPage,
  itemsPerPage,
  onAction
) {
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginatedData = data.slice(start, end);

  const cardContainer = document.getElementById('contentContainer');
  cardContainer.innerHTML = ''; // Limpia el contenido anterior

  let cardHtml = '<div class="card-container">';

  paginatedData.forEach((item, index) => {
    const cardNumber = start + index + 1; // Número de la tarjeta
    const avatarElement = createAvatar(item); // Generar avatar
    const avatarHtml = avatarElement.outerHTML; // Convertir a HTML

    cardHtml += `
      <div class="cardContent" data-id="${item._id}">
        <div class="card-main">
          <div class="card-avatar">${avatarHtml}</div>
          <div class="card-body">
            ${headers
              .filter((header) => header !== '_id')
              .map(
                (header, idx) => `
              <div class="card-field">
       
                <span class="field-value">${
                  Object.values(item).filter((_, i) => i !== 0)[idx]
                }</span>
              </div>`
              )
              .join('')}
          </div>
        </div>
        <div class="cardFooter">
          <span class="card-number">${cardNumber}</span>
          <button class="more-button" data-id="${item._id}">
            <i class="icon-three-dots">⋮</i>
          </button>
        </div>
      </div>
    `;
  });

  cardHtml += '</div>';
  cardContainer.innerHTML = cardHtml;

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
