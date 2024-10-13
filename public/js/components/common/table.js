// Función para renderizar una tabla genérica
export function renderTable(headers, data, currentPage, itemsPerPage) {
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginatedData = data.slice(start, end); // Obtener los datos para la página actual

  let tableHtml = `
        <table class="table">
            <thead>
                <tr>
                    <th>#</th> <!-- Columna para numeración -->
                    ${headers.map((header) => `<th>${header}</th>`).join('')}
                    <th>Acciones</th> <!-- Columna para botones de acción -->
                </tr>
            </thead>
            <tbody>
  `;

  paginatedData.forEach((item, index) => {
    const rowNumber = start + index + 1; // Calcular el número de la fila
    tableHtml += `
        <tr>
            <td>${rowNumber}</td> <!-- Mostrar el número de la fila -->
            ${Object.values(item)
              .map((value) => `<td>${value}</td>`)
              .join('')}
            <td>
                <button class="details-button" data-id="${
                  item._id
                }" onclick="onAction('details', '${
      item._id
    }')">Ver Detalles</button>
                <button class="edit-button" data-id="${
                  item._id
                }" onclick="onAction('edit', '${item._id}')">Editar</button>
                <button class="deactivate-button" data-id="${
                  item._id
                }" onclick="onAction('deactivate', '${
      item._id
    }')">Desactivar</button>
                <button class="delete-button" data-id="${
                  item._id
                }" onclick="onAction('delete', '${item._id}')">Eliminar</button>
            </td>
        </tr>
    `;
  });

  tableHtml += `
            </tbody>
        </table>
  `;
  return tableHtml;
}
