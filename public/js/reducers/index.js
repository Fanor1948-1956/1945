import { setState, getState } from './state.js';




export const loadItems = (itemsResponse) => {
  if (Array.isArray(itemsResponse.items)) {
    setState({ items: itemsResponse.items }); 
    console.log('Estado después de cargar items:', getState());
  } else {
    console.error(
      'loadItems: La respuesta no contiene un array de items',
      itemsResponse
    );
  }
};
export const loadSpecialties = (specialtiesResponse) => {
  if (Array.isArray(specialtiesResponse.specialties)) {
    setState({ specialties: specialtiesResponse.specialties }); 
    console.log('Estado después de cargar items:', getState());
  } else {
    console.error(
      'loadItems: La respuesta no contiene un array de items',
      specialtiesResponse
    );
  }
};



export const addItem = (newItem) => {
  const currentState = getState();
  
  if (Array.isArray(currentState.items)) {
    setState({ items: [...currentState.items, newItem] });
  } else {
    console.error(
      'addItem: currentState.items no es un array',
      currentState.items
    );
  }
};


export const updateItem = (updatedItem) => {
  const currentState = getState();
  const updatedItems = currentState.items.map((item) =>
    item._id === updatedItem._id ? updatedItem : item
  );
  setState({ items: updatedItems });
};


export const deleteItem = (itemId) => {
  const currentState = getState();
  const updatedItems = currentState.items.filter((item) => item._id !== itemId);
  setState({ items: updatedItems });
};
