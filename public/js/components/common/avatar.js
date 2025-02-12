import { generateRandomClinicIcon } from '../../utils/icons.js'; // Importamos la función de generación de íconos

export function renderAvatars(
  headers,
  data,
  currentPage,
  itemsPerPage,
  containerId = 'avatarContainer',
  onAction,
  displayType = 'pagination',

  isPublic = false,
  onClick = null
) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginatedData = data.slice(start, end);
  let avatarHtml =
    displayType === 'carousel'
      ? `<div class="avatar-carousel-container">
           <div class="avatar-carousel-wrapper">
             <div class="avatar-carousel">`
      : '<div class="avatar-grid">';

  paginatedData.forEach((item, index) => {
    const cardNumber = start + index + 1;
    // Si tiene avatarUrl, usarlo; de lo contrario, asignar un ícono aleatorio de especialidad
    const avatarContent = item.avatarUrl
      ? `<div class="avatar-image" style="background-image: url('${item.avatarUrl}')"></div>`
      : `<div class="avatar-icon">${generateRandomClinicIcon('Especialidad')}
        <span class="card-number">${cardNumber}</span>
        </div>`;

    avatarHtml += `
      <div class="avatar-item" data-id="${item._id}">
        ${avatarContent}
        <div class="avatar-name">${item.name}</div>
        <span class="card-number">${cardNumber}</span>
      </div>
    `;
  });

  avatarHtml += displayType === 'carousel' ? '</div></div></div>' : '</div>';
  container.innerHTML = avatarHtml;

  if (displayType === 'carousel') {
    initializeAvatarCarousel(containerId);
  }

  if (onClick) {
    document.querySelectorAll(`#${containerId} .avatar-item`).forEach((el) => {
      el.addEventListener('click', () => onClick(el.dataset.id));
    });
  }
}

function initializeAvatarCarousel(containerId) {
  const carousel = document.querySelector(`#${containerId} .avatar-carousel`);
  carousel.innerHTML += carousel.innerHTML;
  carousel.style.animation = 'scroll-left 20s linear infinite';
}
