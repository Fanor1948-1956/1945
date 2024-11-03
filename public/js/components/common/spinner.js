export const showContentAndButton = (showButtonImmediately, countdown = 3) => {
  const spinner = document.getElementById('spinner');
  const layoutContainer = document.getElementById('layoutContainer');
  const viewButton = document.getElementById('viewButton');
  const countdownElement = document.getElementById('countdown');

  const toggleVisibility = (element, shouldShow) => {
    if (shouldShow) {
      element.classList.remove('hidden');
      element.classList.add('visible');
    } else {
      element.classList.remove('visible');
      element.classList.add('hidden');
    }
  };

  if (showButtonImmediately) {
    toggleVisibility(spinner, true); // Mostrar spinner
    toggleVisibility(layoutContainer, false); // Ocultar layout
    toggleVisibility(viewButton, true); // Mostrar botón
  } else {
    toggleVisibility(spinner, true); // Mostrar spinner
    toggleVisibility(layoutContainer, false); // Ocultar layout
    toggleVisibility(viewButton, false); // Ocultar botón

    countdownElement.textContent = countdown;

    const interval = setInterval(() => {
      countdown--;
      countdownElement.textContent = countdown;
      if (countdown <= 0) {
        clearInterval(interval);
        toggleVisibility(spinner, false); // Ocultar spinner
        toggleVisibility(layoutContainer, true); // Mostrar layout
      }
    }, 1000);
  }
};

// Evento del botón "Ver"
export const initializeViewButton = () => {
  const viewButton = document.getElementById('viewButton');
  const spinner = document.getElementById('spinner');
  const layoutContainer = document.getElementById('layoutContainer');

  viewButton.addEventListener('click', () => {
    toggleVisibility(spinner, false); // Ocultar spinner
    toggleVisibility(layoutContainer, true); // Mostrar layout
  });
};
