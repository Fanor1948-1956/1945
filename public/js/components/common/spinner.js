// spinner.js

export const showContentAndButton = (showButtonImmediately) => {
  const spinner = document.getElementById('spinner');
  const layoutContainer = document.getElementById('layoutContainer');
  const viewButton = document.getElementById('viewButton');
  const countdownElement = document.getElementById('countdown');

  if (showButtonImmediately) {
    spinner.style.display = 'flex';
    layoutContainer.style.display = 'none';
    viewButton.style.display = 'block';
  } else {
    spinner.style.display = 'flex';
    layoutContainer.style.display = 'none';
    viewButton.style.display = 'none';

    let countdown = 10;
    countdownElement.textContent = countdown;

    const interval = setInterval(() => {
      countdown--;
      countdownElement.textContent = countdown;
      if (countdown <= 0) {
        clearInterval(interval);
        spinner.style.display = 'none';
        layoutContainer.style.display = 'block';
      }
    }, 1000);
  }
};

// Evento del botón "Ver"
export const initializeViewButton = () => {
  const viewButton = document.getElementById('viewButton');
  viewButton.addEventListener('click', () => {
    document.getElementById('spinner').style.display = 'none';
    document.getElementById('layoutContainer').style.display = 'block';
  });
};
