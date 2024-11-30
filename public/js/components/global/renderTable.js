// export function renderTable(data, columnHeaders, containerId, onAction) {
//   const container = document.getElementById(containerId);
//   container.innerHTML = ''; // Limpiar el contenedor

//   if (!data || data.length === 0) {
//     container.appendChild(document.createElement('p')).innerText =
//       'No hay datos disponibles.';
//     return;
//   }

//   // Crear la tabla
//   const table = document.createElement('table');
//   const thead = document.createElement('thead');
//   const headerRow = document.createElement('tr');

//   // Columna de numeración
//   headerRow.appendChild(document.createElement('th')).innerText = '#';

//   // Crear encabezados de columna
//   Object.keys(columnHeaders).forEach((key) => {
//     const th = document.createElement('th');
//     th.innerText = columnHeaders[key];
//     headerRow.appendChild(th);
//   });

//   // Columna de acciones
//   headerRow.appendChild(document.createElement('th')).innerText = 'Acciones';
//   thead.appendChild(headerRow);
//   table.appendChild(thead);

//   // Crear el cuerpo de la tabla
//   const tbody = document.createElement('tbody');

//   data.forEach((item, index) => {
//     const row = document.createElement('tr');

//     // Columna de numeración
//     const numberCell = document.createElement('td');
//     numberCell.innerText = index + 1;
//     row.appendChild(numberCell);

//     // Rellenar las celdas con datos
//     Object.keys(columnHeaders).forEach((key) => {
//       const value = item[key];
//       const cell = document.createElement('td');

//       if (Array.isArray(value)) {
//         const list = document.createElement('ul');
//         value.forEach((val) => {
//           const listItem = document.createElement('li');
//           listItem.innerText = val.name || val;
//           list.appendChild(listItem);
//         });
//         cell.appendChild(list);
//       } else if (typeof value === 'object' && value !== null) {
//         Object.entries(value).forEach(([objKey, objValue]) => {
//           const strong = document.createElement('strong');
//           strong.innerText = `${objKey}: `;
//           const textNode = document.createTextNode(objValue);
//           cell.appendChild(strong);
//           cell.appendChild(textNode);
//           cell.appendChild(document.createElement('br'));
//         });
//       } else {
//         cell.innerText = value !== undefined ? value : '';
//       }

//       row.appendChild(cell);
//     });

//     // Columna de acciones
//     const actionCell = document.createElement('td');
//     const actions = [
//       { text: 'Ver Detalles', class: 'details-button', action: 'details' },
//       { text: 'Editar', class: 'edit-button', action: 'edit' },
//       { text: 'Desactivar', class: 'deactivate-button', action: 'deactivate' },
//       { text: 'Eliminar', class: 'delete-button', action: 'delete' },
//     ];

//     actions.forEach(({ text, class: buttonClass, action }) => {
//       const button = document.createElement('button');
//       button.className = buttonClass;
//       button.innerText = text;
//       button.dataset.id = item._id;
//       button.onclick = () => onAction(action, item._id);
//       actionCell.appendChild(button);
//     });

//     row.appendChild(actionCell);
//     tbody.appendChild(row);
//   });

//   table.appendChild(tbody);
//   container.appendChild(table);
// }

import { showPopover } from '../common/popover.js'
import { actions } from '../utils/index.js'

export function renderTable (data, columnHeaders, containerId, onAction) {
  const container = document.getElementById(containerId)
  container.innerHTML = '' // Limpiar el contenedor

  if (!data || data.length === 0) {
    container.appendChild(document.createElement('p')).innerText =
      'No hay datos disponibles.'
    return
  }

  // Crear la tabla
  const table = document.createElement('table')
  const thead = document.createElement('thead')
  const headerRow = document.createElement('tr')

  // Columna de numeración
  headerRow.appendChild(document.createElement('th')).innerText = '#'

  // Crear encabezados de columna
  Object.keys(columnHeaders).forEach(key => {
    const th = document.createElement('th')
    th.innerText = columnHeaders[key]
    headerRow.appendChild(th)
  })

  // Columna de acciones
  headerRow.appendChild(document.createElement('th')).innerText = 'Acciones'
  thead.appendChild(headerRow)
  table.appendChild(thead)

  // Crear el cuerpo de la tabla
  const tbody = document.createElement('tbody')

  data.forEach((item, index) => {
    const row = document.createElement('tr')

    // Columna de numeración
    const numberCell = document.createElement('td')
    numberCell.innerText = index + 1
    row.appendChild(numberCell)

    // Rellenar las celdas con datos
    Object.keys(columnHeaders).forEach(key => {
      const value = item[key]
      const cell = document.createElement('td')
      cell.innerText = value !== undefined ? value : ''
      row.appendChild(cell)
    })

    // Columna de acciones con botón "More"
    const actionCell = document.createElement('td')
    const moreButton = document.createElement('button')
    moreButton.className = 'more-button'
    moreButton.innerHTML = '&#x22EE;' // Ícono de tres puntos verticales
    moreButton.dataset.id = item._id // Asignar el ID del elemento a cada botón

    // Mostrar popover al hacer clic en el botón "More"
    moreButton.onclick = event => {
      showPopover(item, actions, moreButton, onAction) // Ahora pasas el botón como el objetivo
      event.stopPropagation() // Evitar que el clic se propague
    }

    actionCell.appendChild(moreButton)
    row.appendChild(actionCell)
    tbody.appendChild(row)
  })

  table.appendChild(tbody)
  container.appendChild(table)
}
