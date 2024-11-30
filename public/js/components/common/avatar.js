// avatar.js

// Función para obtener la URL del avatar
export function getAvatarUrl(item, size = 40) {
  // tamaño por defecto de 50 si no se especifica
  if (item.uploads && item.uploads.length > 0) {
    return item.uploads[0].path;
  }
  // SVG con fondo blanco y tamaño de viewBox adaptable
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24"><rect width="24" height="24" fill="white"/><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-3.31 0-10 1.67-10 5v3h20v-3c0-3.33-6.69-5-10-5z"/></svg>`;
}

// Función para mostrar el avatar en el DOM
export function renderAvatar(avatarUrl, size = 50) {
  const img = document.createElement('img');
  img.src = avatarUrl;
  img.alt = 'Avatar';
  img.className = 'avatar';
  img.style.width = `${size}px`; // Ajusta el tamaño
  img.style.height = `${size}px`;
  img.style.borderRadius = '50%';
  img.style.objectFit = 'cover';
  return img;
}

// Función principal para crear un avatar, recibiendo el objeto del cual obtener el avatar
export function createAvatar(item, size) {
  const avatarUrl = getAvatarUrl(item);
  return renderAvatar(avatarUrl, size); // Pasar el tamaño
}
