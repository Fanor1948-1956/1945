



export const renderSubItemsCheckboxesForSelection = (
  subItems,
  selectedSubItems,
  containerId
) => {
  const container = document.getElementById(containerId);

  if (!container) {
    console.error(`El contenedor con ID "${containerId}" no fue encontrado.`);
    return; 
  }

  container.innerHTML = ""; 

  subItems.forEach((subItem) => {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `selectSubItems-${subItem._id}`;
    checkbox.value = subItem._id;

    const label = document.createElement("label");
    label.htmlFor = checkbox.id;
    label.textContent = subItem.name;

    
    checkbox.checked = selectedSubItems.includes(subItem._id);

    container.appendChild(checkbox);
    container.appendChild(label);
    container.appendChild(document.createElement("br"));
  });
};
