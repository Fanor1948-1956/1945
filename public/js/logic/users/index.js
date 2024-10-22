
import { getState } from '../../reducers/state.js';
import { fetchRoles } from '../../services/loadFetchs.js';
import { userEndpoints } from '../../config/apiEndpoints.js';
import {
  clearFormFields,
  clearSelectionsAndArray,
  resetFormFields
} from '../../components/forms/formUtils.js';
import {
  saveSelectedSubItems,
  saveItem,
} from '../../logic/itemLogic/index.js'; 
  import {

    createService,
    updateService,
    deleteService,
  } from '../../services/index.js';
    import {
     
      addUser,
      updateUser,
      deleteUser,
    } from '../../reducers/userReducer.js';
import { openModal, closeModal } from '../../components/custom/modal.js';
  import { renderSubItemsCheckboxesForSelection } from '../../utils/subItemUtils.js';
let currentEditingUserId = null; // Variable para almacenar el ID del usuario en edición
let selectedRoles = []; // Array para almacenar roles seleccionados
export const setupEventListeners = (loadUsersList) => {
  console.log('Configurando escuchadores de eventos...');
  document.getElementById('addUserBtn').addEventListener('click', () => {
    currentEditingUserId = null; // Reinicia la variable al abrir el modal
    clearUserForm('userForm');

    loadsRoles(); // Cargar roles antes de abrir el modal
    openModal('addUserModal', 'medium', 'Agregar Usuario'); // Modo agregar
    console.log('Abriendo modal para agregar:', currentEditingUserId);
  });

  document
    .getElementById('saveItemBtn')
    .addEventListener('click', () => saveItemHandler(loadUsersList)); // Llama a la función con loadUsersList
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

  // Manejar confirmación de eliminación
  document
    .getElementById('confirmDeleteButton')
    .addEventListener('click', async () => {
      console.log(
        'Confirmando eliminación del usuario con ID:',
        currentEditingUserId
      );
      try {
        const message = await deleteService(
          currentEditingUserId,
          userEndpoints,
          deleteUser
        );
        await loadUsersList();
        showSnackbar(message, true); // Mostrar mensaje de éxito
      } catch (error) {
        showSnackbar(error.message || 'Error al eliminar el usuario.', false);
      }
      closeModal('deleteUserModal'); // Cerrar el modal después de eliminar
    });
};

const setFieldsState = (isEditing) => {
  // Habilitar o deshabilitar campos según la acción
  document.getElementById('userName').disabled = isEditing;
  document.getElementById('userSurnames').disabled = isEditing;
  document.getElementById('userEmail').disabled = isEditing;
  document.getElementById('userPassword').disabled = false; // Siempre habilitar el campo de contraseña
  document.getElementById('userGender').disabled = isEditing;
};

export const onAction = async (action, id) => {
  const users = getState().users;
  const selectedUser = users.find((user) => user._id === id);
  console.log('selectedUser', selectedUser);

  if (action === 'edit') {
    // Cargar datos del usuario para editar
    resetFormFields([
      'userName',
      'userSurnames',
      'userEmail',
      'userPassword',
      'userGender',
    ]);

    document.getElementById('userName').value = selectedUser.name;
    document.getElementById('userSurnames').value = selectedUser.surnames;
    document.getElementById('userEmail').value = selectedUser.email;
    document.getElementById('userPassword').value = selectedUser.password;
    document.getElementById('userGender').value = selectedUser.gender;
    currentEditingUserId = id; // Guarda el ID del usuario que se está editando

    // Deshabilitar campos si la contraseña está hasheada
    const isPasswordHashed =
      selectedUser.password && selectedUser.password !== '';
    setFieldsState(isPasswordHashed); // Llama a la nueva función para habilitar/deshabilitar campos

    console.log('isPasswordHashed', isPasswordHashed);

    // Cargar roles desde la base de datos
    await loadsRoles();
    selectedRoles = selectedUser.roles.map((r) => r._id);

    openModal('addUserModal', 'medium', 'Editar Usuario'); // Cambia el título a "Editar Usuario"
  } else if (action === 'delete') {
    currentEditingUserId = id;
    console.log('Abriendo modal de eliminación para el ID:', id);
    openModal('deleteUserModal', 'medium', 'Confirmar Eliminación');
  } else if (action === 'add') {
    // Para agregar un nuevo usuario
    clearUserForm(); // Limpia el formulario antes de abrir el modal
    setFieldsState(false); // Habilita todos los campos
    openModal('addUserModal', 'medium', 'Agregar Usuario'); // Cambia el título a "Agregar Usuario"
  }
};

const clearUserForm = () => {
  clearFormFields('userForm'); // Limpiar todos los campos del formulario
  clearSelectionsAndArray('rolesContainer', selectedRoles); // Limpia las selecciones y el array de roles seleccionados
  setFieldsState(false); // Asegúrate de habilitar todos los campos
};

const loadsRoles = async () => {
  console.log('Cargando roles disponibles...');
  await fetchRoles();
  const { roles } = getState();
  console.log('Roles cargados:', roles);
  renderSubItemsCheckboxesForSelection(roles, selectedRoles, 'rolesContainer');
};

const saveItemHandler = async (loadUsersList) => {
  console.log('Guardando item...');
  const name = document.getElementById('userName').value.trim();
  const surnames = document.getElementById('userSurnames').value.trim();
  const email = document.getElementById('userEmail').value.trim();
  const password = document.getElementById('userPassword').value.trim();
  const gender = document.getElementById('userGender').value.trim();

  if (
    !name ||
    !surnames ||
    !email ||
    !password ||
    !gender ||
    selectedRoles.length === 0
  ) {
    showSnackbar(
      'Por favor, complete todos los campos y seleccione al menos un rol.',
      false
    );
    return;
  }

  const data = {
    name,
    surnames,
    email,
    password,
    gender,
    roles: selectedRoles,
  };
  console.log('Datos a guardar:', data);

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
    if (message) {
      closeModal('addUserModal');

      await loadUsersList();
      showSnackbar(message, true);
    } else {
      showSnackbar('Error al guardar el usuario.', false);
    }
  } catch (error) {
    showSnackbar(error.message, false);
  }
};

const openGenderModal = () => {
  const currentGender = document.getElementById('userGender').value;
  if (currentGender) {
    document.querySelector(
      `input[name="gender"][value="${currentGender}"]`
    ).checked = true;
  }
  console.log(
    'Abriendo modal de selección de género con el género actual:',
    currentGender
  );
  openModal('selectGenderModal', 'medium', 'Seleccionar Género');
};

const saveGenderHandler = () => {
  const selectedGender = document.querySelector(
    'input[name="gender"]:checked'
  ).value; // Obtiene el género seleccionado
  document.getElementById('userGender').value = selectedGender;
  console.log('Género seleccionado guardado:', selectedGender);
  closeModal('selectGenderModal'); // Cierra el modal
};

const openRolesModal = () => {
  const { roles } = getState();
  console.log('Abriendo modal de selección de roles...');
  renderSubItemsCheckboxesForSelection(roles, selectedRoles, 'rolesContainer');
  openModal('selectRolesModal', 'medium', 'Seleccionar Roles');
};

const saveRolesHandler = () => {
  selectedRoles = saveSelectedSubItems('rolesContainer', selectedRoles);
  console.log('Roles seleccionados guardados:', selectedRoles);
  closeModal('selectRolesModal');
};