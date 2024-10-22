

import { setupRoleForm, editRole } from '../../logic/roles/index.js';
import { fetchRoles } from '../../services/roleService.js';
import { renderTable } from '../../renderTable.js';
import { getState } from '../../reducers/state.js';

export const setupModalEvents = () => {
  document.addEventListener('DOMContentLoaded', async () => {
    await loadRoles();
    setupRoleForm();
  });
};

const loadRoles = async () => {
  await fetchRoles();
  const { roles } = getState();
  renderTable(roles, onAction); 
};

const onAction = (action, id) => {
  const roles = getState().roles;
  const selectedRole = roles.find((role) => role._id === id);

  if (action === 'edit') {
    editRole(selectedRole); 
  }
};
