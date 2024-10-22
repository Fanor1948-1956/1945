

function renderTable(data, containerId, columnHeaders, excludeKeys = ['_id']) {
  
  if (data.length === 0) {
    $(`#${containerId}`).html('<p>No hay datos disponibles.</p>');
    return;
  }

  
  const keys = Object.keys(data[0]);

  let tableHtml = `
        <table>
            <thead>
                <tr>
    `;

  
  keys.forEach((key) => {
    if (!excludeKeys.includes(key)) {
      const header =
        columnHeaders[key] || key.charAt(0).toUpperCase() + key.slice(1);
      tableHtml += `<th>${header}</th>`;
    }
  });

  
  tableHtml += `<th>Acciones</th></tr></thead><tbody>`;

  
  data.forEach((item) => {
    tableHtml += `<tr>`;
    keys.forEach((key) => {
      if (!excludeKeys.includes(key)) {
        const value = item[key];

        
        if (Array.isArray(value)) {
          
          const items = value
            .map((subItem) => `<li>${subItem.name || subItem}</li>`)
            .join('');
          tableHtml += `<td><ul>${items}</ul></td>`;
        } else if (typeof value === 'object' && value !== null) {
          
          const objectEntries = Object.entries(value);
          const objectHtml = objectEntries
            .map(
              ([objKey, objValue]) => `<strong>${objKey}:</strong> ${objValue}`
            )
            .join('<br>');
          tableHtml += `<td>${objectHtml}</td>`;
        } else {
          
          tableHtml += `<td>${value}</td>`;
        }
      }
    });

    
    tableHtml += `
            <td>
                <button class="details-button" data-item-id="${item._id}">Detalles</button>
                <button class="edit-button" data-item-id="${item._id}">Editar</button>
                <button class="delete-button" data-item-id="${item._id}">Eliminar</button>
            </td>
        </tr>`;
  });

  tableHtml += '</tbody></table>';
  $(`#${containerId}`).html(tableHtml);
}
