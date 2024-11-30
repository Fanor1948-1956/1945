// Habilitar/deshabilitar campos según si estamos editando o no
export const setFieldsState = (isEditing) => {
  document.getElementById('userName').disabled = isEditing;
  document.getElementById('userSurnames').disabled = isEditing;
  document.getElementById('userEmail').disabled = isEditing;
  document.getElementById('userPassword').disabled = false; // Siempre habilitar contraseña
  document.getElementById('userGender').disabled = isEditing;
};

export const collectFormData = (selectedRoles) => {
  return {
    name: document.getElementById('userName').value.trim(),
    surnames: document.getElementById('userSurnames').value.trim(),
    email: document.getElementById('userEmail').value.trim(),
    password: document.getElementById('userPassword').value.trim(),
    gender: document.getElementById('userGender').value.trim(),
    roles: selectedRoles,
  };
};

export const fillUserForm = (user) => {
  document.getElementById('userName').value = user.name;
  document.getElementById('userSurnames').value = user.surnames;
  document.getElementById('userEmail').value = user.email;
  document.getElementById('userPassword').value = user.password; // Considera la seguridad aquí
  document.getElementById('userGender').value = user.gender;
};

// Validar los datos del formulario
export const validateFormData = ({
  name,
  surnames,
  email,
  password,
  gender,
  roles,
}) => {
  if (
    !name ||
    !surnames ||
    !email ||
    !password ||
    !gender ||
    roles.length === 0
  ) {
    showSnackbar(
      'Por favor, complete todos los campos y seleccione al menos un rol.',
      false
    );
    return false;
  }
  return true;
};
