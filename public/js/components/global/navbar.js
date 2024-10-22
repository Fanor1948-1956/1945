document.addEventListener("DOMContentLoaded", function () {
  const navbarLinks = document.getElementById("navbarLinks");

  const submenuLinks = document.querySelectorAll(".has-submenu");



  
  function isMobile() {
    return window.innerWidth <= 768; 
  }

  
  submenuLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      if (isMobile()) {
        e.preventDefault(); 
        const submenu = this.nextElementSibling.querySelector(".submenuNav");

        if (submenu) {
          submenu.classList.toggle("active");
        }
      }
    });
  });

  
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
