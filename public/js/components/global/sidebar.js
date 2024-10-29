export function initializeSidebar(idContainer, showButtonImmediately = false) {
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const sidebar = document.getElementById('sidebar');
  const layoutContainer = document.getElementById(idContainer);
  const submenuLinks = document.querySelectorAll('.sidebar ul li > a');

  const spinner = document.getElementById('spinner');
  const viewButton = document.getElementById('viewButton');

  // Inicializa el botón "Ver" según el argumento
  viewButton.style.display = showButtonImmediately ? 'block' : 'none';

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
      sidebar.classList.remove('active');
      layoutContainer.classList.remove('shifted');
    }
  });

  submenuLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const submenu = link.nextElementSibling;
      const parentLi = link.parentElement;
      const parentHref = link.getAttribute('href');

      sidebar.classList.remove('active');
      layoutContainer.classList.remove('shifted');

      if (submenu) {
        event.preventDefault();
        submenu.classList.toggle('active');
        parentLi.classList.toggle('active');

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
        event.preventDefault();
        showSpinner(); // Mostrar el spinner al cargar contenido
        loadContent(parentHref);
      }
    });
  });

  const showSpinner = () => {
    spinner.style.display = 'flex';
    layoutContainer.style.display = 'none';

    if (!showButtonImmediately) {
      // Si es false, mostrar el spinner por 10 segundos y luego mostrar el contenido
      setTimeout(() => {
        spinner.style.display = 'none'; // Ocultar spinner
        layoutContainer.style.display = 'block'; // Mostrar contenido
      }, 10000); // 10000 ms = 10 segundos
    } else {
      // Si es true, el botón "Ver" se mostrará y el contenido permanecerá oculto
      viewButton.style.display = 'block'; // Mostrar el botón
    }
  };

  const loadContent = async (url) => {
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
        executeScripts(text);
      }
      history.pushState({ url: url }, '', url);
    } catch (error) {
      console.error('Error al cargar contenido:', error);
    }
  };

  const executeScripts = (html) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    const scripts = tempDiv.querySelectorAll('script');
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

  // Evento para el botón "Ver"
  viewButton.addEventListener('click', () => {
    spinner.style.display = 'none';
    layoutContainer.style.display = 'block';
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && sidebar.classList.contains('active')) {
      sidebar.classList.remove('active');
      layoutContainer.classList.remove('shifted');
    }
  });
}
