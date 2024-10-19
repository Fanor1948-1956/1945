// roleRegistration.js

export function RegisterRole(fetchRoles) {
  let selectedPermissions = []; // Array para mantener los permisos seleccionados
  let permissionsData = []; // Array para almacenar los permisos y sus nombres

  // Manejar evento para abrir el modal de registrar rol
  $('#addRoleButton').click(function () {
    renderCreateRoleForm(); // Renderizar formulario de creación
    Modal.open('#createRoleModal'); // Abrir el modal de creación
  });

  function renderCreateRoleForm() {
    $('#createRoleFormContainer').html(`
            <form id="roleCreateForm" class="form-container">
                <label for="name">Nombre del Rol:</label>
                <input type="text" id="name" name="name" required>

                <label for="alias">Alias:</label>
                <input type="text" id="alias" name="alias" required>

                <label for="description">Descripción:</label>
                <textarea id="description" name="description"></textarea>

                <fieldset>
                    <legend>Permisos:</legend>
                    <button type="button" id="selectPermissionsButton">Permisos (0)</button> <!-- Cambiar texto aquí -->
                    <div id="selectedPermissionsContainer"></div> <!-- Contenedor para mostrar permisos seleccionados -->
                </fieldset>
                
                <button type="submit">Crear Rol</button>
            </form>
        `);
  }

  // Manejar el envío del formulario de creación
  $(document).on('submit', '#roleCreateForm', function (e) {
    e.preventDefault();

    const newRoleData = {
      name: $('#name').val(),
      alias: $('#alias').val(),
      description: $('#description').val(),
      permissions: selectedPermissions, // Usar permisos seleccionados
    };

    apiFetch('/roles/create-role', 'POST', newRoleData)
      .then((response) => {
        showSnackbar(response.message, true);
        fetchRoles(); // Refrescar la lista de roles
        Modal.close('#createRoleModal'); // Cerrar el modal de creación
      })
      .catch((xhr) => {
        const errorMessage =
          xhr.responseJSON && xhr.responseJSON.message
            ? xhr.responseJSON.message
            : 'Error al crear el rol';
        showSnackbar(errorMessage, false);
      });
  });

  // Manejar clic en el botón "Permisos"
  $(document).on('click', '#selectPermissionsButton', function () {
    loadPermissions(); // Cargar y mostrar los permisos
    Modal.open('#permissionsModal'); // Abrir el modal de permisos
  });

  // Cargar permisos en el modal
  function loadPermissions() {
    apiFetch('/permissions/api', 'GET')
      .then((permissions) => {
        permissionsData = permissions; // Guardar los permisos obtenidos
        const permissionsHtml = permissions
          .map((permission) => {
            const isChecked = selectedPermissions.includes(permission._id)
              ? 'checked'
              : ''; // Verificar si el permiso está seleccionado
            return `
                            <label>
                                <input type="checkbox" name="selectedPermissions" value="${permission._id}" ${isChecked}>
                                ${permission.name}
                            </label>
                        `;
          })
          .join('');
        $('#permissionsContainer').html(permissionsHtml); // Cargar permisos en el contenedor
        updatePermissionCount(); // Actualizar el contador de permisos seleccionados
      })
      .catch((xhr) => {
        const errorMessage =
          xhr.responseJSON && xhr.responseJSON.error
            ? xhr.responseJSON.error
            : 'Error al obtener los permisos';
        showSnackbar(errorMessage, false);
      });
  }

  // Manejar cambios en los checkboxes de permisos
  $(document).on('change', 'input[name="selectedPermissions"]', function () {
    const permissionId = this.value;

    if (this.checked) {
      selectedPermissions.push(permissionId); // Agregar permiso si está seleccionado
    } else {
      selectedPermissions = selectedPermissions.filter(
        (id) => id !== permissionId
      ); // Remover permiso si está deseleccionado
    }

    updatePermissionCount(); // Actualizar el contador de permisos seleccionados
  });

  // Función para actualizar el contador de permisos seleccionados
  function updatePermissionCount() {
    $('#selectPermissionsButton').text(
      `Permisos (${selectedPermissions.length})`
    ); // Actualizar el texto del botón
    updateSelectedPermissionsDisplay(); // Actualizar la visualización de permisos seleccionados
  }

  // Función para mostrar los permisos seleccionados en el formulario
  function updateSelectedPermissionsDisplay() {
    const selectedNames = permissionsData
      .filter((permission) => selectedPermissions.includes(permission._id))
      .map((permission) => permission.name); // Obtener nombres de los permisos seleccionados

    $('#selectedPermissionsContainer').html(selectedNames.join(', ')); // Mostrar nombres en el contenedor
  }

  // Guardar permisos seleccionados
  $(document).on('click', '#savePermissionsButton', function () {
    Modal.close('#permissionsModal'); // Cerrar el modal de permisos
  });
}
