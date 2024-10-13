export function renderTable(data, columnHeaders, containerId, onAction) {
  // Verifica si hay datos para mostrar
  if (!data || data.length === 0) {
    document.getElementById(containerId).innerHTML =
      '<p>No hay datos disponibles.</p>';
    return;
  }

  let tableHtml = `
    <table>
      <thead>
        <tr>
          <th>#</th>
  `;

  // Crear encabezados de columna
  Object.keys(columnHeaders).forEach((key) => {
    tableHtml += `<th>${columnHeaders[key]}</th>`;
  });

  tableHtml += `<th>Acciones</th>`;
  tableHtml += '</tr></thead><tbody>';

  // Crear filas de la tabla
  data.forEach((item, index) => {
    tableHtml += '<tr>';
    tableHtml += `<td>${index + 1}</td>`; // Numeración empieza desde 1

    Object.keys(columnHeaders).forEach((key) => {
      const value = item[key];

      // Manejo de arrays (como permisos)
      if (Array.isArray(value)) {
        const listItems = value
          .map((perm) => `<li>${perm.name || perm._id || perm}</li>`) // Usa name o id
          .join('');
        tableHtml += `<td><ul>${listItems}</ul></td>`;
      }
      // Manejo de objetos
      else if (typeof value === 'object' && value !== null) {
        tableHtml += `<td>${renderObject(value)}</td>`; // Renderizar el objeto
      }
      // Mostrar valor simple o vacío si no existe
      else {
        tableHtml += `<td>${value !== undefined ? value : ''}</td>`;
      }
    });

    // Añadir botones de acción
    tableHtml += `
      <td>
        <button class="details-button" data-id="${item._id}" onclick="onAction('details', '${item._id}')">Ver Detalles</button>
        <button class="edit-button" data-id="${item._id}" onclick="onAction('edit', '${item._id}')">Editar</button>
        <button class="deactivate-button" data-id="${item._id}" onclick="onAction('deactivate', '${item._id}')">Desactivar</button>
      </td>
    `;
    tableHtml += '</tr>';
  });

  tableHtml += '</tbody></table>';
  document.getElementById(containerId).innerHTML = tableHtml; // Renderiza la tabla en el contenedor
}

// Función para renderizar objetos anidados
function renderObject(obj) {
  // Si es un array, renderizar cada elemento
  if (Array.isArray(obj)) {
    return `<ul>${obj
      .map((item) => `<li>${renderObject(item)}</li>`)
      .join('')}</ul>`;
  }
  // Si es un objeto, mostrar sus propiedades
  if (typeof obj === 'object' && obj !== null) {
    return Object.entries(obj)
      .map(([key, value]) => `<strong>${key}:</strong> ${renderObject(value)}`)
      .join('<br>');
  }
  // Devolver el valor si es simple
  return obj !== undefined ? obj : '';
}
