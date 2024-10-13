// updateRole.js

import { updateResource } from '../../api/resourceHandler.js';

export const updateRoleHandler = async (id, data) => {
  const roleData = {
    ...data,
    permissions: selectedPermissions,
  };

  const result = await updateResource('roles', id, roleData);

  if (result && result.success) {
    loadRoles();
    closeGenericForm('#addRoleModal');
    showSnackbar(result.message || 'Rol actualizado correctamente.', true);
  } else {
    showSnackbar(
      result ? result.message : 'Error al actualizar el rol.',
      false
    );
  }

  return result;
};
