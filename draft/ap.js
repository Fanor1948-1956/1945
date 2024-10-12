
<hr />

<!-- Botón para agregar un nuevo usuario -->
<button id="addUserButton">Agregar Usuario</button>

<section>
    <div id="userTableContainer"></div>
</section>

<div id="snackbar" class="snackbar"></div>

<!-- Modal para editar usuarios -->
<div id="editUserModal" class="modal">
    <div class="modal-content">
        <span class="close-button">&times;</span>
        <h2>Editar Usuario</h2>
        <div id="modalFormContainer"></div> <!-- Contenedor para el formulario -->
    </div>
</div>
<!-- Modal para confirmar eliminación de usuarios -->
<div id="deleteUserModal" class="modal">
    <div class="modal-content">
        <span class="close-button">&times;</span>
        <h2>Confirmar Eliminación</h2>
        <p>¿Estás seguro de que deseas eliminar este usuario?</p>
        <button id="confirmDeleteButton">Confirmar</button>
        <button id="cancelDeleteButton">Cancelar</button>
    </div>
</div>

<script>
$(document).ready(function() {
    let userToDelete = null; // Variable para almacenar el usuario que se desea eliminar

    // Obtener usuarios cuando se carga la página
    fetchUsers();

    // Eventos para manejar acciones de usuario
    handleUserActions();

    // Función para manejar las acciones de usuario
    function handleUserActions() {
        // Evento para editar un usuario
        $(document).on('click', '.edit-button', function(e) {
            e.preventDefault();
            const userId = $(this).data('user-id');
            getUserInfo(userId); // Obtener datos del usuario
        });

        // Evento para eliminar un usuario
        $(document).on('click', '.delete-button', function() {
            const userId = $(this).data('user-id');
            const userRow = $(this).closest('tr'); // Obtener la fila del usuario
            userToDelete = { id: userId, row: userRow }; // Almacenar información del usuario a eliminar
            Modal.open('#deleteUserModal'); // Abrir el modal de confirmación
        });

        // Manejar el evento de confirmación de eliminación
        $('#confirmDeleteButton').click(function() {
            if (userToDelete) {
                deleteUser(userToDelete.id, userToDelete.row);
                Modal.close('#deleteUserModal'); // Cerrar el modal después de confirmar
                userToDelete = null; // Reiniciar la variable
            }
        });

        // Manejar el evento de cancelación de eliminación
        $('#cancelDeleteButton').click(function() {
            Modal.close('#deleteUserModal'); // Cerrar el modal sin eliminar
            userToDelete = null; // Reiniciar la variable
        });
    }

    // Función para obtener usuarios desde el servidor y renderizar la tabla
    function fetchUsers() {
        apiFetch('/users/getUsers', 'GET')
            .then(renderUserTable) // Llama a la función renderUserTable
            .catch(function(xhr) {
                console.error('Error al obtener los usuarios:', xhr);
            });
    }

    // Función para obtener información del usuario
    function getUserInfo(userId) {
        apiFetch(`/users/showInfo/${userId}`, 'GET')
            .then(({ user, allRoles, isPasswordHashed }) => {
                renderEditForm(user, allRoles, userId, isPasswordHashed); // Renderizar formulario de edición
                Modal.open('#editUserModal'); // Abrir el modal de edición
            })
            .catch(() => {
                showSnackbar('Error al obtener el formulario de edición', false);
            });
    }

    // Renderizar el formulario de edición
    function renderEditForm(user, allRoles, userId, isPasswordHashed) {
        const rolesHtml = allRoles.map(role => `
            <label>
                <input type="checkbox" name="roles" value="${role._id}" 
                    ${user.roles.some(userRole => userRole.name === role.name) ? 'checked' : ''}>
                ${role.name}
            </label>
        `).join('');

        $('#modalFormContainer').html(`
            <form id="userUpdateForm" data-user-id="${userId}">
                <label for="name">Nombre:</label>
                <input type="text" id="name" name="name" value="${user.name}" required ${isPasswordHashed ? 'disabled' : ''}>
                <label for="surnames">Apellidos:</label>
                <input type="text" id="surnames" name="surnames" value="${user.surnames}" required ${isPasswordHashed ? 'disabled' : ''}>
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" value="${user.email}" required ${isPasswordHashed ? 'disabled' : ''}>
                <label for="gender">Género:</label>
                <select id="gender" name="gender" required ${isPasswordHashed ? 'disabled' : ''}>
                    <option value="masculino" ${user.gender === 'masculino' ? 'selected' : ''}>Masculino</option>
                    <option value="femenino" ${user.gender === 'femenino' ? 'selected' : ''}>Femenino</option>
                    <option value="otro" ${user.gender === 'otro' ? 'selected' : ''}>Otro</option>
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
    $(document).on('submit', '#userUpdateForm', function(e) {
        e.preventDefault();
        const userId = $(this).data('user-id');

        const userData = {
            name: $('#name').val(),
            surnames: $('#surnames').val(),
            email: $('#email').val(),
            gender: $('#gender').val(),
            roles: $('input[name="roles"]:checked').map(function() {
                return this.value;
            }).get()
        };

        apiFetch(`/users/update/${userId}`, 'PUT', userData)
            .then(response => {
                showSnackbar(response.message, true);
                fetchUsers(); // Refrescar la lista de usuarios
                setTimeout(() => {
                    Modal.close('#editUserModal'); // Cerrar después de 2 segundos
                }, 2000);
            })
            .catch(xhr => {
                const errorMessage = xhr.responseJSON && xhr.responseJSON.message ? xhr.responseJSON.message : 'Error al actualizar el usuario';
                showSnackbar(errorMessage, false);
            });
    });

    // Función para eliminar un usuario
    function deleteUser(userId, userRow) {
        apiFetch(`/users/${userId}`, 'DELETE')
            .then(response => {
                if (response.message) {
                    showSnackbar(response.message, true); // Mostrar mensaje de éxito
                }
                userRow.remove(); // Eliminar la fila de la tabla directamente
            })
            .catch(xhr => {
                const errorMessage = xhr.responseJSON && xhr.responseJSON.message 
                    ? xhr.responseJSON.message 
                    : 'Error al eliminar el usuario'; // Mensaje predeterminado si no hay respuesta
                showSnackbar(errorMessage, false); // Mostrar mensaje de error
            });
    }
});

</script>



// controllers/userController.js

const bcrypt = require('bcrypt');
const roleModel = require('../models/roleModel');
const { User } = require('../models/userModel');
const { resolveRole } = require('../services/roleService');

// Crear un nuevo usuario
exports.createUser = async (req, res) => {
  const {
    name,
    surnames,
    email,
    password,
    gender,
    roles,
    ...additionalProperties
  } = req.body;
  const rolesArray = roles || [];

  try {
    // Verificar roles válidos
    const rolesFound = await roleModel.find({ _id: { $in: rolesArray } });
    if (rolesFound.length === 0) {
      return res
        .status(400)
        .json({ message: 'No se encontraron roles válidos.' });
    }

    const UserType = resolveRole(rolesFound);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ message: 'El correo electrónico no es válido.' });
    }

    // Hashear la contraseña
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new UserType({
      name,
      surnames,
      email,
      password: hashedPassword,
      gender,
      roles: rolesFound,
      ...additionalProperties,
    });

    await newUser.save();
    return res.status(201).json({ message: 'Usuario creado exitosamente' });
  } catch (error) {
    console.error('Error al crear el usuario:', error);
    return res.status(500).json({ message: 'Error al crear el usuario' });
  }
};

// Obtener todos los usuarios
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().populate('roles');

    if (req.xhr || req.accepts('application/json')) {
      return res.status(200).json(users);
    } else {
      return res.render('pages/privatePages/users/list.njk', { users });
    }
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    return res.status(500).send('Error al obtener los usuarios');
  }
};

// Actualizar un usuario
exports.updateUser = async (req, res) => {
  const { userId } = req.params; // Asegúrate de que estás pasando el userId
  const updateData = req.body;

  try {
    const user = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }
    return res
      .status(200)
      .json({ message: 'Usuario actualizado exitosamente.', user });
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    return res.status(500).json({ message: 'Error al actualizar el usuario.' });
  }
};

// Eliminar un usuario
exports.deleteUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }
    return res.status(200).json({ message: 'Usuario eliminado exitosamente.' });
  } catch (error) {
    console.error('Error al eliminar el usuario:', error);
    return res.status(500).json({ message: 'Error al eliminar el usuario.' });
  }
};



