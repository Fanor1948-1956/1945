// js/logic/auth/editProfile.js
import { getState } from '../../reducers/state.js';
import { toggleFields } from '../../components/forms/formUtils.js';

export function enableEditMode() {
  toggleFields(
    ['nameInput', 'surnamesInput', 'emailInput', 'genderSelect'],
    true
  );
  document.getElementById('updateButton').style.display = 'inline-block';
  document.getElementById('cancelButton').style.display = 'inline-block';
  document.getElementById('editButton').style.display = 'none';
}

export function cancelEditMode() {
  const profile = getState().profile;

  document.getElementById('nameInput').value = profile.name || '';
  document.getElementById('surnamesInput').value = profile.surnames || '';
  document.getElementById('emailInput').value = profile.email || '';
  document.getElementById('genderSelect').value = profile.gender || 'masculino';

  toggleFields(
    ['nameInput', 'surnamesInput', 'emailInput', 'genderSelect'],
    false
  );
  document.getElementById('updateButton').style.display = 'none';
  document.getElementById('cancelButton').style.display = 'none';
  document.getElementById('editButton').style.display = 'inline-block';
}
