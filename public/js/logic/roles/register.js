

export function RegisterRole(fetchRoles) {
  let selectedPermissions = []; 
  let permissionsData = []; 

  
  $('#addRoleButton').click(function () {
    renderCreateRoleForm(); 
    Modal.open('#createRoleModal'); 
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

  
  $(document).on('submit', '#roleCreateForm', function (e) {
    e.preventDefault();

    const newRoleData = {
      name: $('#name').val(),
      alias: $('#alias').val(),
      description: $('#description').val(),
      permissions: selectedPermissions, 
    };

    apiFetch('/roles/create-role', 'POST', newRoleData)
      .then((response) => {
        showSnackbar(response.message, true);
        fetchRoles(); 
        Modal.close('#createRoleModal'); 
      })
      .catch((xhr) => {
        const errorMessage =
          xhr.responseJSON && xhr.responseJSON.message
            ? xhr.responseJSON.message
            : 'Error al crear el rol';
        showSnackbar(errorMessage, false);
      });
  });

  
  $(document).on('click', '#selectPermissionsButton', function () {
    loadPermissions(); 
    Modal.open('#permissionsModal'); 
  });

  
  function loadPermissions() {
    apiFetch('/permissions/api', 'GET')
      .then((permissions) => {
        permissionsData = permissions; 
        const permissionsHtml = permissions
          .map((permission) => {
            const isChecked = selectedPermissions.includes(permission._id)
              ? 'checked'
              : ''; 
            return `
                            <label>
                                <input type="checkbox" name="selectedPermissions" value="${permission._id}" ${isChecked}>
                                ${permission.name}
                            </label>
                        `;
          })
          .join('');
        $('#permissionsContainer').html(permissionsHtml); 
        updatePermissionCount(); 
      })
      .catch((xhr) => {
        const errorMessage =
          xhr.responseJSON && xhr.responseJSON.error
            ? xhr.responseJSON.error
            : 'Error al obtener los permisos';
        showSnackbar(errorMessage, false);
      });
  }

  
  $(document).on('change', 'input[name="selectedPermissions"]', function () {
    const permissionId = this.value;

    if (this.checked) {
      selectedPermissions.push(permissionId); 
    } else {
      selectedPermissions = selectedPermissions.filter(
        (id) => id !== permissionId
      ); 
    }

    updatePermissionCount(); 
  });

  
  function updatePermissionCount() {
    $('#selectPermissionsButton').text(
      `Permisos (${selectedPermissions.length})`
    ); 
    updateSelectedPermissionsDisplay(); 
  }

  
  function updateSelectedPermissionsDisplay() {
    const selectedNames = permissionsData
      .filter((permission) => selectedPermissions.includes(permission._id))
      .map((permission) => permission.name); 

    $('#selectedPermissionsContainer').html(selectedNames.join(', ')); 
  }

  
  $(document).on('click', '#savePermissionsButton', function () {
    Modal.close('#permissionsModal'); 
  });
}
