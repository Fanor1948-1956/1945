export function renderTable(data, columnHeaders, containerId, onAction) {
  
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

  
  Object.keys(columnHeaders).forEach((key) => {
    tableHtml += `<th>${columnHeaders[key]}</th>`;
  });

  
  tableHtml += `<th>Acciones</th>`;
  tableHtml += '</tr></thead><tbody>';

  
  data.forEach((item, index) => {
    tableHtml += '<tr>';

    
    tableHtml += `<td>${index + 1}</td>`; 

    Object.keys(columnHeaders).forEach((key) => {
      const value = item[key];

      
      if (Array.isArray(value)) {
        const listItems = value
          .map((val) => `<li>${val.name || val}</li>`)
          .join('');
        tableHtml += `<td><ul>${listItems}</ul></td>`;
      }
      
      else if (typeof value === 'object' && value !== null) {
        const objectEntries = Object.entries(value);
        const objectHtml = objectEntries
          .map(
            ([objKey, objValue]) => `<strong>${objKey}:</strong> ${objValue}`
          )
          .join('<br>');
        tableHtml += `<td>${objectHtml}</td>`;
      }
      
      else {
        tableHtml += `<td>${value !== undefined ? value : ''}</td>`;
      }
    });

    
    tableHtml += `
            <td>
                <button class="details-button" data-id="${item._id}" onclick="onAction('details', '${item._id}')">Ver Detalles</button>
                <button class="edit-button" data-id="${item._id}" onclick="onAction('edit', '${item._id}')">Editar</button>
                <button class="deactivate-button" data-id="${item._id}" onclick="onAction('deactivate', '${item._id}')">Desactivar</button>
                <button class="delete-button" data-id="${item._id}" onclick="onAction('delete', '${item._id}')">Eliminar</button>
            </td>
        `;
    tableHtml += '</tr>';
  });

  tableHtml += '</tbody></table>';
  console.log(tableHtml); 
  document.getElementById(containerId).innerHTML = tableHtml;
}
