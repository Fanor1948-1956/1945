'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.generateRandomClinicIcon = void 0;
// Lista de listas de emojis ampliada
var iconLists = {
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
  ],
  // Íconos médicos
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
  ],
  // Íconos de pacientes
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
  ],
  // Íconos administrativos
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
  ],
  // Íconos para citas
  historyIcons: ['📜', '📚', '📖', '📝', '📄', '📑', '📊', '📈', '🔍', '🗂️'],
  // Íconos para historial
  specialtyIcons: ['🔬', '🧬', '💉', '🩺', '🏥', '📋', '📅', '🩹'],
  // Íconos para especialidades
  dashboardIcons: ['📊', '📈', '🏠', '📋', '📅', '🗂️', '💡', '🔍', '📌', '🔗'],
  // Íconos para el Dashboard
  userIcons: ['👤', '🧑‍💼', '👩‍💼', '👥', '👨‍💻', '👩‍💻', '📇', '📋', '🗳️', '🔍', '🧑‍🤝‍🧑'],
  // Íconos para usuarios
  serviceIcons: ['💼', '🧾', '🏥', '💊', '💉', '🩺', '🧑‍⚕️', '🩹'],
  // Íconos para servicios
  resultIcons: ['📈', '📊', '📝', '📋', '🔬', '🩺', '🏥', '🩹'],
  // Íconos para resultados médicos
  permissionIcons: ['🔑', '📜', '📝', '🗂️', '🧾', '📋', '⚖️', '🗳️'],
  // Íconos para permisos
  roleIcons: ['👨‍💼', '👩‍💼', '📑', '🔖', '📊', '📈', '📅', '📋'],
  // Íconos para roles
  scheduleIcons: ['🗓️', '⏰', '🕒', '📝', '📅', '📌', '🗂️', '🔔', '🧭', '🗓️'], // Íconos para horarios
  serviceIcons: [
    '💼', // Servicios corporativos
    '🛠️', // Servicios técnicos
    '🧹', // Servicios de limpieza
    '🚗', // Transporte
    '📦', // Envíos o logística
    '🏠', // Servicios del hogar
    '🍽️', // Restauración o catering
    '🎓', // Educación o tutorías
    '🛒', // Compras o comercio
    '⚙️', // Soporte técnico o mantenimiento
    '🌐', // Servicios en línea
    '📡', // Telecomunicaciones
    '🎨', // Diseño o creatividad
    '💊', // Farmacéuticos o de salud
    '🏋️', // Fitness o deportes
    '🎭', // Entretenimiento o eventos
    '📖', // Servicios editoriales o de aprendizaje
    '🖥️', // Desarrollo o informática
    '🎥', // Multimedia
    '🎶', // Música o arte
  ],
};

// Función de utilidad para generar un ícono aleatorio para clínica
var generateRandomClinicIcon = (exports.generateRandomClinicIcon =
  function generateRandomClinicIcon(title) {
    // Determinar qué lista de íconos usar basado en el título
    var iconListKey;
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
    } else {
      iconListKey = 'medicalIcons'; // Valor por defecto
    }

    // Seleccionar la lista de íconos
    var selectedList = iconLists[iconListKey];

    // Seleccionar aleatoriamente un ícono de la lista seleccionada
    var randomIconIndex = Math.floor(Math.random() * selectedList.length);
    var selectedIcon = selectedList[randomIconIndex];

    // Devolver el ícono seleccionado aleatoriamente
    return selectedIcon;
  });
