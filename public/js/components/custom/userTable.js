

function renderTable(data, containerId, columnHeaders, excludeKeys = ['_id']) {
  // Asegúrate de que hay datos
  if (data.length === 0) {
    $(`#${containerId}`).html('<p>No hay datos disponibles.</p>');
    return;
  }

  // Obtener las claves de los objetos de datos (asumiendo que todos tienen la misma estructura)
  const keys = Object.keys(data[0]);

  let tableHtml = `
        <table>
            <thead>
                <tr>
    `;

  // Crear el encabezado de la tabla basado en los nombres proporcionados en `columnHeaders`
  keys.forEach((key) => {
    if (!excludeKeys.includes(key)) {
      const header =
        columnHeaders[key] || key.charAt(0).toUpperCase() + key.slice(1);
      tableHtml += `<th>${header}</th>`;
    }
  });

  // Agregar la columna de acciones
  tableHtml += `<th>Acciones</th></tr></thead><tbody>`;

  // Crear las filas de la tabla
  data.forEach((item) => {
    tableHtml += `<tr>`;
    keys.forEach((key) => {
      if (!excludeKeys.includes(key)) {
        const value = item[key];

        // Verificar si el valor es un array
        if (Array.isArray(value)) {
          // Mostrar como lista
          const items = value
            .map((subItem) => `<li>${subItem.name || subItem}</li>`)
            .join('');
          tableHtml += `<td><ul>${items}</ul></td>`;
        } else if (typeof value === 'object' && value !== null) {
          // Si es un objeto, mostrar sus claves y valores
          const objectEntries = Object.entries(value);
          const objectHtml = objectEntries
            .map(
              ([objKey, objValue]) => `<strong>${objKey}:</strong> ${objValue}`
            )
            .join('<br>');
          tableHtml += `<td>${objectHtml}</td>`;
        } else {
          // Mostrar valor simple
          tableHtml += `<td>${value}</td>`;
        }
      }
    });

    // Botones de acciones
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
