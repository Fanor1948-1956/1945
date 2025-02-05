export const setView = (
  viewType,
  filteredUsers,
  roleAlias,
  currentPage,
  usersPerPage
) => {
  localStorage.setItem('currentView', viewType); // Guarda la vista seleccionada

  // Obtén los headers y renderizador según el rol
  const headers = getHeadersForRole(roleAlias);
  const renderer = getRendererForRole(roleAlias);

  // Renderiza los elementos en la vista seleccionada
  renderItems(
    viewType,
    filteredUsers,
    headers,
    currentPage,
    usersPerPage,
    document.getElementById('contentContainer'),
    renderer
  );
};
