

document.addEventListener("DOMContentLoaded", () => {
  setupDropdowns(); 
});


const setupDropdowns = () => {
  
  const dropdownButtons = document.querySelectorAll(".dropdown-button");

  dropdownButtons.forEach((button) => {
    const dropdownId = button.getAttribute("data-target");
    const dropdown = document.getElementById(dropdownId);
    const arrow = button.querySelector(".arrow");

    
    button.addEventListener("click", () => {
      const isOpen = dropdown.classList.contains("show");
      if (isOpen) {
        dropdown.classList.remove("show");
        arrow.classList.remove("down");
      } else {
        closeAllDropdowns(); 
        dropdown.classList.add("show");
        arrow.classList.add("down");
        adjustDropdownPlacement(button, dropdown); 
      }
    });

    
    document.addEventListener("click", (event) => {
      if (!button.contains(event.target) && !dropdown.contains(event.target)) {
        dropdown.classList.remove("show");
        arrow.classList.remove("down");
      }
    });

    
    dropdown.querySelectorAll(".dropdown-option").forEach((option) => {
      option.addEventListener("click", () => {
        const selectedValue = option.getAttribute("data-value");
        const hiddenInput = document.querySelector(
          `[data-input="${dropdownId}"]`
        );
        if (hiddenInput) {
          hiddenInput.value = selectedValue; 
        }
        button.innerHTML = `${option.textContent} <span class="arrow down">▼</span>`; 
        dropdown.classList.remove("show"); 
        arrow.classList.remove("down");
      });
    });
  });
};


const closeAllDropdowns = () => {
  document.querySelectorAll(".dropdown.show").forEach((dropdown) => {
    dropdown.classList.remove("show");
  });
  document.querySelectorAll(".arrow.down").forEach((arrow) => {
    arrow.classList.remove("down");
  });
};


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
