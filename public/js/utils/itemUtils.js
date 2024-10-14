// itemUtils.js

/**
 * Renderizar checkboxes para una lista de ítems en un contenedor.
 * @param {Array} items - Lista de ítems a renderizar.
 * @param {Array} selectedItems - Lista de ítems seleccionados.
 * @param {string} containerId - ID del contenedor donde se renderizarán los checkboxes.
 * @param {string} itemIdKey - Clave para identificar el ID único del ítem (ej. '_id', 'id').
 * @param {string} itemNameKey - Clave para el nombre o texto a mostrar de cada ítem (ej. 'name', 'title').
 */
export const renderCheckboxesForSelection = (
  items,
  selectedItems,
  containerId,
  itemIdKey,
  itemNameKey
) => {
  const container = document.getElementById(containerId);
  container.innerHTML = ''; // Limpiar cualquier contenido previo

  items.forEach((item) => {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = `selectItem-${item[itemIdKey]}`;
    checkbox.value = item[itemIdKey];

    const label = document.createElement('label');
    label.htmlFor = checkbox.id;
    label.textContent = item[itemNameKey];

    // Marcar el checkbox si el ítem está en la selección actual
    checkbox.checked = selectedItems.includes(item[itemIdKey]);

    container.appendChild(checkbox);
    container.appendChild(label);
    container.appendChild(document.createElement('br'));
  });
};
