import { getState } from "../../reducers/state.js";
import { handleAddUser, handleDeleteModal, handleEditUser } from "./index.js";

export const onAction = async (action, id) => {
  const users = getState().users;
  const selectedUser = users.find((user) => user._id === id);

  if (action === 'edit') {
    await handleEditUser(selectedUser);
  } else if (action === 'add') {
    handleAddUser();
  } else if (action === 'delete') {
    handleDeleteModal(id);
  }
};
