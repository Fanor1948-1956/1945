// ./js/logic/roleLogic.js

// Esta función guarda los permisos seleccionados en el array
export const saveSelectedSubItems = (containerId, selectedSubItems) => {
  const checkboxes = document.querySelectorAll(
    `#${containerId} input[type="checkbox"]:checked`
  );
  selectedSubItems = Array.from(checkboxes).map((checkbox) => checkbox.value); // Guardar los IDs de permisos seleccionados
  return selectedSubItems; // Retorna el array actualizado
};

// Esta función guarda un rol en la base de datos
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
      itemData._id = currentEditingItemId; // Agrega el ID al objeto para la edición
      message = await updateItemService(itemData, itemEndpoints, addItem);
    } else {
      message = await createItem(itemData, itemEndpoints, updateItem);
    }
    return message; // Retorna el mensaje de éxito
  } catch (error) {
    console.error('Error al guardar el rol:', error);
    throw new Error('Error al guardar el rol.'); // Lanza un error en caso de fallar
  }
};
