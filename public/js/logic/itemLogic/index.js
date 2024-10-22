


export const saveSelectedSubItems = (containerId, selectedSubItems) => {
  const checkboxes = document.querySelectorAll(
    `#${containerId} input[type="checkbox"]:checked`
  );
  selectedSubItems = Array.from(checkboxes).map((checkbox) => checkbox.value); 
  return selectedSubItems; 
};


export const saveItem = async (
  itemData,
  currentEditingItemId,
  updateItemService,
  createItem,
  itemEndpoints,
  addItem,
  updateItem
) => {
  try {
    let message;
    if (currentEditingItemId) {
      itemData._id = currentEditingItemId; 
      message = await updateItemService(itemData, itemEndpoints, addItem);
    } else {
      message = await createItem(itemData, itemEndpoints, updateItem);
    }
    return message; 
  } catch (error) {
    console.error('Error al guardar el rol:', error);
    throw new Error('Error al guardar el rol.'); 
  }
};
