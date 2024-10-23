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

    if (
      !isClickInsideSidebar &&
      !isClickOnHamburger &&
      sidebar.classList.contains('active')
    ) {
      sidebar.classList.remove('active');
      container.classList.remove('shifted');
    }
  });

  submenuLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const submenu = link.nextElementSibling;
      const parentLi = link.parentElement;
      const parentHref = link.getAttribute('href');

      if (submenu) {
        // Si el enlace tiene un submenú
        event.preventDefault(); // Evita la navegación predeterminada

        submenu.classList.toggle('active'); // Alterna la visibilidad del submenú
        parentLi.classList.toggle('active'); // Cambia la clase active del li padre

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

        // Verificar si el href es un hash o una ruta
        if (parentHref.startsWith('#')) {
          const targetElement = document.querySelector(parentHref);
          if (targetElement) {
            // Cierra el sidebar y hace scroll hacia la sección
            sidebar.classList.remove('active');
            container.classList.remove('shifted');

            // Desplazamiento suave hacia la sección indicada
            targetElement.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            });
          }
        } else {
          // Si el parentHref no es un hash, podría ser una ruta a otra página
          sidebar.classList.remove('active'); // Cierra el sidebar
          container.classList.remove('shifted'); // Cierra el contenedor

          // Navega normalmente
          window.location.href = parentHref;
        }
      }
    });
  });

  // Cierra el sidebar al redimensionar la ventana
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && sidebar.classList.contains('active')) {
      sidebar.classList.remove('active');
      container.classList.remove('shifted');
    }
  });
});
