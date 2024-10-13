import { permissionEndpoints } from '../config/apiEndpoints.js';

// Esta función devuelve el endpoint adecuado según el tipo de recurso y acción
export function loadEndpoints(resource, action) {
  const endpoints = {
    permissions: permissionEndpoints,
    // Puedes agregar más recursos aquí en el futuro
  };

  if (!endpoints[resource]) {
    throw new Error(`Recurso no válido: ${resource}`);
  }

  const resourceEndpoints = endpoints[resource];

  switch (action) {
    case 'list':
      return resourceEndpoints.list;
    case 'create':
      return resourceEndpoints.create;
    case 'update':
      return resourceEndpoints.update;
    case 'delete':
      return resourceEndpoints.delete;
    default:
      throw new Error('Acción no válida');
  }
}
