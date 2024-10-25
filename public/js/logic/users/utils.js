import { closeModal, openModal } from '../../components/custom/modal.js';
import { getState } from '../../reducers/state.js';
import { renderSubItemsCheckboxesForSelection } from '../../utils/subItemUtils.js';
import { saveSelectedSubItems } from '../itemLogic/index.js';

let selectedRoles = [];

// Abrir modal de roles
export const openRolesModal = () => {
  const { roles } = getState();
  renderSubItemsCheckboxesForSelection(roles, selectedRoles, 'rolesContainer');
  openModal('selectRolesModal', 'medium', 'Seleccionar Roles');
};

// Guardar roles seleccionados
export const saveRolesHandler = () => {
  selectedRoles = saveSelectedSubItems('rolesContainer', selectedRoles);
  closeModal('selectRolesModal');
};
