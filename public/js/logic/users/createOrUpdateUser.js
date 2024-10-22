// userHandlers.js

import {

  createService,
  updateService,
} from '../../services/index.js';
import { userEndpoints } from '../../config/apiEndpoints.js';
import { addUser, updateUser } from '../../reducers/userReducer.js';
import { saveItem } from '../itemLogic/index.js';

let currentEditingUserId = null; // Variable para almacenar el ID del usuario en edición
let selectedRoles = []; // Array para almacenar roles seleccionados

export const saveItemHandler = async (loadUsersList) => {
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
      await loadUsersList(); // Llama a loadUsersList aquí
      showSnackbar(message, true);
    } else {
      showSnackbar('Error al guardar el usuario.', false);
    }
  } catch (error) {
    showSnackbar(error.message, false);
  }
};
