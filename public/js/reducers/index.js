import { setState, getState } from './state.js';

// Cargar items en el estado
// Cargar items en el estado
// itemReducer.js
export const loadItems = (itemsResponse) => {
  if (Array.isArray(itemsResponse.items)) {
    setState({ items: itemsResponse.items }); // Asigna correctamente el array de items
    console.log('Estado después de cargar items:', getState());
  } else {
    console.error(
      'loadItems: La respuesta no contiene un array de items',
      itemsResponse
    );
  }
};

// Agregar un nuevo rol (incluyendo permisos)
// Agregar un nuevo rol (incluyendo permisos)
export const addItem = (newItem) => {
  const currentState = getState();
  // Verifica que items sea un array antes de intentar agregar un nuevo rol
  if (Array.isArray(currentState.items)) {
    setState({ items: [...currentState.items, newItem] });
  } else {
    console.error(
      'addItem: currentState.items no es un array',
      currentState.items
    );
  }
};

// Actualizar un rol existente (incluyendo permisos)
export const updateItem = (updatedItem) => {
  const currentState = getState();
  const updatedItems = currentState.items.map((item) =>
    item._id === updatedItem._id ? updatedItem : item
  );
  setState({ items: updatedItems });
};

// Eliminar un rol
export const deleteItem = (itemId) => {
  const currentState = getState();
  const updatedItems = currentState.items.filter((item) => item._id !== itemId);
  setState({ items: updatedItems });
};
