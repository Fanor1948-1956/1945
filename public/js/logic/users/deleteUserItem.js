import { deleteService } from '../../services/index.js';
import { getState } from '../../reducers/state.js';
import { deleteUser } from '../../reducers/userReducer.js';
import { showSnackbar } from '../../components/common/Snackbar.js';

export const deleteUserItem = async (currentEditingUserId) => {
  const { userEndpoints } = getState();

  try {
    const message = await deleteService(
      currentEditingUserId,
      userEndpoints,
      deleteUser
    );
    showSnackbar(message, true); 
  } catch (error) {
    showSnackbar(error.message || 'Error al eliminar el usuario.', false);
  }
};
