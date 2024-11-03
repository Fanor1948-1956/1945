
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
    let userToDelete = null; 

    
    fetchUsers();

    
    handleUserActions();

    
    function handleUserActions() {
        
        $(document).on('click', '.edit-button', function(e) {
            e.preventDefault();
            const userId = $(this).data('user-id');
            getUserInfo(userId); 
        });

        
        $(document).on('click', '.delete-button', function() {
            const userId = $(this).data('user-id');
            const userRow = $(this).closest('tr'); 
            userToDelete = { id: userId, row: userRow }; 
            Modal.open('#deleteUserModal'); 
        });

        
        $('#confirmDeleteButton').click(function() {
            if (userToDelete) {
                deleteUser(userToDelete.id, userToDelete.row);
                Modal.close('#deleteUserModal'); 
                userToDelete = null; 
            }
        });

        
        $('#cancelDeleteButton').click(function() {
            Modal.close('#deleteUserModal'); 
            userToDelete = null; 
        });
    }

    
    function fetchUsers() {
        apiFetch('/users/getUsers', 'GET')
            .then(renderUserTable) 
            .catch(function(xhr) {
                console.error('Error al obtener los usuarios:', xhr);
            });
    }

    
    function getUserInfo(userId) {
        apiFetch(`/users/showInfo/${userId}`, 'GET')
            .then(({ user, allRoles, isPasswordHashed }) => {
                renderEditForm(user, allRoles, userId, isPasswordHashed); 
                Modal.open('#editUserModal'); 
            })
            .catch(() => {
                showSnackbar('Error al obtener el formulario de edición', false);
            });
    }

    
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
                fetchUsers(); 
                setTimeout(() => {
                    Modal.close('#editUserModal'); 
                }, 2000);
            })
            .catch(xhr => {
                const errorMessage = xhr.responseJSON && xhr.responseJSON.message ? xhr.responseJSON.message : 'Error al actualizar el usuario';
                showSnackbar(errorMessage, false);
            });
    });

    
    function deleteUser(userId, userRow) {
        apiFetch(`/users/${userId}`, 'DELETE')
            .then(response => {
                if (response.message) {
                    showSnackbar(response.message, true); 
                }
                userRow.remove(); 
            })
            .catch(xhr => {
                const errorMessage = xhr.responseJSON && xhr.responseJSON.message 
                    ? xhr.responseJSON.message 
                    : 'Error al eliminar el usuario'; 
                showSnackbar(errorMessage, false); 
            });
    }
});

</script>





const bcrypt = require('bcrypt');
const roleModel = require('../models/roleModel');
const { User } = require('../models/userModel');
const { resolveRole } = require('../services/roleService');


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


exports.updateUser = async (req, res) => {
  const { userId } = req.params; 
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



