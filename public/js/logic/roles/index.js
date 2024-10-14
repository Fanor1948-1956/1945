// roleForm.js

import { createRole, updateRoleService } from '../../services/roleService.js';

import {
  loadPermissions,
  markSelectedPermissions,
} from '../permissions/index.js';

let currentEditingRoleId = null; // Variable para almacenar el ID del rol en edición

export const setupRoleForm = () => {
  document.getElementById('addRoleBtn').addEventListener('click', () => {
    currentEditingRoleId = null; // Reinicia la variable al abrir el modal
    clearRoleForm();
    loadPermissions(); // Cargar permisos antes de abrir el modal
    document.getElementById('modalTitle').textContent = 'Agregar Rol';
    Modal.open('#addRoleModal'); // Abre el modal para agregar rol
  });

  document.getElementById('saveRoleBtn').addEventListener('click', saveRole);
};

const clearRoleForm = () => {
  document.getElementById('roleName').value = '';
  document.getElementById('roleAlias').value = '';
  document.getElementById('roleDescription').value = '';
  clearPermissionsSelection(); // Limpiar selección de permisos
};

const clearPermissionsSelection = () => {
  const checkboxes = document.querySelectorAll(
    '#rolePermissionsContainer input[type="checkbox"]'
  );
  checkboxes.forEach((checkbox) => (checkbox.checked = false));
};

const saveRole = async () => {
  const name = document.getElementById('roleName').value.trim();
  const alias = document.getElementById('roleAlias').value.trim();
  const description = document.getElementById('roleDescription').value.trim();
  const permissions = Array.from(
    document.querySelectorAll(
      '#rolePermissionsContainer input[type="checkbox"]:checked'
    )
  ).map((checkbox) => checkbox.value);

  if (!name || !alias || permissions.length === 0) {
    showSnackbar(
      'Por favor, complete todos los campos y seleccione al menos un permiso.',
      false
    );
    return;
  }

  const data = { name, alias, description, permissions };

  try {
    let message;
    if (currentEditingRoleId) {
      data._id = currentEditingRoleId; // Agrega el ID al objeto para la edición
      message = await updateRoleService(data);
    } else {
      message = await createRole(data);
    }

    if (message) {
      Modal.close('#addRoleModal');
      await loadRoles(); // Actualizar la lista de roles
      showSnackbar(message, true);
    } else {
      showSnackbar('Error al guardar el rol.', false);
    }
  } catch (error) {
    console.error('Error al guardar el rol:', error);
    showSnackbar('Error al guardar el rol.', false);
  }
};

export const editRole = (selectedRole) => {
  document.getElementById('roleName').value = selectedRole.name;
  document.getElementById('roleAlias').value = selectedRole.alias;
  document.getElementById('roleDescription').value = selectedRole.description;
  currentEditingRoleId = selectedRole._id; // Guarda el ID del rol que se está editando

  // Cargar permisos desde la base de datos
  loadPermissions().then(() => {
    // Marcar los permisos seleccionados previamente
    markSelectedPermissions(selectedRole.permissions);
  });

  document.getElementById('modalTitle').textContent = 'Editar Rol';
  Modal.open('#addRoleModal');
};
