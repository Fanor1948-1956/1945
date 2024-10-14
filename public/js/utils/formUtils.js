// js/utils/formUtils.js
import { toggleCheckboxes } from './checkboxUtils.js'; // Asegúrate de importar toggleCheckboxes

export const clearRoleForm = () => {
  document.getElementById('roleName').value = '';
  document.getElementById('roleAlias').value = '';
  document.getElementById('roleDescription').value = '';
  clearPermissionsSelection();
};

export const clearPermissionsSelection = () => {
  const checkboxes = document.querySelectorAll(
    '#rolePermissionsContainer input[type="checkbox"]'
  );
  checkboxes.forEach((checkbox) => (checkbox.checked = false));
};

export const markSelectedPermissions = (assignedPermissions) => {
  const assignedPermissionIds = assignedPermissions.map(
    (permission) => permission._id
  );
  toggleCheckboxes('rolePermissionsContainer', assignedPermissionIds); // Usar la función importada
};

// js/utils/formUtils.js

export const renderSubitems = (items, containerId, itemType) => {
  const container = document.getElementById(containerId);
  container.innerHTML = '';

  items.forEach((item) => {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = `${itemType}-${item._id}`;
    checkbox.value = item._id;
    checkbox.name = itemType;

    const label = document.createElement('label');
    label.htmlFor = checkbox.id;
    label.textContent = item.name;

    container.appendChild(checkbox);
    container.appendChild(label);
    container.appendChild(document.createElement('br'));
  });
};
