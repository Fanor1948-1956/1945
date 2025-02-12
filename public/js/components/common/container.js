export function createContainer(
  contentId,
  backgroundColor = null,
  width = '100%',
  height = 'auto',
  contentBgColor = 'white'
) {
  let container = document.createElement('div');
  container.className = 'container';

  if (backgroundColor) {
    container.style.backgroundColor = backgroundColor;
  }

  let contentMain = document.createElement('div');
  contentMain.id = contentId;
  contentMain.className = 'content';
  contentMain.style.width = width; // Ancho aplicado al content-main
  contentMain.style.height = height; // Altura aplicada al content-main
  contentMain.style.backgroundColor = contentBgColor; // Fondo aplicado al content-main

  const spinner = document.createElement('div');
  spinner.className = 'spinner';
  spinner.style.display = 'none';
  contentMain.appendChild(spinner);

  container.appendChild(contentMain);

  return container; // Devolver el contenedor
}
