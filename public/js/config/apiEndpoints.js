// js/config/apiEndpoints.js
export const BASE_URL =
  'https://8000-fanoro1956-1945-ct1ygkepe97.ws-us116.gitpod.io';

export const permissionEndpoints = {
  list: `${BASE_URL}/permissions/api`,
  create: `${BASE_URL}/permissions/create-permission`,
  update: `${BASE_URL}/permissions/update-permission`, // Si es necesario
  delete: `${BASE_URL}/permissions/delete`, // Si es necesario
};

export const roleEndpoints = {
  list: `${BASE_URL}/roles/api`,
  create: `${BASE_URL}/roles/create-role`,
  update: `${BASE_URL}/roles/update-role`, // Si es necesario
  delete: `${BASE_URL}/roles/delete`, // Si es necesario
};

export const specialtyEndpoints = {
  list: `${BASE_URL}/specialties/api`,
  create: `${BASE_URL}/specialties/create-specialty`,
  update: `${BASE_URL}/specialties/update-specialty`, // Si es necesario
  delete: `${BASE_URL}/specialties/delete`, // Si es necesario
};

// Puedes agregar más grupos de endpoints aquí en el futuro
