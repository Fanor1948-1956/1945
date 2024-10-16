document.addEventListener("DOMContentLoaded", function () {
  const navbarLinks = document.getElementById("navbarLinks");

  const submenuLinks = document.querySelectorAll(".has-submenu");



  // Función para verificar el tamaño de la pantalla
  function isMobile() {
    return window.innerWidth <= 768; // Definimos móvil cuando el ancho es <= 768px
  }

  // Mostrar/ocultar submenús en móviles al hacer clic en el elemento padre
  submenuLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      if (isMobile()) {
        e.preventDefault(); // Solo prevenir la acción de redireccionamiento en móviles
        const submenu = this.nextElementSibling.querySelector(".submenuNav");

        if (submenu) {
          submenu.classList.toggle("active");
        }
      }
    });
  });

  // Mostrar submenús en escritorio con hover, no clic (solo aplica para pantallas más grandes)
  if (!isMobile()) {
    submenuLinks.forEach((link) => {
      link.addEventListener("mouseover", function () {
        const submenu = this.nextElementSibling.querySelector(".submenuNav");
        if (submenu) {
          submenu.classList.add("active");
        }
      });

      link.addEventListener("mouseout", function () {
        const submenu = this.nextElementSibling.querySelector(".submenuNav");
        if (submenu) {
          submenu.classList.remove("active");
        }
      });
    });
  }
});
