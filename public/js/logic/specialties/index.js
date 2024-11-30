// specialtyLogic.js
import { saveItem } from '../../logic/itemLogic/index.js';
import {
  addSpecialty,
  updateSpecialty,
  deleteSpecialty,
} from '../../reducers/index.js';
import { createService, updateService } from '../../services/index.js';
import { getState } from '../../reducers/state.js';
import { specialtyEndpoints } from '../../config/apiEndpoints.js';
import { confirmDelete } from '../../utils/confirmDelete.js';
import { createCustomInputs } from '../../components/custom/input.js';
import { specialtyInputConfigs } from '../../dinamic/input/private/pages/inputSpecialty.js';

let currentEditingSpecialtyId = null;

// Inicializar inputs en el modal
export const initializeModalInputs = () => {
  const inputContainer = document.getElementById('inputContainer');
  inputContainer.innerHTML = '';
  const inputs = createCustomInputs(specialtyInputConfigs);
  inputContainer.appendChild(inputs);
};

// Configuración de event listeners
export const setupEventListeners = (loadSpecialtiesData) => {
  document.getElementById('addSpecialtyBtn').addEventListener('click', () => {
    initializeModalInputs();
    Modal.open('#addSpecialtyModal');
  });

  document
    .getElementById('saveSpecialtyBtn')
    .addEventListener('click', async () => {
      await saveSpecialty(loadSpecialtiesData); // Pasamos la función de recarga para actualizar la tabla después de guardar
    });
};
export const onAction = (action, id, loadSpecialtiesData) => {
  const specialties = getState().specialties;
  const selectedSpecialty = specialties.find(
    (specialty) => specialty._id === id
  );

  if (!selectedSpecialty) {
    console.error(`No se encontró la especialidad con id: ${id}`);
    return;
  }

  if (action === 'edit') {
    document.getElementById('specialtyName').value = selectedSpecialty.name;
    document.getElementById('specialtyDescription').value =
      selectedSpecialty.description;
    currentEditingSpecialtyId = id;
    Modal.open('#addSpecialtyModal');
  } else if (action === 'delete') {
    confirmDelete(
      id,
      specialtyEndpoints,
      'especialidad',
      loadSpecialtiesData,
      deleteSpecialty
    );
  }
};

// Guardar especialidad
export const saveSpecialty = async (loadSpecialtiesData) => {
  const name = document.getElementById('specialtyName').value.trim();
  const description = document
    .getElementById('specialtyDescription')
    .value.trim();

  if (!name || !description) {
    showSnackbar('Por favor, complete todos los campos.', false);
    return;
  }

  const data = { name, description };
  try {
    const message = await saveItem(
      data,
      currentEditingSpecialtyId,
      updateService,
      createService,
      specialtyEndpoints,
      addSpecialty,
      updateSpecialty
    );

    if (message) {
      currentEditingSpecialtyId = null;
      Modal.close('#addSpecialtyModal');
      loadSpecialtiesData(); // Se llama aquí para refrescar la lista
      showSnackbar(message, true);
    }
  } catch (error) {
    showSnackbar('Error al guardar la especialidad.', false);
  }
};
