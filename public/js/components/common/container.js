export function createContainer(containerId, contentId) {
  let container = document.getElementById(containerId);
  if (!container) {
    container = document.createElement('div');
    container.id = containerId;
    container.className = 'container';
    document.body.appendChild(container);
  }

  let contentMain = document.getElementById(contentId);
  if (!contentMain) {
    contentMain = document.createElement('div');
    contentMain.id = contentId;
    contentMain.className = 'contentMain';

    const spinner = document.createElement('div');
    spinner.className = 'spinner';
    spinner.style.display = 'none'; // Inicia oculto
    contentMain.appendChild(spinner);

    container.appendChild(contentMain);
  }
}
