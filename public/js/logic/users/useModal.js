// src/userManagement/userModals.js

import { openModal, closeModal } from '../../components/custom/modal.js';
import { renderSubItemsCheckboxesForSelection } from '../../utils/subItemUtils.js';
import { getState } from '../../reducers/state.js';


let selectedRoles = [];

// Abrir modal de roles
export const openRolesModal = (selectedRoles) => {
  const { roles } = getState();
  renderSubItemsCheckboxesForSelection(roles, selectedRoles, 'rolesContainer');
  openModal('selectRolesModal', 'medium', 'Seleccionar Roles');
};

// Guardar roles seleccionados
export const saveRolesHandler = (selectedRoles) => {
  selectedRoles = saveSelectedSubItems('rolesContainer', selectedRoles);
  closeModal('selectRolesModal');
};

// Abrir modal de género
export const openGenderModal = () => {
  const currentGender = document.getElementById('userGender').value;
  if (currentGender) {
    document.querySelector(
      `input[name="gender"][value="${currentGender}"]`
    ).checked = true;
  }
  openModal('selectGenderModal', 'medium', 'Seleccionar Género');
};

// Guardar género seleccionado
export const saveGenderHandler = () => {
  const selectedGender = document.querySelector(
    'input[name="gender"]:checked'
  ).value;
  document.getElementById('userGender').value = selectedGender;
  closeModal('selectGenderModal');
};

// Abrir modal de confirmación para eliminar
export const handleDeleteModal = (id, currentEditingUserId) => {
  currentEditingUserId = id;
  openModal('deleteUserModal', 'medium', 'Confirmar Eliminación');
};

// Otras funciones relacionadas con los modales...
