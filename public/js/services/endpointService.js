// endpointService.js
import { registerData, updateData } from '../apiUserManager.js';
import { loadEndpoints } from '../endpoints/loadEndpoints.js';

export const createEntity = async (entityType, data) => {
  const endpoint = loadEndpoints(entityType, 'create');
  return await registerData(endpoint, data);
};

export const updateEntity = async (entityType, id, data) => {
  const endpoint = loadEndpoints(entityType, `update/${id}`);
  return await updateData(endpoint, data);
};

export const fetchEntity = async (entityType, id) => {
  const endpoint = loadEndpoints(entityType, `get/${id}`);
  const response = await fetch(endpoint);
  return response.json();
};

export const fetchEntities = async (entityType) => {
  const endpoint = loadEndpoints(entityType, 'list');
  const response = await fetch(endpoint);
  return response.json();
};
