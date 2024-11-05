// dropdown.js
export function initializeDropdown(dropdownId, toggleButtonId) {
  const dropdown = document.getElementById(dropdownId);
  const toggleButton = document.getElementById(toggleButtonId);

  if (!dropdown || !toggleButton) {
    console.error('Dropdown or toggle button not found.');
    return;
  }

  toggleButton.addEventListener('click', (event) => {
    event.stopPropagation(); // Evita que el clic en el botón cierre el dropdown
    dropdown.style.display =
      dropdown.style.display === 'none' ? 'block' : 'none';
  });

  // Cierra el dropdown si se hace clic fuera de él
  document.addEventListener('click', (event) => {
    if (!dropdown.contains(event.target) && event.target !== toggleButton) {
      dropdown.style.display = 'none'; // Oculta el dropdown
    }
  });

  // Cierra el dropdown al redimensionar la ventana
  window.addEventListener('resize', () => {
    dropdown.style.display = 'none'; // Oculta el dropdown
  });

  // Cierra el dropdown al desplazarse
  window.addEventListener('scroll', () => {
    dropdown.style.display = 'none'; // Oculta el dropdown
  });
}

export function addItemToDropdown(dropdownId, content) {
  const dropdown = document.getElementById(dropdownId);
  if (!dropdown) {
    console.error('Dropdown element not found.');
    return;
  }

  const item = document.createElement('li');
  item.className = 'dropdown-item';
  item.innerHTML = content;
  dropdown.appendChild(item);
}

export function clearDropdown(dropdownId) {
  const dropdown = document.getElementById(dropdownId);
  if (!dropdown) {
    console.error('Dropdown element not found.');
    return;
  }

  dropdown.innerHTML = ''; // Limpia todos los elementos
}
