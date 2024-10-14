// js/utils/roleActions.js

import { createRole, updateRoleService } from '../../services/roleService.js';

export const saveRole = async (currentEditingRoleId, formData) => {
  const { name, alias, description, permissions } = formData;

  if (!name || !alias || permissions.length === 0) {
    showSnackbar(
      'Por favor, complete todos los campos y seleccione al menos un permiso.',
      false
    );
    return;
  }

  const data = { name, alias, description, permissions };

  try {
    let message;
    if (currentEditingRoleId) {
      data._id = currentEditingRoleId; // Agrega ID al objeto para la edición
      message = await updateRoleService(data); // Llama a la función de actualización
    } else {
      message = await createRole(data); // Llama a la función de creación
    }

    return message; // Retorna el mensaje de éxito o error
  } catch (error) {
    console.error('Error al guardar el rol:', error);
    showSnackbar('Error al guardar el rol.', false);
  }
};
