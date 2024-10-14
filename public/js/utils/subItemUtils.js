

export const renderPermissionsCheckboxes = (
  permissions,
  assignedPermissions
) => {
  const container = document.getElementById('permissionsContainer');
  container.innerHTML = '';

  // Crea un conjunto de IDs de permisos asignados para búsqueda eficiente
  const assignedPermissionIds = new Set(
    assignedPermissions.map((permission) => permission._id)
  );

  permissions.forEach((permission) => {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = `permission-${permission._id}`;
    checkbox.value = permission._id;
    checkbox.name = 'permissions';

    // Marcar el checkbox si el permiso está asignado
    checkbox.checked = assignedPermissionIds.has(permission._id); // Usar Set para eficiencia

    const label = document.createElement('label');
    label.htmlFor = checkbox.id;
    label.textContent = permission.name;

    container.appendChild(checkbox);
    container.appendChild(label);
    container.appendChild(document.createElement('br'));
  });
};
