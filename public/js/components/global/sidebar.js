document.addEventListener('DOMContentLoaded', () => {
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const sidebar = document.getElementById('sidebar');
  const container = document.querySelector('.container');
  const submenuLinks = document.querySelectorAll('.sidebar ul li > a');

  // Abre/cierra el sidebar al hacer clic en el botón hamburguesa
  hamburgerBtn.addEventListener('click', () => {
    sidebar.classList.toggle('active');
    container.classList.toggle('shifted');
  });

  // Cierra el sidebar al hacer clic fuera de él
  document.addEventListener('click', (event) => {
    const isClickInsideSidebar = sidebar.contains(event.target);
    const isClickOnHamburger = hamburgerBtn.contains(event.target);

    if (!isClickInsideSidebar && !isClickOnHamburger && sidebar.classList.contains('active')) {
      sidebar.classList.remove('active');
      container.classList.remove('shifted');
    }
  });

  submenuLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const submenu = link.nextElementSibling;
      const parentLi = link.parentElement;
      const parentHref = link.getAttribute('href');

      // Si el enlace tiene un submenú
      if (submenu) {
        event.preventDefault(); // Evita la navegación predeterminada
        submenu.classList.toggle('active'); // Alterna la visibilidad del submenú
        parentLi.classList.toggle('active'); // Cambia la clase active del li padre

        // Cierra otros submenús abiertos
        submenuLinks.forEach((otherLink) => {
          const otherSubmenu = otherLink.nextElementSibling;
          const otherParentLi = otherLink.parentElement;

          if (otherSubmenu && otherSubmenu !== submenu && otherSubmenu.classList.contains('active')) {
            otherSubmenu.classList.remove('active'); // Cierra el otro submenú
            otherParentLi.classList.remove('active'); // Remueve la clase active del padre
          }
        });
      } else {
        // Manejar la carga de contenido
        event.preventDefault(); // Evita la navegación predeterminada
        loadContent(parentHref);
      }
    });
  });

const loadContent = (url) => {
  $.ajax({
    url: url,
    method: 'GET',
    success: function (html) {
      // Solo reemplaza el contenido principal
      $('#contentMain').html($(html).find('#contentMain').html());
      // No vuelvas a cargar el navbar
      executeScripts(html); // Si hay scripts que necesitas ejecutar
      history.pushState({ url: url }, '', url); // Manejo del historial
    },
    error: function (xhr, status, error) {
      console.error('Error al cargar contenido:', error);
    },
  });
};

  const executeScripts = (html) => {
    const scripts = $(html).filter('script');
    scripts.each(function () {
      const newScript = document.createElement('script');
      newScript.type = $(this).attr('type') || 'text/javascript';
      newScript.src = $(this).attr('src') || ''; // Asigna la fuente si existe
      newScript.text = $(this).text(); // Añade el contenido del script
      document.body.appendChild(newScript); // Añade el script al body
    });
  };

  // Cierra el sidebar al redimensionar la ventana
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && sidebar.classList.contains('active')) {
      sidebar.classList.remove('active');
      container.classList.remove('shifted');
    }
  });
});
