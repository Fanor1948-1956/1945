// loadEndpoints.js

export const BASE_URL =
  'https://8000-fanoro1956-1945-4egy30l5tp8.ws-us116.gitpod.io/permissions';
export function loadEndpoints(resource, action, id) {
  const endpoints = {
    permissions: {
      list: `${BASE_URL}/api`,
      create: `${BASE_URL}/create-permission`,
      update: (id) => `${BASE_URL}/update-permission/${id}`,
      delete: (id) => `${BASE_URL}/delete-permission/${id}`,
      details: (id) => `${BASE_URL}/details-permission/${id}`, // Endpoint para detalles
      deactivate: (id) => `${BASE_URL}/${id}/deactivate-permission`,
      activate: (id) => `${BASE_URL}/${id}/activate-permission`,
    },
  };

  // Verifica si el recurso es válido
  if (!endpoints[resource]) {
    throw new Error(`Recurso no válido: ${resource}`);
  }

  const resourceEndpoints = endpoints[resource];

  // Manejo de acciones
  if (action in resourceEndpoints) {
    return typeof resourceEndpoints[action] === 'function'
      ? resourceEndpoints[action](id) // Pasa el id si es necesario
      : resourceEndpoints[action];
  } else {
    throw new Error(`Acción no válida: ${action}`);
  }
}
