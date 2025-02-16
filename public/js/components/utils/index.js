import { applyStoredStyles } from '../../utils/storageUtils.js';

export const actions = [
  { text: 'Ver Detalles', action: 'details' },
  { text: 'Editar', action: 'edit' },
  { text: 'Desactivar', action: 'deactivate' },
  { text: 'Eliminar', action: 'delete' },
];

// Función para desplazar la vista a un elemento con un hash
export const scrollToHash = (hash) => {
  const offset = 70; // Ajusta el offset según el header
  const targetElement = document.querySelector(hash);

  if (targetElement) {
    const elementPosition =
      targetElement.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
    console.log(`Scrolling to target element: ${hash}`);
  } else {
    console.warn('Elemento de destino no encontrado:', hash);
  }
};

export const executeScripts = (container) => {
  const scripts = container.querySelectorAll('script');
  scripts.forEach((script) => {
    const newScript = document.createElement('script');
    newScript.type = script.type || 'text/javascript';
    if (script.src) {
      newScript.src = script.src;
      newScript.onload = () => console.log(`${script.src} loaded.`);
    } else {
      newScript.text = script.textContent || script.innerHTML;
    }
    document.body.appendChild(newScript);
  });
};

export const loadContent = async (url, addToHistory = false) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const contentType = response.headers.get('content-type');

    if (contentType.includes('application/json')) {
      const data = await response.json();
      console.log('data contentLoad', data);
      document.getElementById('contentMain').innerHTML = data.content;
      document.title = data.title || url;
    } else {
      const text = await response.text();
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = text;
      document.getElementById('contentMain').innerHTML =
        tempDiv.querySelector('#contentMain').innerHTML;
      document.title = tempDiv.querySelector('title')?.innerText || url;
      executeScripts(tempDiv);
    }

    // Aplica posiciones y colores después de cargar el contenido
    applyStoredStyles();

    if (addToHistory) {
      history.pushState({ url: url }, '', url);
    }

    const hashIndex = url.indexOf('#');
    if (hashIndex !== -1) {
      const hash = url.substring(hashIndex);
      scrollToHash(hash);
    }
  } catch (error) {
    console.error('Error al cargar contenido:', error);
  }
};
