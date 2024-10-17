// utils/iconUtils.js

const generateSvg = (color = "#f06", size = 100) => {
  return `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
            <circle cx="${size / 2}" cy="${size / 2}" r="${
    size / 4
  }" fill="${color}" />
          </svg>`;
};

const getIcon = (iconName) => {
  const icons = {
    home: `<svg class="icon" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>`,
    user: `<svg class="icon" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-3.31 0-10 1.67-10 5v3h20v-3c0-3.33-6.69-5-10-5z"/></svg>`,
    settings: `<svg class="icon" viewBox="0 0 24 24"><path d="M19.14 12.94c.07-.35.07-.7.07-1.04s0-.69-.07-1.04l2.01-1.56c.18-.14.23-.39.11-.59l-2.34-4.04c-.12-.21-.39-.26-.59-.11l-2.49 1.01a7.966 7.966 0 0 0-1.56-.94l-.38-2.6C14.25 2.02 13.95 2 13.67 2h-3.34c-.28 0-.58.02-.7.2l-.38 2.6c-.63.27-1.22.66-1.76 1.14L5.9 5.75c-.21.15-.27.39-.11.59l2.01 1.56c.07.35.07.7.07 1.04s0 .69.07 1.04l-2.01 1.56c-.18.14-.23.39-.11.59l2.34 4.04c.12.21.39.26.59.11l2.49-1.01c.54.48 1.13.87 1.76 1.14l.38 2.6c.12.18.42.2.7.2h3.34c.28 0 .58-.02.7-.2l.38-2.6c.63-.27 1.22-.66 1.76-1.14l2.49 1.01c.2.15.47.1.59-.11l2.34-4.04c.12-.21.07-.45-.11-.59l-2.01-1.56zM12 15.5c-1.88 0-3.5-1.62-3.5-3.5S10.12 8.5 12 8.5s3.5 1.62 3.5 3.5-1.62 3.5-3.5 3.5z"/></svg>`,
    appointment: `<svg class="icon" viewBox="0 0 24 24"><path d="M3 8h18v13H3V8zm5-6h2v3H8V2zm5 0h2v3h-2V2zm5 0h2v3h-2V2z"/></svg>`,
    doctor: `<svg class="icon" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-3.31 0-10 1.67-10 5v3h20v-3c0-3.33-6.69-5-10-5z"/></svg>`,
    patient: `<svg class="icon" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-3.31 0-10 1.67-10 5v3h20v-3c0-3.33-6.69-5-10-5z"/></svg>`,

    // Nuevos íconos para clínica
    stethoscope: `<svg class="icon" viewBox="0 0 24 24"><path d="M12 0c-1.1 0-2 .9-2 2v4c-1.11 0-2 .89-2 2v5.5c0 2.76 2.24 5 5 5s5-2.24 5-5V8c0-1.11-.89-2-2-2V2c0-1.1-.9-2-2-2zm0 10c-1.1 0-2 .9-2 2v5.5c0 .83-.67 1.5-1.5 1.5S7 18.33 7 17.5V8c0-1.1.9-2 2-2h1c0 .55.45 1 1 1s1-.45 1-1h1c1.1 0 2 .9 2 2v7.5c0 1.1-.9 2-2 2s-2-.9-2-2V10c0-1.1.9-2 2-2v-4c-2.21 0-4 1.79-4 4v5.5c0 3.09 2.52 5.61 5.61 5.99C16.25 20.64 21 15.87 21 10h-3c0 3.77-3.03 6.84-6.76 7.32-.64.09-1.24-.48-1.24-1.12V12c0-1.1.9-2 2-2s2 .9 2 2h3c0 4.15-3.23 7.58-7.24 7.98-2.08.21-3.76-1.56-3.76-3.64V8c0-3.31 2.69-6 6-6s6 2.69 6 6h-1c0-2.21-1.79-4-4-4s-4 1.79-4 4v5.5c0 1.1.9 2 2 2s2-.9 2-2V10c0-1.1-.9-2-2-2h-1V2c1.1 0 2-.9 2-2s-.9-2-2-2z"/></svg>`,
    prescription: `<svg class="icon" viewBox="0 0 24 24"><path d="M21 3h-6.17C14.4 2.6 13.76 2 13 2s-1.4.6-1.83 1.5H3v17h18V4c0-1.1-.9-2-2-2zm-6 12H9v-2h6v2zm0-4H9V9h6v2zm3 8H6V4h7.17c.21.38.57.67 1.02.83L21 8v11z"/></svg>`,
    hospital: `<svg class="icon" viewBox="0 0 24 24"><path d="M12 0C9.79 0 8 1.79 8 4v16c0 2.21 1.79 4 4 4s4-1.79 4-4V4c0-2.21-1.79-4-4-4zm0 20c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm2-10h-4v-2h4v2zm0-4h-4V4h4v2z"/></svg>`,
    syringe: `<svg class="icon" viewBox="0 0 24 24"><path d="M12 0c-1.1 0-2 .9-2 2v3c-3.31 0-6 2.69-6 6v5c0 3.31 2.69 6 6 6h2v3c0 1.1.9 2 2 2s2-.9 2-2v-3h2c3.31 0 6-2.69 6-6v-5c0-3.31-2.69-6-6-6V2c0-1.1-.9-2-2-2zm1 18h-2v2h2v-2zm3-2h-8v-4h8v4zm0-6H9V6h7v4z"/></svg>`,
    availability: `<svg class="icon" viewBox="0 0 24 24"><path d="M17 5h-1.5L16 3h-3l1.5 2H7v16h10V5zm-2 11H9v-2h6v2zm0-4H9v-2h6v2zm0-4H9V9h6v2z"/></svg>`,
    results: `<svg class="icon" viewBox="0 0 24 24"><path d="M12 0c-1.1 0-2 .9-2 2v2H9c-2.21 0-4 1.79-4 4v16h16V8c0-2.21-1.79-4-4-4h-1V2c0-1.1-.9-2-2-2zm0 16h-6v-2h6v2zm0-4h-6v-2h6v2zm0-4h-6V6h6v2zm5 14H7v-2h10v2zm0-6H7v-2h10v2z"/></svg>`,
    speciality: `<svg class="icon" viewBox="0 0 24 24"><path d="M19 12c0-3.31-2.69-6-6-6S7 8.69 7 12s2.69 6 6 6 6-2.69 6-6zm-6 4.5c-2.48 0-4.5-2.02-4.5-4.5S10.52 7.5 13 7.5 17.5 9.52 17.5 12s-2.02 4.5-4.5 4.5zM4 4h16v2H4V4zm0 4h16v2H4V8zm0 4h16v2H4v-2zm0 4h16v2H4v-2z"/></svg>`,
    permissions: `<svg class="icon" viewBox="0 0 24 24"><path d="M3 3h18v18H3V3zm8 8H6v-2h5v2zm0-4H6V5h5v2zm6 4h-5v-2h5v2zm0-4h-5V5h5v2z"/></svg>`,
    profile: `<svg class="icon" viewBox="0 0 24 24"><path d="M12 0c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6S15.31 0 12 0zm0 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 8c-2.21 0-4 1.79-4 4v1h8v-1c0-2.21-1.79-4-4-4z"/></svg>`,
    roles: `<svg class="icon" viewBox="0 0 24 24"><path d="M12 0c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6S15.31 0 12 0zm0 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 8c-2.21 0-4 1.79-4 4v1h8v-1c0-2.21-1.79-4-4-4z"/></svg>`,
    logout: `<svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
  <path d="M15.41 16.59L17 15l-4-4 4-4-1.59-1.41L10 12l5.41 4.59zM22 4H8v2h14v14H8v2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2z"/></svg>`,
  };

  return icons[iconName] || ""; // Retorna el SVG correspondiente o una cadena vacía si no existe
};

module.exports = { generateSvg, getIcon };
