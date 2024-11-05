import { getState } from '../../reducers/state.js';

export const onAction = async (action, id, state, handlers) => {
  const items = getState()[state];
  const selectedItem = items.find((item) => item._id === id);

  if (action === 'edit') {
    await handlers.handleEditItem(selectedItem);
  } else if (action === 'add') {
    handlers.handleAddItem();
  } else if (action === 'delete') {
    handlers.handleDeleteModalItem(id);
  }
};
