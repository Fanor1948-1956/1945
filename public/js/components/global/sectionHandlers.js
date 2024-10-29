document.addEventListener('DOMContentLoaded', () => {
  // Script para la sección de bienvenida
  const welcomeSection = document.querySelector(
    '[data-section-id="welcome-section"]'
  );
  if (welcomeSection) {
    welcomeSection.addEventListener('click', () => {
      alert('Bienvenidos a nuestra página!');
    });
  }

  // Script para la sección de información
  const infoSection = document.querySelector(
    '[data-section-id="info-section"]'
  );
  if (infoSection) {
    infoSection.addEventListener('click', () => {
      alert('Esta es la sección de información');
    });
  }

  // Agrega más scripts aquí para otras secciones
});
