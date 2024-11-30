
import {
  fetchRoles,
  createRole,
  updateRoleService,
} from '../services/roleService.js';
import { fetchPermissions } from '../services/permissionService.js';
import { getState } from '../reducers/state.js';
import { renderTable } from '../renderTable.js';
import { renderSubItemsCheckboxesForSelection } from '../utils/subItemUtils.js';
import {
  clearFormFields,
  clearSelectionsAndArray,
  resetFormFields,
} from '../utils/formUtils.js';
import { saveSelectedSubItems, saveItem } from '../logic/itemLogic/index.js';


const roleHeaders = {
  name: 'Nombre',
  alias: 'Alias',
  description: 'Descripción',
  permissions: 'Permisos',
  isActive: 'Estado',
};

let currentEditingRoleId = null;
let selectedPermissions = [];


export const loadRoles = async () => {
  await fetchRoles();
  const { roles } = getState();
  renderTable(roles, roleHeaders, 'roleTableContainer', onAction);
};


export const clearRoleForm = () => {
  clearFormFields('roleForm');
  clearSelectionsAndArray('permissionsContainer', selectedPermissions);
};


export const onAction = async (action, id) => {
  const roles = getState().roles;
  const selectedRole = roles.find((role) => role._id === id);

  if (action === 'edit') {
    resetFormFields(['roleName', 'roleAlias', 'roleDescription']);
    document.getElementById('roleName').value = selectedRole.name;
    document.getElementById('roleAlias').value = selectedRole.alias;
    document.getElementById('roleDescription').value = selectedRole.description;
    currentEditingRoleId = id;

    await loadPermissions();

    selectedPermissions = selectedRole.permissions.map((p) => p._id);
    document.getElementById('permissionsModalTitle').textContent =
      'Modificar Permisos';
    Modal.open('#addRoleModal');
  }
};


export const loadPermissions = async () => {
  await fetchPermissions();
  const { permissions } = getState();
  renderSubItemsCheckboxesForSelection(
    permissions,
    selectedPermissions,
    'permissionsContainer'
  );
};


export const saveItemHandler = async () => {
  const name = document.getElementById('roleName').value.trim();
  const alias = document.getElementById('roleAlias').value.trim();
  const description = document.getElementById('roleDescription').value.trim();

  if (!name || !alias || selectedPermissions.length === 0) {
    showSnackbar(
      'Por favor, complete todos los campos y seleccione al menos un permiso.',
      false
    );
    return;
  }

  const data = { name, alias, description, permissions: selectedPermissions };

  try {
    const message = await saveItem(
      data,
      currentEditingRoleId,
      updateRoleService,
      createRole
    );
    if (message) {
      Modal.close('#addRoleModal');
      await loadRoles();
      showSnackbar(message, true);
    } else {
      showSnackbar('Error al guardar el rol.', false);
    }
  } catch (error) {
    showSnackbar(error.message, false);
  }
};


export const openPermissionsModal = () => {
  const { permissions } = getState();
  renderSubItemsCheckboxesForSelection(
    permissions,
    selectedPermissions,
    'permissionsContainer'
  );
  Modal.open('#selectPermissionsModal');
};


export const savePermissionsHandler = () => {
  selectedPermissions = saveSelectedSubItems(
    'permissionsContainer',
    selectedPermissions
  );
  Modal.close('#selectPermissionsModal');
};
