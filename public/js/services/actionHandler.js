// actionHandler.js
import { openGenericForm } from '../forms/genericForm.js';
import { fetchEntity, updateEntity } from './endpointService.js';

export const handleAction = (
  entityType,
  action,
  id,
  setFormValues,
  updateTable
) => {
  switch (action) {
    case 'edit':
      editEntityAction(entityType, id, setFormValues, updateTable);
      break;
    case 'deactivate':
      deactivateEntity(entityType, id, updateTable); // Implementar lógica para desactivar
      break;
    case 'details':
      viewEntityDetails(entityType, id); // Implementar lógica para ver detalles
      break;
  }
};

const editEntityAction = async (entityType, id, setFormValues, updateTable) => {
  const entity = await fetchEntity(entityType, id);
  if (entity) {
    setFormValues(entity);
    openGenericForm('#addEntityModal', null, async (data) => {
      const success = await updateEntity(entityType, id, data);
      if (success) {
        showSnackbar('Entidad actualizada correctamente.', true);
        updateTable(); // Recargar la tabla
      }
    });
    document.getElementById('modalTitle').innerText = 'Editar Entidad'; // Título del modal
  }
};

const deactivateEntity = async (entityType, id, updateTable) => {
  // Implementar lógica para desactivar
  const endpoint = loadEndpoints(entityType, `deactivate/${id}`);
  const success = await apiFetch(endpoint, 'PUT'); // Asumiendo que usas PUT para desactivar
  if (success) {
    showSnackbar('Entidad desactivada correctamente.', true);
    updateTable(); // Recargar la tabla
  }
};

const viewEntityDetails = async (entityType, id) => {
  const entity = await fetchEntity(entityType, id);
  // Mostrar detalles en un modal o en otro lugar en tu interfaz
  console.log(entity); // O reemplaza esto con lógica para mostrar los detalles
};
