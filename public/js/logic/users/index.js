import { getState } from '../../reducers/state.js';
import { fetchRoles } from '../../services/loadFetchs.js';
import { userEndpoints } from '../../config/apiEndpoints.js';
import {
  clearFormFields,
  clearSelectionsAndArray,
  resetFormFields,
} from '../../components/forms/formUtils.js';
import { saveSelectedSubItems, saveItem } from '../../logic/itemLogic/index.js';
import {
  createService,
  updateService,
  deleteService,
} from '../../services/index.js';
import { addUser, updateUser, deleteUser } from '../../reducers/userReducer.js';
import { openModal, closeModal } from '../../components/custom/modal.js';
import { renderSubItemsCheckboxesForSelection } from '../../utils/subItemUtils.js';
import {
  collectFormData,
  fillUserForm,
  setFieldsState,
  validateFormData,
} from './useForm.js';

let currentEditingUserId = null;
let selectedRoles = [];

// Configura los event listeners
export const setupEventListeners = (loadUsersList) => {
  console.log('Configurando escuchadores de eventos...');

  document
    .getElementById('addUserBtn')
    .addEventListener('click', handleAddItem);
  // Cambiado aquí
  document
    .getElementById('userForm')
    .addEventListener('submit', (event) =>
      handleFormSubmit(event, loadUsersList)
    ); // Pasando la función correctamente

  document;
  document
    .getElementById('selectRolesBtn')
    .addEventListener('click', openRolesModal);
  document
    .getElementById('saveRolesBtn')
    .addEventListener('click', saveRolesHandler);
  document
    .getElementById('selectGenderBtn')
    .addEventListener('click', openGenderModal);
  document
    .getElementById('saveGenderBtn')
    .addEventListener('click', saveGenderHandler);

  document
    .getElementById('confirmDeleteButton')
    .addEventListener('click', async () => {
      await handleDeleteItem(loadUsersList);
    });
};

// Función para manejar el modal de añadir usuario
export const handleAddItem = async () => {
  currentEditingUserId = null;
  clearUserForm();
  await loadsRoles(); // Cargar roles antes de abrir el modal
  openModal('addUserModal', 'medium', 'Agregar Usuario');
};

// Limpia el formulario de usuario
const clearUserForm = () => {
  clearFormFields('userForm');
  clearSelectionsAndArray('rolesContainer', selectedRoles);
  setFieldsState(false);
};

// Cargar roles desde la base de datos y renderizar checkboxes
const loadsRoles = async () => {
  console.log('Cargando roles disponibles...');
  await fetchRoles(); // Asegúrate de que esta función esté correctamente implementada
  const { roles } = getState();
  renderSubItemsCheckboxesForSelection(roles, selectedRoles, 'rolesContainer');
};

// Maneja el envío del formulario con onsubmit
const handleFormSubmit = async (event, loadUsersList) => {
  event.preventDefault(); // Evita el envío predeterminado del formulario

  const data = collectFormData(selectedRoles);
  if (!validateFormData(data)) return;

  try {
    const message = await saveItem(
      data,
      currentEditingUserId,
      updateService,
      createService,
      userEndpoints,
      addUser,
      updateUser
    );
    closeModal('addUserModal');
    await loadUsersList(); // Refresca la lista de usuarios
    showSnackbar(message, true); // Muestra un mensaje de éxito
  } catch (error) {
    showSnackbar(error.message, false); // Muestra un mensaje de error
  }
};

// Abrir modal de género
const openGenderModal = () => {
  const currentGender = document.getElementById('userGender').value;
  if (currentGender) {
    document.querySelector(
      `input[name="gender"][value="${currentGender}"]`
    ).checked = true;
  }
  openModal('selectGenderModal', 'medium', 'Seleccionar Género');
};

// Guardar género seleccionado
const saveGenderHandler = () => {
  const selectedGender = document.querySelector(
    'input[name="gender"]:checked'
  ).value;
  document.getElementById('userGender').value = selectedGender;
  closeModal('selectGenderModal');
};

// Abrir modal de roles
const openRolesModal = () => {
  const { roles } = getState();
  renderSubItemsCheckboxesForSelection(roles, selectedRoles, 'rolesContainer');
  openModal('selectRolesModal', 'medium', 'Seleccionar Roles');
};

// Guardar roles seleccionados
const saveRolesHandler = () => {
  selectedRoles = saveSelectedSubItems('rolesContainer', selectedRoles);
  closeModal('selectRolesModal');
};

// Manejar eliminación de usuario
const handleDeleteItem = async (loadUsersList) => {
  try {
    const message = await deleteService(
      currentEditingUserId,
      userEndpoints,
      deleteUser
    );
    await loadUsersList();
    showSnackbar(message, true);
  } catch (error) {
    showSnackbar(error.message || 'Error al eliminar el usuario.', false);
  }
  closeModal('deleteItemModal');
};

// Manejar edición de usuario
export const handleEditItem = async (user) => {
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

export const handleDeleteModalItem = (id) => {
  currentEditingUserId = id;
  openModal('deleteItemModal', 'medium', 'Confirmar Eliminación');
};
