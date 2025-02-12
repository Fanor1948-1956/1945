export function renderHeader(title, showActions = true) {
  let headerHtml = '';

  // Contenedor del encabezado
  headerHtml += `<div class="header-container">
    <h1 class="header-title">${title}</h1>`;

  // Si showActions es true, agregamos botones de acción
  if (showActions) {
    headerHtml += `<div class="header-actions">
      <button class="action-button" id="refreshButton">Actualizar</button>
      <button class="action-button" id="settingsButton">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-gear" viewBox="0 0 16 16">
          <path d="M8 4.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zM2 8a6 6 0 1 1 12 0 6 6 0 0 1-12 0zm6-7a1 1 0 0 1 .8 1.6l-.8.4-.8-.4A1 1 0 1 1 8 1zm-4.3 1.4a1 1 0 0 1 1.4.3l.4.8-.4.8a1 1 0 0 1-1.4-.3l-.4-.8a1 1 0 0 1 .3-1.4zm8.4 0a1 1 0 0 1 .4 1.4l-.4.8-.4-.8a1 1 0 0 1 .3-1.4zM1 8a1 1 0 0 1 0-2h1.5a1 1 0 0 1 0 2H1zm12.5 0a1 1 0 0 1 0-2H15a1 1 0 0 1 0 2h-1.5zm-2.5 4.5a1 1 0 0 1-.4 1.4l-.8-.4-.4.8a1 1 0 0 1-1.6-.8l.4-.8-.8-.4a1 1 0 0 1 0-1.6l.8-.4-.4-.8a1 1 0 0 1 1.4-1.6l.8.4.4-.8a1 1 0 0 1 1.6 1.6l-.4.8.8.4a1 1 0 0 1 0 1.6l-.8.4.4.8a1 1 0 0 1-1.4 1.6l-.4-.8-.8.4a1 1 0 0 1-.8 0zm-7.4 0a1 1 0 0 1-1.4-1.6l.4-.8-.8-.4a1 1 0 0 1 0-1.6l.8-.4-.4-.8a1 1 0 0 1 1.6-1.6l.4.8.8-.4a1 1 0 0 1 0 1.6l-.8.4.4.8a1 1 0 0 1-1.4 1.6l-.4-.8-.8.4z"/>
        </svg>
      </button>
    </div>`;
  }

  headerHtml += `</div>`; // Cierra el contenedor del encabezado

  return headerHtml;
}
