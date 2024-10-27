import { actions } from '../utils/index.js';
import { showPopover } from './popover.js';

// Función renderTable: ahora no devuelve HTML
export function renderTable(
  headers,
  data,
  currentPage,
  itemsPerPage,
  onAction
) {
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginatedData = data.slice(start, end);

  // Limpia el contenedor antes de renderizar la tabla
  const tableContainer = document.getElementById('userTableContainer');
  tableContainer.innerHTML = ''; // Limpia el contenido anterior

  // Construcción del HTML de la tabla
  let tableHtml = `
    <table class="table">
      <thead>
        <tr>
          <th>#</th>
          ${headers.map((header) => `<th>${header}</th>`).join('')}
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
  `;

  paginatedData.forEach((item, index) => {
    const rowNumber = start + index + 1;
    tableHtml += `
      <tr>
        <td>${rowNumber}</td>
        ${Object.values(item)
          .filter((_, idx) => idx !== 0)
          .map(
            (value) =>
              `<td class="truncate tooltip" data-tooltip="${value}">${value}</td>`
          )
          .join('')}
        <td>
          <button class="more-button" data-id="${item._id}">
            <i class="icon-three-dots">⋮</i>
          </button>
        </td>
      </tr>
    `;
  });

  tableHtml += `</tbody></table>`;

  // Inserta el HTML generado en el contenedor del DOM
  tableContainer.innerHTML = tableHtml;

  // Configurar los tooltips y listeners
  initializeListeners(paginatedData, onAction);
}

function initializeListeners(paginatedData, onAction) {
  // Configurar los tooltips

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
