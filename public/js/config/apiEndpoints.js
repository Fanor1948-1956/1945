// js/config/apiEndpoints.js
export const BASE_URL =
  'https://8000-fanoro1956-1945-ct1ygkepe97.ws-us116.gitpod.io';

export const permissionEndpoints = {
  list: `${BASE_URL}/permissions/api`,
  create: `${BASE_URL}/permissions/create-permission`,
  update: `${BASE_URL}/permissions/update-permission`, // Si es necesario
  delete: `${BASE_URL}/permissions/delete-permission`, // Si es necesario
};

// Puedes agregar más grupos de endpoints aquí en el futuro
