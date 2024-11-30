


export const renderCheckboxesForSelection = (
  items,
  selectedItems,
  containerId,
  itemIdKey,
  itemNameKey
) => {
  const container = document.getElementById(containerId);
  container.innerHTML = ''; 

  items.forEach((item) => {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = `selectItem-${item[itemIdKey]}`;
    checkbox.value = item[itemIdKey];

    const label = document.createElement('label');
    label.htmlFor = checkbox.id;
    label.textContent = item[itemNameKey];

    
    checkbox.checked = selectedItems.includes(item[itemIdKey]);

    container.appendChild(checkbox);
    container.appendChild(label);
    container.appendChild(document.createElement('br'));
  });
};
