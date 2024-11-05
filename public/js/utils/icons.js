// Lista de listas de emojis ampliada
const iconLists = {
  medicalIcons: [
    '💊',
    '🩺',
    '🏥',
    '💉',
    '🧑‍⚕️',
    '🩹',
    '🧪',
    '📋',
    '🩻',
    '🔬',
    '🧬',
    '💉',
    '📅',
    '👩‍🔬',
    '📊',
    '🩸',
    '🔍',
    '🧫',
    '🧑‍🔬',
    '🏨',
    '🌡️',
    '💉',
    '🧑‍⚕️',
    '📅',
  ], // Íconos médicos
  patientIcons: [
    '👩‍⚕️',
    '👨‍⚕️',
    '👩‍🦰',
    '👨‍🦱',
    '👵',
    '👴',
    '👶',
    '🧒',
    '👦',
    '👧',
    '🧑‍🦳',
    '🧑‍🦰',
    '👩‍🦱',
    '👨‍🦳',
    '👨‍👧',
    '👩‍👧',
    '👩‍👦',
    '👩‍🦳',
    '👨‍🦳',
  ], // Íconos de pacientes
  adminIcons: [
    '🧑‍💼',
    '👩‍💼',
    '📊',
    '📈',
    '🗂️',
    '📋',
    '💼',
    '📅',
    '📇',
    '📦',
    '🧾',
    '📊',
    '📋',
    '🗳️',
    '📑',
    '📉',
    '🔑',
    '💡',
    '🔖',
    '📋',
    '🔍',
    '📊',
  ], // Íconos administrativos
  appointmentIcons: [
    '📅',
    '🗓️',
    '🕒',
    '⏰',
    '📞',
    '💬',
    '📝',
    '🔖',
    '📌',
    '✅',
    '🗂️',
    '📋',
  ], // Íconos para citas
  historyIcons: ['📜', '📚', '📖', '📝', '📄', '📑', '📊', '📈', '🔍', '🗂️'], // Íconos para historial
  specialtyIcons: ['🔬', '🧬', '💉', '🩺', '🏥', '📋', '📅', '🩹'], // Íconos para especialidades
  dashboardIcons: ['📊', '📈', '🏠', '📋', '📅', '🗂️', '💡', '🔍', '📌', '🔗'], // Íconos para el Dashboard
  userIcons: ['👤', '🧑‍💼', '👩‍💼', '👥', '👨‍💻', '👩‍💻', '📇', '📋', '🗳️', '🔍', '🧑‍🤝‍🧑'], // Íconos para usuarios
  serviceIcons: ['💼', '🧾', '🏥', '💊', '💉', '🩺', '🧑‍⚕️', '🩹'], // Íconos para servicios
  resultIcons: ['📈', '📊', '📝', '📋', '🔬', '🩺', '🏥', '🩹'], // Íconos para resultados médicos
  permissionIcons: ['🔑', '📜', '📝', '🗂️', '🧾', '📋', '⚖️', '🗳️'], // Íconos para permisos
  roleIcons: ['👨‍💼', '👩‍💼', '📑', '🔖', '📊', '📈', '📅', '📋'], // Íconos para roles
  scheduleIcons: ['🗓️', '⏰', '🕒', '📝', '📅', '📌', '🗂️', '🔔', '🧭', '🗓️'], // Íconos para horarios
  //settingsIcons
  settingsIcons: [
    // Agregados íconos de configuración
    '⚙️',
    '🔧',
    '🛠️',
    '🔩',
    '🔄',
    '📊',
    '📈',
    '📉',
    '🔒',
    '🔓',
    '🛡️',
    '🖥️',
    '🗃️',
    '📋',
    '💻',
  ],
};

// Función de utilidad para generar un ícono aleatorio para clínica
export const generateRandomClinicIcon = (title) => {
  // Determinar qué lista de íconos usar basado en el título
  let iconListKey;

  if (title.includes('Dashboard')) {
    iconListKey = 'dashboardIcons'; // Rutas relacionadas con el dashboard
  } else if (
    title.includes('Cita') ||
    title.includes('Horario') ||
    title.includes('Disponibilidad')
  ) {
    iconListKey = 'appointmentIcons'; // Rutas relacionadas con citas y horarios
  } else if (
    title.includes('Usuario') ||
    title.includes('Rol') ||
    title.includes('Permiso')
  ) {
    iconListKey = 'userIcons'; // Rutas relacionadas con administración de usuarios
  } else if (title.includes('Resultado')) {
    iconListKey = 'resultIcons'; // Rutas relacionadas con resultados médicos
  } else if (title.includes('Historia') || title.includes('Historial')) {
    iconListKey = 'historyIcons'; // Rutas relacionadas con historial
  } else if (title.includes('Especialidad')) {
    iconListKey = 'specialtyIcons'; // Rutas relacionadas con especialidades
  } else if (title.includes('Servicio')) {
    iconListKey = 'serviceIcons'; // Rutas relacionadas con servicios
  } else if (title.includes('Horario') || title.includes('Schedule')) {
    iconListKey = 'scheduleIcons'; // Rutas relacionadas con horarios
  } else if (title.includes('Ajustes') || title.includes('Settings')) {
    iconListKey = 'settingsIcons'; // Rutas relacionadas con ajustes y configuraciones
  } else {
    iconListKey = 'medicalIcons'; // Valor por defecto
  }

  // Seleccionar la lista de íconos
  const selectedList = iconLists[iconListKey];

  // Seleccionar aleatoriamente un ícono de la lista seleccionada
  const randomIconIndex = Math.floor(Math.random() * selectedList.length);
  const selectedIcon = selectedList[randomIconIndex];

  // Devolver el ícono seleccionado aleatoriamente
  return selectedIcon;
};
