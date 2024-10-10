$(document).ready(function () {
  // Evento para editar un usuario
  $(document).on('click', '.edit-button', function (e) {
    e.preventDefault();
    const userId = $(this).data('user-id');
    getUserInfo(userId); // Obtener datos del usuario
  });

  // Obtener información del usuario
  function getUserInfo(userId) {
    $.ajax({
      url: `/users/showInfo/${userId}`,
      type: 'GET',
      success: function ({ user, allRoles, isPasswordHashed }) {
        renderEditForm(user, allRoles, userId, isPasswordHashed);
        $('#editUserModal').fadeIn(); // Abrir el modal de edición
      },
      error: function () {
        showSnackbar('Error al obtener el formulario de edición', false);
      },
    });
  }

  // Renderizar el formulario de edición
  function renderEditForm(user, allRoles, userId, isPasswordHashed) {
    const rolesHtml = allRoles
      .map(
        (role) => `
              <label>
                  <input type="checkbox" name="roles" value="${role._id}" 
                      ${
                        user.roles.some(
                          (userRole) => userRole.name === role.name
                        )
                          ? 'checked'
                          : ''
                      }>
                  ${role.name}
              </label>
          `
      )
      .join('');

    $('#modalFormContainer').html(`
              <form id="userUpdateForm" data-user-id="${userId}">
                  <label for="name">Nombre:</label>
                  <input type="text" id="name" name="name" value="${
                    user.name
                  }" required ${isPasswordHashed ? 'disabled' : ''}>
                  <label for="surnames">Apellidos:</label>
                  <input type="text" id="surnames" name="surnames" value="${
                    user.surnames
                  }" required ${isPasswordHashed ? 'disabled' : ''}>
                  <label for="email">Email:</label>
                  <input type="email" id="email" name="email" value="${
                    user.email
                  }" required ${isPasswordHashed ? 'disabled' : ''}>
                  <label for="gender">Género:</label>
                  <select id="gender" name="gender" required ${
                    isPasswordHashed ? 'disabled' : ''
                  }>
                      <option value="masculino" ${
                        user.gender === 'masculino' ? 'selected' : ''
                      }>Masculino</option>
                      <option value="femenino" ${
                        user.gender === 'femenino' ? 'selected' : ''
                      }>Femenino</option>
                      <option value="otro" ${
                        user.gender === 'otro' ? 'selected' : ''
                      }>Otro</option>
                  </select>
                  <fieldset>
                      <legend>Roles:</legend>
                      ${rolesHtml}
                  </fieldset>
                  <button type="submit">Actualizar Usuario</button>
              </form>
          `);
  }

  // Envío del formulario de edición
  $(document).on('submit', '#userUpdateForm', function (e) {
    e.preventDefault();
    const userId = $(this).data('user-id');

    const userData = {
      name: $('#name').val(),
      surnames: $('#surnames').val(),
      email: $('#email').val(),
      gender: $('#gender').val(),
      roles: $('input[name="roles"]:checked')
        .map(function () {
          return this.value;
        })
        .get(),
    };

    $.ajax({
      url: `/users/update/${userId}`,
      type: 'PUT',
      contentType: 'application/json',
      data: JSON.stringify(userData),
      success: function (response) {
        showSnackbar(response.message, true);
        fetchUsers(); // Refrescar la lista de usuarios
        setTimeout(() => {
          $('#editUserModal').fadeOut(); // Cerrar después de 2 segundos
        }, 2000);
      },
      error: function (xhr) {
        const errorMessage =
          xhr.responseJSON && xhr.responseJSON.message
            ? xhr.responseJSON.message
            : 'Error al actualizar el usuario';
        showSnackbar(errorMessage, false);
      },
    });
  });
});
