document.addEventListener('DOMContentLoaded', () => {
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const sidebar = document.getElementById('sidebar');
  const container = document.querySelector('.container');
  const submenuLinks = document.querySelectorAll('.sidebar ul li > a');

  console.log('Sidebar y contenedor listos');

  // Abre/cierra el sidebar al hacer clic en el botón hamburguesa
  hamburgerBtn.addEventListener('click', () => {
    sidebar.classList.toggle('active');
    container.classList.toggle('shifted');
    console.log('Sidebar toggled:', sidebar.classList.contains('active'));
  });

  // Cierra el sidebar al hacer clic fuera de él
  document.addEventListener('click', (event) => {
    const isClickInsideSidebar = sidebar.contains(event.target);
    const isClickOnHamburger = hamburgerBtn.contains(event.target);

    if (
      !isClickInsideSidebar &&
      !isClickOnHamburger &&
      sidebar.classList.contains('active')
    ) {
      sidebar.classList.remove('active');
      container.classList.remove('shifted');
      console.log('Sidebar closed');
    }
  });

  submenuLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const submenu = link.nextElementSibling;
      const parentLi = link.parentElement;
      const parentHref = link.getAttribute('href');

      console.log('Link clicked:', parentHref);

      if (submenu) {
        // Si el enlace tiene un submenú
        event.preventDefault(); // Evita la navegación predeterminada

        submenu.classList.toggle('active'); // Alterna la visibilidad del submenú
        parentLi.classList.toggle('active'); // Cambia la clase active del li padre

        console.log('Submenu toggled:', submenu.classList.contains('active'));

        // Cierra otros submenús abiertos
        submenuLinks.forEach((otherLink) => {
          const otherSubmenu = otherLink.nextElementSibling;
          const otherParentLi = otherLink.parentElement;

          if (
            otherSubmenu &&
            otherSubmenu !== submenu &&
            otherSubmenu.classList.contains('active')
          ) {
            otherSubmenu.classList.remove('active'); // Cierra el otro submenú
            otherParentLi.classList.remove('active'); // Remueve la clase active del padre
          }
        });
      } else {
        // Manejar el caso de parentHref
        event.preventDefault(); // Evita la navegación predeterminada
        console.log('Navigating to:', parentHref);

        // Verificar si el href es un hash o una ruta
        if (parentHref.startsWith('#')) {
          const targetElement = document.querySelector(parentHref);
          if (targetElement) {
            // Cierra el sidebar y hace scroll hacia la sección
            sidebar.classList.remove('active');
            container.classList.remove('shifted');

            console.log('Smooth scrolling to section:', parentHref);
            targetElement.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            });
          }
        } else {
          // Si el parentHref no es un hash, podría ser una ruta a otra página
          sidebar.classList.remove('active'); // Cierra el sidebar
          container.classList.remove('shifted'); // Cierra el contenedor

          // Cargar contenido dinámicamente
          fetch(parentHref)
            .then((response) => {
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              return response.text();
            })
            .then((html) => {
              const parser = new DOMParser();
              const doc = parser.parseFromString(html, 'text/html');
              const newContent = doc.querySelector('#content'); // Cambia según tu estructura

              if (newContent) {
                container.innerHTML = newContent.innerHTML; // Reemplaza el contenido
                console.log('Content loaded:', newContent.innerHTML);
              } else {
                console.error('No se encontró el contenido en la respuesta');
              }

              // Actualiza el historial del navegador
              window.history.pushState({}, '', parentHref);
            })
            .catch((error) => {
              console.error('Error al cargar el contenido:', error);
            });
        }
      }
    });
  });

  window.addEventListener('popstate', (event) => {
    const currentPath = window.location.pathname; // Obtén la ruta actual
    console.log('Popstate triggered for:', currentPath);
    fetch(currentPath)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then((html) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const newContent = doc.querySelector('#content'); // Cambia según tu estructura

        if (newContent) {
          container.innerHTML = newContent.innerHTML; // Reemplaza el contenido
          console.log('Content replaced with popstate:', newContent.innerHTML);
        } else {
          console.error('No se encontró el contenido en la respuesta');
        }
      })
      .catch((error) => {
        console.error('Error al cargar el contenido:', error);
      });
  });

  // Cierra el sidebar al redimensionar la ventana
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && sidebar.classList.contains('active')) {
      sidebar.classList.remove('active');
      container.classList.remove('shifted');
      console.log('Sidebar closed on resize');
    }
  });
});
