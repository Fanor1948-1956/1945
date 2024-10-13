export function renderTable(data, columnHeaders, containerId, onAction) {
  // Comprobar si hay datos para mostrar
  if (!data || data.length === 0) {
    document.getElementById(containerId).innerHTML =
      '<p>No hay datos disponibles.</p>';
    return;
  }

  let tableHtml = `
        <table>
            <thead>
                <tr>
                    <th>#</th> <!-- Columna de numeración -->
    `;

  // Crear el encabezado de la tabla con los nombres de las columnas
  Object.keys(columnHeaders).forEach((key) => {
    tableHtml += `<th>${columnHeaders[key]}</th>`;
  });

  // Agregar la columna de acciones
  tableHtml += `<th>Acciones</th>`;
  tableHtml += '</tr></thead><tbody>';

  // Crear las filas de la tabla
  data.forEach((item, index) => {
    tableHtml += '<tr>';

    // Añadir la numeración
    tableHtml += `<td>${index + 1}</td>`; // Numeración empieza desde 1

    Object.keys(columnHeaders).forEach((key) => {
      const value = item[key];

      // Manejo de arrays
      if (Array.isArray(value)) {
        const listItems = value
          .map((val) => `<li>${val.name || val}</li>`)
          .join('');
        tableHtml += `<td><ul>${listItems}</ul></td>`;
      }
      // Manejo de objetos
      else if (typeof value === 'object' && value !== null) {
        const objectEntries = Object.entries(value);
        const objectHtml = objectEntries
          .map(
            ([objKey, objValue]) => `<strong>${objKey}:</strong> ${objValue}`
          )
          .join('<br>');
        tableHtml += `<td>${objectHtml}</td>`;
      }
      // Mostrar valor simple o vacío si no existe
      else {
        tableHtml += `<td>${value !== undefined ? value : ''}</td>`;
      }
    });

    // Añadir la columna de acciones con botones
    // Añadir la columna de acciones
    tableHtml += `
            <td>
                <button class="details-button" data-id="${item._id}" onclick="onAction('details', '${item._id}')">Ver Detalles</button>
                <button class="edit-button" data-id="${item._id}" onclick="onAction('edit', '${item._id}')">Editar</button>
                <button class="deactivate-button" data-id="${item._id}" onclick="onAction('deactivate', '${item._id}')">Desactivar</button>
            </td>
        `;
    tableHtml += '</tr>';

    tableHtml += '</tr>';
  });

  tableHtml += '</tbody></table>';
  document.getElementById(containerId).innerHTML = tableHtml;
}
