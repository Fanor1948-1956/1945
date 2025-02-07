import { actions } from '../utils/index.js';
import { createAvatar } from './avatar.js';
import { showPopover } from './popover.js';

export function renderCards(
  headers,
  data,
  currentPage,
  itemsPerPage,
  containerId = 'cardContainer', // ID del contenedor de tarjetas por defecto (cardContainer)
  onAction,
  displayType = 'pagination' // Nuevo parámetro para definir el tipo de visualización (por defecto 'pagination')
) {
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginatedData = data.slice(start, end);

  const cardContainer = document.getElementById(containerId);
  cardContainer.innerHTML = ''; // Limpia el contenido anterior

  let cardHtml = '';

  // Si el displayType es 'carousel', se debe cambiar el contenedor
  if (displayType === 'carousel') {
    cardHtml = `
      <div class="carousel-container">
        <button class="carousel-prev">‹</button>
        <div class="carousel-wrapper">
          <div class="carousel-cards">
    `; // Inicia el contenedor del carrusel con flechas de navegación
  } else {
    // Solo muestra la paginación si no es un carrusel
    cardHtml = '<div class="card-container">'; // El contenedor estándar para paginación
  }

  paginatedData.forEach((item, index) => {
    const cardNumber = start + index + 1; // Número de la tarjeta
    const avatarElement = createAvatar(item); // Generar avatar
    const avatarHtml = avatarElement.outerHTML; // Convertir a HTML

    cardHtml += `
      <div class="card" data-id="${item._id}">
        <div class="card-main">
          <div class="card-avatar">${avatarHtml}</div>
          <div class="card-body">
            ${headers
              .filter((header) => header !== '_id')
              .map(
                (header, idx) => `
              <div class="card-field">
                <span class="field-value">${
                  Object.values(item).filter((_, i) => i !== 0)[idx]
                }</span>
              </div>`
              )
              .join('')}
          </div>
        </div>
        <div class="card-footer">
          <span class="card-number">${cardNumber}</span>
          <button class="more-button" data-id="${item._id}">
            <i class="icon-three-dots">⋮</i>
          </button>
        </div>
      </div>
    `;
  });

  // Si el displayType es 'carousel', añade el código para el carrusel
  if (displayType === 'carousel') {
    cardHtml += `
          </div> <!-- Fin de carousel-cards -->
        </div> <!-- Fin de carousel-wrapper -->
        <button class="carousel-next">›</button>
      </div> <!-- Fin de carousel-container -->
    `;
  } else {
    // Cierra el contenedor de tarjetas para paginación
    cardHtml += '</div>';
  }

  cardContainer.innerHTML = cardHtml;

  initializeListeners(paginatedData, onAction);

  // Inicializa el carrusel si es necesario
  if (displayType === 'carousel') {
    initializeCarousel();
  }
}

function initializeListeners(paginatedData, onAction) {
  const actionButtons = document.querySelectorAll('.more-button');
  actionButtons.forEach((button) => {
    button.removeEventListener('click', handleActionClick);
    button.addEventListener('click', handleActionClick);
  });

  function handleActionClick(event) {
    const itemId = event.target.closest('.more-button').getAttribute('data-id');
    const item = paginatedData.find((dataItem) => dataItem._id === itemId);
    showPopover(item, actions, event.target, onAction);
    event.stopPropagation();
  }
}
function initializeCarousel() {
  let currentIndex = 0; // Índice actual del carrusel
  const cards = document.querySelectorAll('.carousel-cards .card');
  const carouselWrapper = document.querySelector('.carousel-wrapper');

  // Mostrar 3 tarjetas por vez
  const cardsPerView = 3;
  const totalCards = cards.length;

  const nextButton = document.querySelector('.carousel-next');
  const prevButton = document.querySelector('.carousel-prev');

  // Inicializa el estado de los botones
  updateButtonState();

  console.log('Iniciado carrusel con total de tarjetas:', totalCards);

  // Flecha de siguiente
  nextButton.addEventListener('click', () => {
    console.log('Clic en "next". Current index:', currentIndex);

    if (currentIndex + cardsPerView < totalCards) {
      currentIndex += cardsPerView; // Avanza en el carrusel
      console.log('Avanzando. Nuevo index:', currentIndex);
      updateCarouselPosition();
      updateButtonState();
    }
  });

  // Flecha de anterior
  prevButton.addEventListener('click', () => {
    console.log('Clic en "prev". Current index:', currentIndex);

    if (currentIndex - cardsPerView >= 0) {
      currentIndex -= cardsPerView; // Retrocede en el carrusel
      console.log('Retrocediendo. Nuevo index:', currentIndex);
      updateCarouselPosition();
      updateButtonState();
    }
  });

  // Actualiza la posición del carrusel en función del índice actual
  function updateCarouselPosition() {
    console.log(
      'Actualizando posición del carrusel. Current index:',
      currentIndex
    );
    carouselWrapper.style.transform = `translateX(-${
      currentIndex * (cards[0].offsetWidth + 16)
    }px)`; // Desplaza el carrusel
  }

  // Actualiza el estado de los botones (habilitado/deshabilitado)
  function updateButtonState() {
    console.log(
      'Actualizando estado de los botones. Current index:',
      currentIndex
    );

    // Desactivar el botón 'prev' si estamos al inicio
    if (currentIndex === 0) {
      prevButton.disabled = true;
      prevButton.classList.add('disabled'); // Añadir clase 'disabled'
    } else {
      prevButton.disabled = false;
      prevButton.classList.remove('disabled'); // Eliminar clase 'disabled'
    }

    // Desactivar el botón 'next' si estamos al final
    if (currentIndex + cardsPerView >= totalCards) {
      nextButton.disabled = true;
      nextButton.classList.add('disabled'); // Añadir clase 'disabled'
    } else {
      nextButton.disabled = false;
      nextButton.classList.remove('disabled'); // Eliminar clase 'disabled'
    }
  }
}
