export function createBody(
  containerId,
  headerTitle,
  headerContent,
  content,
  footerContent
) {
  const container = document.getElementById(containerId);

  if (!container) {
    console.error(`Contenedor con ID '${containerId}' no encontrado.`);
    return;
  }

  // Crear el header dinámicamente
  const bodyHeader = document.createElement('div');
  bodyHeader.classList.add('body-header');
  bodyHeader.innerHTML = `
    <h2 class="body-title">${headerTitle}</h2>
    <div class="body-header-content">${headerContent}</div>
  `;

  // Crear el content dinámicamente
  const bodyContent = document.createElement('div');
  bodyContent.classList.add('body-content');
  bodyContent.innerHTML = content;

  // Crear el footer dinámicamente
  const bodyFooter = document.createElement('div');
  bodyFooter.classList.add('body-footer');
  bodyFooter.innerHTML = footerContent;

  // Agregar los elementos al contenedor principal
  container.appendChild(bodyHeader);
  container.appendChild(bodyContent);
  container.appendChild(bodyFooter);

  // Verificar la cantidad de cards en el content
  const cards = bodyContent.querySelectorAll('.card');
  if (cards.length > 9) {
    bodyContent.classList.add('enable-scroll');
  } else {
    bodyContent.classList.remove('enable-scroll');
  }

  // Asegurar que el contenido tenga el desplazamiento adecuado
  if (bodyContent.classList.contains('enable-scroll')) {
    bodyContent.style.maxHeight = '60vh';
    bodyContent.style.overflowY = 'auto';
  }
}

export function closeBody(containerId) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Contenedor con ID '${containerId}' no encontrado.`);
    return;
  }

  container.innerHTML = ''; // Elimina todo el contenido del body
}
