import { actions } from '../utils/index.js';
import { createAvatar } from '../custom/avatar.js';
import { showPopover } from './popover.js';

// renderTable con número de fila, avatar y primer elemento de datos en la primera columna
export function renderTable(
  headers,
  data,
  currentPage,
  itemsPerPage,
  containerId,
  onAction
) {
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginatedData = data.slice(start, end);

  const tableContainer = document.getElementById(containerId);

  // Encabezados de la tabla
  let tableHtml = `
  <div class="table-container">
    <table class="table">
      <thead>
        <tr>
          <th>${headers[0]}</th> <!-- Primera celda de encabezado -->
          ${headers
            .slice(1)
            .map((header) => `<th>${header}</th>`)
            .join('')}
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
  `;

  paginatedData.forEach((item, index) => {
    const rowNumber = start + index + 1;
    const avatarElement = createAvatar(item); // Crear avatar
    const avatarHtml = avatarElement.outerHTML;

    // Combinar número de fila, avatar y primer elemento de datos en la primera celda
    const firstDataValue = Object.entries(item).filter(
      ([key]) => key !== '_id' && key !== 'uploads'
    )[0][1]; // Primer dato sin 'id' ni 'uploads'

    // Celda combinada con bordes visibles
    const firstCell = `<td class="firstCell" > <span class="tdRow">${rowNumber}</span>
    <span class="tdRow">${avatarHtml}</span>
    <span>${firstDataValue}</span></td>`;

    // Filtrar 'id' y 'uploads' para el resto de los datos en las filas
    const rowData = Object.entries(item)
      .filter(([key]) => key !== '_id' && key !== 'uploads')
      .slice(1) // Omitir el primer dato ya usado
      .map(
        ([_, value]) =>
          `<td class="truncate tooltip" data-tooltip="${value}">${value}</td>`
      )
      .join('');

    tableHtml += `
      <tr>
        ${firstCell} <!-- Primera columna con número, avatar y primer dato -->
        ${rowData} <!-- Resto de los datos sin 'id' ni 'uploads' -->
        <td>
          <button class="more-button" data-id="${item._id}">
            <i class="icon-three-dots">⋮</i>
          </button>
        </td>
      </tr>
    `;
  });

  tableHtml += `</tbody></table> </div>`;
  tableContainer.innerHTML = tableHtml;

  // Inicializar listeners para tooltips y acciones
  initializeListeners(paginatedData, onAction);
}

export function initializeListeners(paginatedData, onAction) {
  const actionButtons = document.querySelectorAll('.more-button');
  actionButtons.forEach((button) => {
    button.removeEventListener('click', handleActionClick); // Remover listeners previos
    button.addEventListener('click', handleActionClick);
  });

  function handleActionClick(event) {
    const itemId = event.target.closest('.more-button').getAttribute('data-id');
    const item = paginatedData.find((dataItem) => dataItem._id === itemId);
    showPopover(item, actions, event.target, onAction);
    event.stopPropagation();
  }
}

export function initializeModalPublic(paginatedData, onAction, isPublic) {
  document.querySelectorAll('.public-button').forEach((button) => {
    button.addEventListener('click', (event) => {
      const itemId = event.target
        .closest('.public-button')
        .getAttribute('data-id');
      console.log('Ver más sobre el item:', itemId);
      // Aquí puedes redirigir o mostrar más información
    });
  });
}
