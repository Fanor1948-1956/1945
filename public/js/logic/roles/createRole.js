import { fetchAndRenderData, fetchData } from '../../apiUserManager.js';
import { renderTable } from '../../renderTable.js';
import { loadEndpoints } from '../../endpoints/loadEndpoints.js';
import { openGenericForm, closeGenericForm } from '../../forms/genericForm.js';
import { saveResource, updateResource } from '../../api/resourceHandler.js';

const roleHeaders = {
  name: 'Nombre',
  alias: 'Alias',
  description: 'Descripción',
  permissions: 'Permisos',
  isActive: 'Estado',
};

const fields = [
  { id: 'roleName', name: 'name', label: 'Nombre' },
  { id: 'roleAlias', name: 'alias', label: 'Alias' },
  { id: 'roleDescription', name: 'description', label: 'Descripción' },
];

let selectedPermissions = []; // Variable para almacenar permisos seleccionados

export const initializeRoles = () => {
  document.addEventListener('DOMContentLoaded', () => {
    loadRoles();
    setupEventListeners();
  });
};

const loadRoles = async () => {
  const endpoint = loadEndpoints('roles', 'list');
  await fetchAndRenderData(
    endpoint,
    (data) =>
      renderTable(data.roles, roleHeaders, 'roleTableContainer', onAction),
    roleHeaders
  );
};

const setupEventListeners = () => {
  document.getElementById('addRoleBtn').addEventListener('click', () => {
    document.getElementById('modalTitle').innerText = 'Agregar Rol';
    document.getElementById('saveRoleBtn').innerText = 'Guardar'; // Cambia a "Guardar"
    document.getElementById('saveRoleBtn').dataset.mode = 'create'; // Modo creación
    selectedPermissions = []; // Reiniciar permisos seleccionados
    updateSelectedPermissionsDisplay();
    clearFormFields(fields); // Limpiar el formulario
    loadPermissionsForModal(); // Cargar permisos para el nuevo rol
    openGenericForm('#addRoleModal', fields, saveRole);
  });

  document.querySelector('.close-button').addEventListener('click', () => {
    closeGenericForm('#addRoleModal');
  });

  document
    .getElementById('editPermissionsBtn')
    .addEventListener('click', () => {
      loadPermissionsForModal(selectedPermissions); // Cargar permisos en el modal
      openModal('#permissionsModal');
    });

  document
    .getElementById('closePermissionsModal')
    .addEventListener('click', () => {
      closeModal('#permissionsModal');
    });

  document
    .getElementById('savePermissionsBtn')
    .addEventListener('click', () => {
      selectedPermissions = getSelectedPermissionsFromModal();
      updateSelectedPermissionsDisplay();
      closeModal('#permissionsModal');
    });
};

// Función para limpiar el formulario
const clearFormFields = (fields) => {
  fields.forEach((field) => {
    const input = document.querySelector(`#${field.id}`);
    if (input) {
      input.value = ''; // Limpiar el campo
    }
  });
};

const loadPermissionsForModal = async (assignedPermissions = []) => {
  const endpoint = loadEndpoints('permissions', 'list');
  const permissions = await fetchData(endpoint);

  const container = document.getElementById('permissionsContainer');
  container.innerHTML = ''; // Limpiar las opciones existentes

  permissions.forEach((permission) => {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = `permission-${permission._id}`;
    checkbox.value = permission._id;

    // Verificar si el permiso está en los permisos asignados y marcarlo si es así
    checkbox.checked = assignedPermissions.includes(permission._id);

    const label = document.createElement('label');
    label.htmlFor = checkbox.id;
    label.textContent = permission.name;

    container.appendChild(checkbox);
    container.appendChild(label);
    container.appendChild(document.createElement('br')); // Nueva línea para el formato
  });
};

const onAction = async (action, id) => {
  try {
    if (action === 'edit') {
      // Estamos en modo edición
      const endpoint = loadEndpoints('roles', 'details', id);
      const roleData = await fetchData(endpoint);

      if (roleData) {
        document.getElementById('modalTitle').innerText = 'Editar Rol';
        document.getElementById('saveRoleBtn').innerText = 'Actualizar'; // Cambia el texto a 'Actualizar'
        document.getElementById('saveRoleBtn').dataset.mode = 'edit'; // Modo edición

        // Cargar los datos del rol en el formulario
        openGenericForm(
          '#addRoleModal',
          fields,
          (updatedData) => updateRoleHandler(id, updatedData),
          roleData
        );

        // Cargar permisos específicos del rol
        selectedPermissions = roleData.permissions;
        await loadPermissionsForModal(roleData.permissions);
        updateSelectedPermissionsDisplay();
      } else {
        console.error('No se pudo recuperar el rol.');
        showSnackbar('No se pudo recuperar el rol.', false);
      }
    } else if (action === 'create') {
      // Estamos en modo de creación
      document.getElementById('modalTitle').innerText = 'Agregar Rol';
      document.getElementById('saveRoleBtn').innerText = 'Guardar'; // Cambia el texto a 'Guardar'
      document.getElementById('saveRoleBtn').dataset.mode = 'create'; // Modo creación
      selectedPermissions = []; // Reiniciar permisos seleccionados
      updateSelectedPermissionsDisplay();
      clearFormFields(fields); // Limpiar el formulario
      loadPermissionsForModal(); // Cargar permisos para el nuevo rol
      openGenericForm('#addRoleModal', fields, saveRole);
    }
  } catch (error) {
    console.error(error);
    showSnackbar(error.message || 'Error al procesar la acción.', false);
  }
};

const saveRole = async (data) => {
  const roleData = {
    ...data,
    permissions: selectedPermissions, // Solo guardar los IDs
  };

  const result = await saveResource('roles', roleData);

  if (result && result.success) {
    loadRoles(); // Recargar la tabla
    closeGenericForm('#addRoleModal'); // Cerrar el modal solo después de guardar exitosamente
    showSnackbar(result.message || 'Rol agregado correctamente.', true); // Mostrar Snackbar
  } else {
    showSnackbar(result ? result.message : 'Error al agregar el rol.', false); // Mostrar error
  }

  return result; // Devuelve el resultado
};

const updateRoleHandler = async (id, data) => {
  const roleData = {
    ...data,
    permissions: selectedPermissions, // Solo guardar los IDs
  };

  const result = await updateResource('roles', id, roleData);

  if (result && result.success) {
    loadRoles(); // Recargar la tabla
    closeGenericForm('#addRoleModal'); // Cerrar el modal solo después de actualizar exitosamente
    showSnackbar(result.message || 'Rol actualizado correctamente.', true); // Mostrar Snackbar
  } else {
    showSnackbar(
      result ? result.message : 'Error al actualizar el rol.',
      false
    ); // Mostrar error
  }

  return result; // Devuelve el resultado
};

const getSelectedPermissionsFromModal = () => {
  const selected = [];
  const checkboxes = document.querySelectorAll(
    '#permissionsContainer input[type="checkbox"]'
  );
  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      selected.push(checkbox.value); // Almacenar solo el ID del permiso
    }
  });
  return selected; // Retorna solo los IDs seleccionados
};

const updateSelectedPermissionsDisplay = () => {
  const container = document.getElementById('selectedPermissionsContainer');
  const permissionsCount = document.getElementById('permissionsCount');
  container.innerHTML = ''; // Limpiar el contenedor

  if (selectedPermissions.length === 0) {
    container.textContent = 'No hay permisos asignados.';
    permissionsCount.textContent = '(0 permisos asignados)'; // Actualizar el contador
  } else {
    const permissionNames = selectedPermissions.join(', '); // Unir solo los IDs
    container.textContent = `Permisos asignados: ${permissionNames}`;
    permissionsCount.textContent = `(${selectedPermissions.length} permisos asignados)`; // Actualizar el contador
  }
};

const openModal = (modalId) => {
  document.querySelector(modalId).style.display = 'block';
};

const closeModal = (modalId) => {
  document.querySelector(modalId).style.display = 'none';
};

// Función para mostrar Snackbar
window.showSnackbar = (message, isSuccess) => {
  const snackbar = document.getElementById('snackbar');
  snackbar.textContent = message;
  snackbar.className = isSuccess ? 'show success' : 'show error';
  setTimeout(() => {
    snackbar.className = '';
  }, 3000);
};

// Hacer que onAction sea global
window.onAction = onAction; // Esto lo hace accesible globalmente
