// subItemsUtils.js

/**
 * Renderizar los checkboxes de subItem en el contenedor.
 * @param {Array} subItems - Lista de subItem a renderizar.
 * @param {Array} selectedSubItems - Lista de subItem seleccionados.
 * @param {string} containerId - ID del contenedor donde se renderizarán los checkboxes.
 */

export const renderSubItemsCheckboxesForSelection = (
  subItems,
  selectedSubItems,
  containerId
) => {
  const container = document.getElementById(containerId);

  if (!container) {
    console.error(`El contenedor con ID "${containerId}" no fue encontrado.`);
    return; // Salir de la función si el contenedor no existe
  }

  container.innerHTML = ""; // Limpiar cualquier contenido previo

  subItems.forEach((subItem) => {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `selectSubItems-${subItem._id}`;
    checkbox.value = subItem._id;

    const label = document.createElement("label");
    label.htmlFor = checkbox.id;
    label.textContent = subItem.name;

    // Marcar el checkbox si el permiso está en la selección actual
    checkbox.checked = selectedSubItems.includes(subItem._id);

    container.appendChild(checkbox);
    container.appendChild(label);
    container.appendChild(document.createElement("br"));
  });
};
