// users.js
import { renderTable } from '..//components/common/table.js';
import { renderPagination } from '../components/common/pagination.js';

let currentPage = 1; // Página actual
const usersPerPage = 5; // Número de usuarios por página
let allUsers = []; // Almacenar todos los usuarios

export const loadUsersList = async (roleFilter = null) => {
  try {
    const response = await apiFetch('/users/getUsers', 'GET');
    allUsers = response.users; // Almacena todos los usuarios
    console.log(allUsers);
    // Filtrar usuarios por el rol si se proporciona
    const filteredUsers = roleFilter
      ? allUsers.filter((user) =>
          user.roles.some((role) => role.name === roleFilter)
        )
      : allUsers;

    renderUsers(filteredUsers);
  } catch (error) {
    console.error('Error al cargar la lista de usuarios:', error);
    showSnackbar('Error al cargar los usuarios', false);
  }
};

const renderUsers = (users) => {
  const startIndex = (currentPage - 1) * usersPerPage;
  const paginatedUsers = users.slice(startIndex, startIndex + usersPerPage); // Paginación

  const tableData = paginatedUsers.map((user) => ({
    _id: user._id,
    name: user.name,
    surnames: user.surnames,
    email: user.email,
    roles: user.roles.map((role) => role.name).join(', '),
  }));

  const headers = ['Nombre', 'Apellido', 'Correo', 'Roles'];

  const tableHtml = renderTable(headers, tableData, currentPage, usersPerPage);
  const paginationHtml = renderPagination(
    currentPage,
    users.length,
    usersPerPage,
    handlePageChange
  );

  const userTableContainer = document.getElementById('userTableContainer');
  userTableContainer.innerHTML = tableHtml + paginationHtml; // Renderiza la tabla y la paginación
};

const handlePageChange = (newPage) => {
  currentPage = newPage; // Actualiza la página actual
  loadUsersList(); // Vuelve a cargar la lista de usuarios con el rol actual
};
