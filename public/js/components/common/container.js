export function createContainer(
  contentId,
  backgroundColor = null,
  width = '100%',
  height = 'auto',
  contentBgColor = 'white'
) {
  let content = document.getElementById('content');
  if (!content) {
    console.error('No se encontró el contenedor principal #content');
    return;
  }

  let container = document.createElement('div');
  container.className = 'container-general';

  if (backgroundColor) {
    container.style.backgroundColor = backgroundColor;
  }

  let contentMain = document.createElement('div');
  contentMain.id = contentId;
  contentMain.className = 'content-main';
  contentMain.style.width = width; // Ahora el ancho se aplica al content-main
  contentMain.style.height = height; // Ahora la altura se aplica al content-main
  contentMain.style.backgroundColor = contentBgColor; // Ahora el fondo se aplica al content-main

  const spinner = document.createElement('div');
  spinner.className = 'spinner';
  spinner.style.display = 'none';
  contentMain.appendChild(spinner);

  container.appendChild(contentMain);
  content.appendChild(container);
}
