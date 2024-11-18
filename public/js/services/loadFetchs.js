import {
  permissionEndpoints,
  roleEndpoints,
  specialtyEndpoints,
} from '../config/apiEndpoints.js';
import { loadPermissions } from '../reducers/permissionReducer.js';
import { loadRoles } from '../reducers/roleReducer.js';
import { loadSpecialties } from '../reducers/index.js';
import { fetchAndRenderData } from '../api/common/apiUserManager.js';

export const fetchPermissions = async () => {
  try {
    const response = await fetchAndRenderData(permissionEndpoints.list);
    console.log(response);
    loadPermissions(response);
  } catch (error) {
    console.error('Error fetching permissions:', error);
  }
};
export const fetchRoles = async () => {
  try {
    const response = await fetchAndRenderData(roleEndpoints.list);
    console.log('response', response);

    loadRoles(response);
  } catch (error) {
    console.error('Error al obtener items:', error);
  }
};

export const fetchSpecialty = async () => {
  try {
    const response = await fetchAndRenderData(specialtyEndpoints.list);
    console.log('response', response);

    loadSpecialties(response);
  } catch (error) {
    console.error('Error al obtener items:', error);
  }
};
