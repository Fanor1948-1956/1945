import { fetchAndRenderData } from '../../apiUserManager.js'; // Ruta al archivo correcto
import { renderTable } from '../../renderTable.js'; // Ruta correcta

const roleHeaders = {
  name: 'Nombre',
  alias: 'Alias',
  description: 'Descripción',
  permissions: 'Permisos',
  isActive: 'Estado',
};

document.addEventListener('DOMContentLoaded', async () => {
  await loadRoles();
});

const loadRoles = async () => {
  const endpoint =
    'https://8000-fanoro1956-1945-4egy30l5tp8.ws-us116.gitpod.io/roles/api'; // Asegúrate de que esta ruta es correcta
  const data = await fetchAndRenderData(endpoint);
  if (data && data.roles) {
    renderTable(data.roles, roleHeaders, 'roleTableContainer');
  }
};
