import { createAvatar } from './avatar.js';

import { initializeListeners } from './table.js';

export function renderCards(
  headers,
  data,
  currentPage,
  itemsPerPage,
  containerId = 'cardContainer',
  onAction,
  displayType = 'pagination',
  isPublic = false // Nueva prop
) {
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginatedData = data.slice(start, end);

  const cardContainer = document.getElementById(containerId);
  cardContainer.innerHTML = ''; // Limpia el contenido anterior

  let cardHtml = '';

  if (displayType === 'carousel') {
    cardHtml = `
      <div class="carousel-container">
        <button class="carousel-prev">‹</button>
        <div class="carousel-wrapper">
          <div class="carousel-cards">
    `;
  } else {
    cardHtml = '<div class="card-container">';
  }

  paginatedData.forEach((item, index) => {
    const cardNumber = start + index + 1;
    const avatarElement = createAvatar(item);
    const avatarHtml = avatarElement.outerHTML;

    cardHtml += `
      <div class="card" data-id="${item._id}">
        <div class="card-main">
          <div class="card-avatar">${avatarHtml}</div>
          <div class="card-body">
            ${headers
              .filter((header) => header !== '_id') // Excluir _id de los campos visibles
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
        
        <div class="cardFooter">
        
          ${
            isPublic
              ? `<button class="public-button" data-id="${item._id}">
                  <i class="icon-public">🌐</i> Ver Más
                </button>`
              : `
                <span class="card-number">${cardNumber}</span>
              <button class="more-button" data-id="${item._id}">
                  <i class="icon-three-dots">⋮</i>
                </button>`
          }
        </div>

      </div>
    `;
  });

  if (displayType === 'carousel') {
    cardHtml += `
          </div>
        </div>
        <button class="carousel-next">›</button>
      </div>
    `;
  } else {
    cardHtml += '</div>';
  }

  cardContainer.innerHTML = cardHtml;
  initializeListeners(paginatedData, onAction);
  if (displayType === 'carousel') {
    initializeCarousel();
  }
}

function initializeCarousel() {
  let currentIndex = 0;
  const cards = document.querySelectorAll('.carousel-cards .card');
  const carouselWrapper = document.querySelector('.carousel-wrapper');
  const cardsPerView = 3;
  const totalCards = cards.length;

  const nextButton = document.querySelector('.carousel-next');
  const prevButton = document.querySelector('.carousel-prev');

  updateButtonState();

  nextButton.addEventListener('click', () => {
    if (currentIndex + cardsPerView < totalCards) {
      currentIndex += cardsPerView;
      updateCarouselPosition();
      updateButtonState();
    }
  });

  prevButton.addEventListener('click', () => {
    if (currentIndex - cardsPerView >= 0) {
      currentIndex -= cardsPerView;
      updateCarouselPosition();
      updateButtonState();
    }
  });

  function updateCarouselPosition() {
    carouselWrapper.style.transform = `translateX(-${
      currentIndex * (cards[0].offsetWidth + 16)
    }px)`;
  }

  function updateButtonState() {
    prevButton.disabled = currentIndex === 0;
    nextButton.disabled = currentIndex + cardsPerView >= totalCards;
  }
}
