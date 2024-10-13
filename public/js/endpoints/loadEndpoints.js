// loadEndpoints.js

export const BASE_URL_PERMISSIONS =
  'https://8000-fanoro1956-1945-4egy30l5tp8.ws-us116.gitpod.io/permissions';
export const BASE_URL_ROLES =
  'https://8000-fanoro1956-1945-4egy30l5tp8.ws-us116.gitpod.io/roles'; // Asegúrate de que esta URL sea correcta

export function loadEndpoints(resource, action, id) {
  const endpoints = {
    permissions: {
      list: `${BASE_URL_PERMISSIONS}/api`,
      create: `${BASE_URL_PERMISSIONS}/create-permission`,
      update: (id) => `${BASE_URL_PERMISSIONS}/update-permission/${id}`,
      delete: (id) => `${BASE_URL_PERMISSIONS}/delete-permission/${id}`,
      details: (id) => `${BASE_URL_PERMISSIONS}/details-permission/${id}`,
      deactivate: (id) => `${BASE_URL_PERMISSIONS}/${id}/deactivate-permission`,
      activate: (id) => `${BASE_URL_PERMISSIONS}/${id}/activate-permission`,
    },
    roles: {
      create: `${BASE_URL_ROLES}/create-role`,
      list: `${BASE_URL_ROLES}/api`,
      details: (id) => `${BASE_URL_ROLES}/detail-role/${id}`,
      update: (id) => `${BASE_URL_ROLES}/update-role/${id}`,
      deactivate: (id) => `${BASE_URL_ROLES}/${id}/deactivate`,
      activate: (id) => `${BASE_URL_ROLES}/${id}/activate`,
      delete: (id) => `${BASE_URL_ROLES}/delete/${id}`,
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
