export function getStoredData(key, defaultValue = []) {
  return JSON.parse(localStorage.getItem(key)) || defaultValue;
}

export function saveDataToLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// Función para verificar acceso
export function checkUserAccess(user) {
  const rolesPermitidos = ['Doctor', 'Administrador', 'Jefe Técnico'];
  if (!user || !rolesPermitidos.some((role) => user.roles.includes(role))) {
    document.getElementById('message').textContent =
      'Acceso denegado: Solo administradores, jefes técnicos o doctores pueden ver los horarios.';
    return false;
  }
  return true;
}

// Cambiar título según el rol del usuario
export function setPageTitle(user) {
  if (user.roles.includes('Doctor')) {
    document.getElementById('pageTitle').textContent =
      'Mis Horarios de Atención';
  }
}
