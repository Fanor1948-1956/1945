document.addEventListener('DOMContentLoaded', () => {
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const sidebar = document.getElementById('sidebar');
  const container = document.querySelector('.container');
  const submenuLinks = document.querySelectorAll('.sidebar ul li > a');

  // Función para abrir/cerrar el sidebar al hacer clic en el botón hamburguesa
  hamburgerBtn.addEventListener('click', () => {
    sidebar.classList.toggle('active');
    container.classList.toggle('shifted');
  });

  // Función para cerrar el sidebar al hacer clic fuera de él
  document.addEventListener('click', (event) => {
    const isClickInsideSidebar = sidebar.contains(event.target);
    const isClickOnHamburger = hamburgerBtn.contains(event.target);

    // Si el clic es fuera del sidebar y no es en el botón hamburguesa, cierra el sidebar
    if (
      !isClickInsideSidebar &&
      !isClickOnHamburger &&
      sidebar.classList.contains('active')
    ) {
      sidebar.classList.remove('active');
      container.classList.remove('shifted');
    }
  });

  // Función para abrir/cerrar submenús
  submenuLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const submenu = link.nextElementSibling; // Seleccionar el submenú siguiente al link
      const parentLi = link.parentElement; // Seleccionar el elemento padre li

      // Si el enlace tiene submenú, alterna su visibilidad
      if (submenu) {
        event.preventDefault(); // Prevenir la acción predeterminada del enlace
        submenu.classList.toggle('active'); // Alternar la clase 'active' del submenú

        // Alternar la clase 'active' en el li padre para cambiar el color de fondo
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
            otherSubmenu.classList.remove('active'); // Cerrar el otro submenú
            otherParentLi.classList.remove('active'); // Remover clase active del padre
          }
        });
      } else {
        // Si el enlace no tiene submenú, redirige a la ruta
        window.location.href = link.href; // Navegar a la ruta correspondiente
      }
    });
  });

  // Cerrar el sidebar cuando se cambia el tamaño de la ventana
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && sidebar.classList.contains('active')) {
      sidebar.classList.remove('active');
      container.classList.remove('shifted');
    }
  });
});
