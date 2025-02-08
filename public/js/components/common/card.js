import { createAvatar } from './avatar.js';

import { initializeListeners, initializeModalPublic } from './table.js';
// export function renderCards(
//   headers,
//   data,
//   currentPage,
//   itemsPerPage,
//   containerId = 'cardContainer',
//   onAction,
//   displayType = 'pagination',
//   isPublic = false // Nueva prop
// ) {
//   const start = (currentPage - 1) * itemsPerPage;
//   const end = start + itemsPerPage;
//   const paginatedData = data.slice(start, end);

//   const cardContainer = document.getElementById(containerId);
//   cardContainer.innerHTML = ''; // Limpia el contenido anterior

//   let cardHtml = '';

//   if (displayType === 'carousel') {
//     cardHtml = `
//       <div class="carousel-container">
//         <button class="carousel-prev" id="carousel-prev-${containerId}">‹</button>
//         <div class="carousel-wrapper" id="carousel-wrapper-${containerId}">
//           <div class="carousel-cards">
//     `;
//   } else {
//     cardHtml = '<div class="card-container">';
//   }

//   paginatedData.forEach((item, index) => {
//     const cardNumber = start + index + 1;
//     const avatarElement = createAvatar(item);
//     const avatarHtml = avatarElement.outerHTML;

//     cardHtml += `
//       <div class="card" data-id="${item._id}">
//         <div class="card-main">
//           <div class="card-avatar">${avatarHtml}</div>
//           <div class="card-body">
//             ${headers
//               .filter((header) => header !== '_id') // Excluir _id de los campos visibles
//               .map(
//                 (header, idx) => `
//               <div class="card-field">
//                 <span class="field-value">${
//                   Object.values(item).filter((_, i) => i !== 0)[idx]
//                 }</span>
//               </div>`
//               )
//               .join('')}
//           </div>
//         </div>

//         <div class="cardFooter">

//           ${
//             isPublic
//               ? `<button class="public-button" data-id="${item._id}">
//                   <i class="icon-public">🌐</i> Ver Más
//                 </button>`
//               : `
//                 <span class="card-number">${cardNumber}</span>
//               <button class="more-button" data-id="${item._id}">
//                   <i class="icon-three-dots">⋮</i>
//                 </button>`
//           }
//         </div>

//       </div>
//     `;
//   });

//   if (displayType === 'carousel') {
//     cardHtml += `
//           </div>
//         </div>
//         <button class="carousel-next" id="carousel-next-${containerId}">›</button>
//       </div>
//     `;
//   } else {
//     cardHtml += '</div>';
//   }

//   cardContainer.innerHTML = cardHtml;
//   initializeListeners(paginatedData, onAction);
//   initializeModalPublic(paginatedData, onAction, isPublic);
//   if (displayType === 'carousel') {
//     initializeCarousel(containerId); // Pasar containerId aquí
//   }
// }

// function initializeCarousel(containerId) {
//   let currentIndex = 0;
//   const cards = document.querySelectorAll(
//     `#carousel-wrapper-${containerId} .carousel-cards .card`
//   );
//   const carouselWrapper = document.querySelector(
//     `#carousel-wrapper-${containerId}`
//   );
//   const cardsPerView = 3;
//   const totalCards = cards.length;

//   const nextButton = document.querySelector(`#carousel-next-${containerId}`);
//   const prevButton = document.querySelector(`#carousel-prev-${containerId}`);

//   updateButtonState();

//   nextButton.addEventListener('click', () => {
//     if (currentIndex + cardsPerView < totalCards) {
//       currentIndex += cardsPerView;
//       updateCarouselPosition();
//       updateButtonState();
//     }
//   });

//   prevButton.addEventListener('click', () => {
//     if (currentIndex - cardsPerView >= 0) {
//       currentIndex -= cardsPerView;
//       updateCarouselPosition();
//       updateButtonState();
//     }
//   });

//   function updateCarouselPosition() {
//     carouselWrapper.style.transform = `translateX(-${
//       currentIndex * (cards[0].offsetWidth + 16)
//     }px)`;
//   }

//   function updateButtonState() {
//     prevButton.disabled = currentIndex === 0;
//     nextButton.disabled = currentIndex + cardsPerView >= totalCards;
//   }
// }

export function renderCards(
  headers,
  data,
  currentPage,
  itemsPerPage,
  containerId = 'cardContainer',
  onAction,
  displayType = 'pagination',
  isPublic = false, // Nueva prop
  cardClass = 'card'
) {
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginatedData = data.slice(start, end);

  const cardContainer = document.getElementById(containerId);
  cardContainer.innerHTML = ''; // Limpia el contenido anterior

  let cardHtml = '';

  if (displayType === 'carousel') {
    cardHtml = `
      <div class="carousel-container" id="carousel-container-${containerId}">
        <div class="carousel-wrapper" id="carousel-wrapper-${containerId}">
          <div class="carousel-cards" id="carousel-cards-${containerId}">
    `;
  } else {
    cardHtml = '<div class="card-container">';
  }

  paginatedData.forEach((item, index) => {
    const cardNumber = start + index + 1;
    const avatarElement = createAvatar(item);
    const avatarHtml = avatarElement.outerHTML;

    // Construcción del HTML de cada tarjeta con las clases dinámicas
    cardHtml += `
      <div class="${cardClass}" data-id="${item._id}">
        <div class="${cardClass}-main">  <!-- Aplicamos las clases aquí -->
          <div class="${cardClass}-avatar">${avatarHtml}</div>  <!-- Avatar -->
          <div class="${cardClass}-body">  <!-- Cuerpo -->
            ${headers
              .filter((header) => header !== '_id') // Excluir _id de los campos visibles
              .map(
                (header, idx) => `  
              <div class="${cardClass}-field">
                <span class="field-value">${
                  Object.values(item).filter((_, i) => i !== 0)[idx]
                }</span>
              </div>`
              )
              .join('')}
          </div>
        </div>
        
        <div class="${cardClass}-footer">  <!-- Pie de la tarjeta -->
          ${
            isPublic
              ? `<button class="public-button" data-id="${item._id}">
                  <i class="icon-public">🌐</i> Ver Más
                </button>`
              : ` 
                <span class="${cardClass}-number">${cardNumber}</span>
              <button class="${cardClass}-more-button" data-id="${item._id}">
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
      </div>
    `;
  } else {
    cardHtml += '</div>';
  }

  cardContainer.innerHTML = cardHtml;
  initializeListeners(paginatedData, onAction);
  initializeModalPublic(paginatedData, onAction, isPublic);
  if (displayType === 'carousel') {
    initializeAutoCarousel(containerId, cardClass); // Iniciar el carrusel automático
  }
}

function initializeAutoCarousel(containerId, cardClass) {
  const carouselWrapper = document.querySelector(
    `#carousel-wrapper-${containerId}`
  );
  const carouselCards = document.querySelector(
    `#carousel-cards-${containerId}`
  );
  const cards = document.querySelectorAll(
    `#carousel-cards-${containerId} .${cardClass}`
  );
  const totalCards = cards.length;
  const cardWidth = cards[0].offsetWidth + 16; // Ancho de las tarjetas con márgenes

  // Duplicar las tarjetas para crear el efecto de carrusel infinito
  carouselCards.innerHTML += carouselCards.innerHTML;

  // Animación infinita para desplazar las tarjetas
  const speed = 50; // Nueva velocidad de desplazamiento (en segundos)
  carouselCards.style.animation = `scroll-left ${speed}s linear infinite`;

  // CSS para la animación
  const styleSheet = document.styleSheets[0];
  styleSheet.insertRule(
    `
    @keyframes scroll-left {
      0% {
        transform: translateX(0);
      }
      100% {
        transform: translateX(-${cardWidth * totalCards}px);
      }
    }
  `,
    styleSheet.cssRules.length
  );

  // Ajustar el ancho total de las tarjetas
  carouselWrapper.style.width = `${cardWidth * totalCards}px`;
  carouselCards.style.width = `${cardWidth * totalCards * 2}px`; // Duplicar el ancho para el desplazamiento continuo
}
