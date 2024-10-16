// dropdown.js - Comportamiento genérico para los dropdowns

document.addEventListener("DOMContentLoaded", () => {
  setupDropdowns(); // Configura todos los dropdowns en la página
});

// Función genérica para configurar dropdowns
const setupDropdowns = () => {
  // Encuentra todos los botones que abren dropdowns
  const dropdownButtons = document.querySelectorAll(".dropdown-button");

  dropdownButtons.forEach((button) => {
    const dropdownId = button.getAttribute("data-target");
    const dropdown = document.getElementById(dropdownId);
    const arrow = button.querySelector(".arrow");

    // Alternar el dropdown al hacer clic en el botón
    button.addEventListener("click", () => {
      const isOpen = dropdown.classList.contains("show");
      if (isOpen) {
        dropdown.classList.remove("show");
        arrow.classList.remove("down");
      } else {
        closeAllDropdowns(); // Cerrar todos los dropdowns abiertos
        dropdown.classList.add("show");
        arrow.classList.add("down");
        adjustDropdownPlacement(button, dropdown); // Ajustar la colocación
      }
    });

    // Cierra el dropdown si se hace clic fuera de él
    document.addEventListener("click", (event) => {
      if (!button.contains(event.target) && !dropdown.contains(event.target)) {
        dropdown.classList.remove("show");
        arrow.classList.remove("down");
      }
    });

    // Maneja la selección de una opción
    dropdown.querySelectorAll(".dropdown-option").forEach((option) => {
      option.addEventListener("click", () => {
        const selectedValue = option.getAttribute("data-value");
        const hiddenInput = document.querySelector(
          `[data-input="${dropdownId}"]`
        );
        if (hiddenInput) {
          hiddenInput.value = selectedValue; // Actualiza el campo oculto correspondiente
        }
        button.innerHTML = `${option.textContent} <span class="arrow down">▼</span>`; // Actualiza el texto del botón
        dropdown.classList.remove("show"); // Oculta el dropdown
        arrow.classList.remove("down");
      });
    });
  });
};

// Función para cerrar todos los dropdowns abiertos
const closeAllDropdowns = () => {
  document.querySelectorAll(".dropdown.show").forEach((dropdown) => {
    dropdown.classList.remove("show");
  });
  document.querySelectorAll(".arrow.down").forEach((arrow) => {
    arrow.classList.remove("down");
  });
};

// Función para ajustar la colocación del dropdown
const adjustDropdownPlacement = (button, dropdown) => {
  const buttonRect = button.getBoundingClientRect();
  const dropdownRect = dropdown.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  const windowWidth = window.innerWidth;

  let top = buttonRect.bottom;
  let left = buttonRect.left;

  if (buttonRect.bottom + dropdownRect.height > windowHeight) {
    top = buttonRect.top - dropdownRect.height;
  }

  if (buttonRect.left + dropdownRect.width > windowWidth) {
    left = buttonRect.right - dropdownRect.width;
  }

  dropdown.style.top = `${top}px`;
  dropdown.style.left = `${left}px`;
};
