import {
  showContentAndButton,
  initializeViewButton,
} from '../../components/common/spinner.js';

export function initializeSidebar(idContainer, showButtonImmediately = false) {
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const sidebar = document.getElementById('sidebar');
  const layoutContainer = document.getElementById(idContainer);
  const submenuLinks = document.querySelectorAll('.sidebar ul li > a');

  // Mostrar el spinner y configurar el botón "Ver" con el tiempo de espera adecuado
  showContentAndButton(showButtonImmediately);

  hamburgerBtn.addEventListener('click', () => {
    sidebar.classList.toggle('active');
    layoutContainer.classList.toggle('shifted');
  });

  document.addEventListener('click', (event) => {
    const isClickInsideSidebar = sidebar.contains(event.target);
    const isClickOnHamburger = hamburgerBtn.contains(event.target);

    if (
      !isClickInsideSidebar &&
      !isClickOnHamburger &&
      sidebar.classList.contains('active')
    ) {
      closeSidebar(); // Cerrar el sidebar al hacer clic fuera
    }
  });

  submenuLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const submenu = link.nextElementSibling;
      const parentLi = link.parentElement;
      const parentHref = link.getAttribute('href');

      // Si hay un submenú, alternar su visibilidad
      if (submenu) {
        event.preventDefault(); // Prevenir la acción predeterminada
        submenu.classList.toggle('active');
        parentLi.classList.toggle('active');

        // Cerrar otros submenús abiertos
        submenuLinks.forEach((otherLink) => {
          const otherSubmenu = otherLink.nextElementSibling;
          const otherParentLi = otherLink.parentElement;
          if (
            otherSubmenu &&
            otherSubmenu !== submenu &&
            otherSubmenu.classList.contains('active')
          ) {
            otherSubmenu.classList.remove('active');
            otherParentLi.classList.remove('active');
          }
        });
      } else {
        // Si no hay submenú, cerrar cualquier submenú abierto
        closeOpenSubmenus();

        // Cargar el contenido y cerrar el sidebar
        event.preventDefault(); // Prevenir el enlace si no hay submenu
        showContentAndButton(false); // Mostrar el spinner de nuevo al cargar el contenido
        loadContent(parentHref, true);
        closeSidebar(); // Cerrar el sidebar
      }
    });
  });

  const closeSidebar = () => {
    sidebar.classList.remove('active');
    layoutContainer.classList.remove('shifted');
  };

  const closeOpenSubmenus = () => {
    submenuLinks.forEach((link) => {
      const submenu = link.nextElementSibling;
      const parentLi = link.parentElement;
      if (submenu && submenu.classList.contains('active')) {
        submenu.classList.remove('active');
        parentLi.classList.remove('active');
      }
    });
  };

  const loadContent = async (url, addToHistory = false) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const contentType = response.headers.get('content-type');

      if (contentType.includes('application/json')) {
        const data = await response.json();
        document.getElementById('contentMain').innerHTML = data.content;
        document.title = data.title || url;
      } else {
        const text = await response.text();
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = text;
        document.getElementById('contentMain').innerHTML =
          tempDiv.querySelector('#contentMain').innerHTML;
        const newTitle = tempDiv.querySelector('title').innerText;
        document.title = newTitle || url;

        // Ejecutar scripts después de cargar contenido
        executeScripts(tempDiv);
      }

      if (addToHistory) {
        history.pushState({ url: url }, '', url);
      }
    } catch (error) {
      console.error('Error al cargar contenido:', error);
    }
  };

  const executeScripts = (container) => {
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

  // Inicializar el botón "Ver" para ocultar el spinner y mostrar el contenido
  initializeViewButton();

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && sidebar.classList.contains('active')) {
      closeSidebar();
    }
  });

  window.addEventListener('popstate', (event) => {
    if (event.state && event.state.url) {
      showContentAndButton(false); // Mostrar el spinner al retroceder
      loadContent(event.state.url, false);
    }
  });
}

initializeSidebar('layoutContainer', false);
