import { createAvatar } from './avatar.js';

import { initializeListeners, initializeModalPublic } from './table.js';

export function renderMedia(
  headers,
  data,
  currentPage,
  itemsPerPage,
  containerId = 'cardMediaContainer',
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

  if (displayType === 'carouselMedia') {
    cardHtml = `
      <div class="carouselMedia-container">
        <button class="carouselMedia-prev">‹</button>
        <div class="carouselMedia-wrapper">
          <div class="carouselMedia-cards">
    `;
  } else {
    cardHtml = '<div class="cardMedia-container">';
  }

  paginatedData.forEach((item, index) => {
    const cardNumber = start + index + 1;
    const avatarElement = createAvatar(item);
    const avatarHtml = avatarElement.outerHTML;

    cardHtml += `
      <div class="cardMedia" data-id="${item._id}">
        <div class="cardMedia-main">
          <div class="cardMedia-avatar">${avatarHtml}</div>
          <div class="cardMedia-body">
            ${headers
              .filter((header) => header !== '_id') // Excluir _id de los campos visibles
              .map(
                (header, idx) => `
              <div class="cardMedia-field">
                <span class="field-value">${
                  Object.values(item).filter((_, i) => i !== 0)[idx]
                }</span>
              </div>`
              )
              .join('')}
          </div>
        </div>
        
        <div class="cardMediaFooter">
        
          ${
            isPublic
              ? `<button class="public-button" data-id="${item._id}">
                  <i class="icon-public">🌐</i> Ver Más
                </button>`
              : `
                <span class="cardMedia-number">${cardNumber}</span>
              <button class="more-button" data-id="${item._id}">
                  <i class="icon-three-dots">⋮</i>
                </button>`
          }
        </div>

      </div>
    `;
  });

  if (displayType === 'carouselMedia') {
    cardHtml += `
          </div>
        </div>
        <button class="carouselMedia-next">›</button>
      </div>
    `;
  } else {
    cardHtml += '</div>';
  }

  cardContainer.innerHTML = cardHtml;
  initializeListeners(paginatedData, onAction);
  initializeModalPublic(paginatedData, onAction, isPublic);
  if (displayType === 'carouselMedia') {
    initializeCarousel();
  }
}

function initializeCarousel() {
  let currentIndex = 0;
  const cards = document.querySelectorAll('.carouselMedia-cards .cardMedia');
  const carouselWrapper = document.querySelector('.carouselMedia-wrapper');
  const cardsPerView = 3;
  const totalCards = cards.length;

  const nextButton = document.querySelector('.carouselMedia-next');
  const prevButton = document.querySelector('.carouselMedia-prev');

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
