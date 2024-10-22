

import { fetchPermissions } from '../../services/permissionService.js';
import { getState } from '../../reducers/state.js';

export const loadPermissions = async () => {
  await fetchPermissions(); 
  const { permissions } = getState();
  renderPermissionsCheckboxes(permissions);
};

const renderPermissionsCheckboxes = (permissions) => {
  const container = document.getElementById('rolePermissionsContainer');
  container.innerHTML = ''; 

  permissions.forEach((permission) => {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = `permission-${permission._id}`;
    checkbox.value = permission._id;
    checkbox.name = 'permissions';

    const label = document.createElement('label');
    label.htmlFor = checkbox.id;
    label.textContent = permission.name;

    container.appendChild(checkbox);
    container.appendChild(label);
    container.appendChild(document.createElement('br'));
  });
};

export const markSelectedPermissions = (assignedPermissions) => {
  const checkboxes = document.querySelectorAll(
    '#rolePermissionsContainer input[type="checkbox"]'
  );
  const assignedPermissionIds = assignedPermissions.map(
    (permission) => permission._id
  );

  checkboxes.forEach((checkbox) => {
    checkbox.checked = assignedPermissionIds.includes(checkbox.value);
  });
};
