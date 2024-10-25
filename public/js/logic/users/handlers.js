import { openModal } from "../../components/custom/modal.js";
import { clearUserForm, loadsRoles } from "./index.js";
import { fillUserForm, setFieldsState } from "./useForm.js";

 export const handleAddUser = async (currentEditingUserId) => {
  currentEditingUserId = null;
  clearUserForm();
  await loadsRoles(); // Cargar roles antes de abrir el modal
  openModal('addUserModal', 'medium', 'Agregar Usuario');
};


export const handleEditUser = async (user,currentEditingUserId,selectedRoles) => {
  resetFormFields([
    'userName',
    'userSurnames',
    'userEmail',
    'userPassword',
    'userGender',
  ]);
  fillUserForm(user);
  currentEditingUserId = user._id;

  const isPasswordHashed = user.password && user.password !== '';
  setFieldsState(isPasswordHashed);

  await loadsRoles();
  selectedRoles = user.roles.map((role) => role._id); // Asegúrate de que los roles seleccionados se carguen correctamente
  openModal('addUserModal', 'medium', 'Editar Usuario');
};