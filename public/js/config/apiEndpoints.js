export const BASE_URL =
  'https://6000-fanor19481956-1945-7e1k25j94um.ws-us116.gitpod.io';

export const permissionEndpoints = {
  list: `${BASE_URL}/permissions/api`,
  create: `${BASE_URL}/permissions/create-permission`,
  update: `${BASE_URL}/permissions/update-permission`,
  delete: `${BASE_URL}/permissions/delete`,
};

export const roleEndpoints = {
  list: `${BASE_URL}/roles/api`,
  create: `${BASE_URL}/roles/create-role`,
  update: `${BASE_URL}/roles/update-role`,
  delete: `${BASE_URL}/roles/delete`,
};

export const userEndpoints = {
  list: `${BASE_URL}/users/getUsers`,
  create: `${BASE_URL}/users/create`,
  update: `${BASE_URL}/users/update`,
  delete: `${BASE_URL}/users/delete`,
};

export const profileEndpoints = {
  get: `${BASE_URL}/api/profile`,
  update: `${BASE_URL}/api/update-profile`, // Si es necesario
};

export const uploadEndpoints = {
  add: `${BASE_URL}/upload/upload-add`,
  get: `${BASE_URL}/upload`, // Si es necesario

  delete: `${BASE_URL}/upload/delete`, // Si es necesario
};

export const specialtyEndpoints = {
  list: `${BASE_URL}/specialties/api`,
  create: `${BASE_URL}/specialties/create-specialty`,
  update: `${BASE_URL}/specialties/update-specialty`,
  delete: `${BASE_URL}/specialties/delete`,
};
