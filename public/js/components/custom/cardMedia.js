export const cardMedia = (containerId, data) => {
  const cardContainer = document.getElementById(containerId);
  cardContainer.className = 'card-media-container grid-view'; // Clase por defecto

  // Mapear la data para crear tarjetas dinámicamente
  data.forEach((item) => {
    const card = document.createElement('div');
    card.className = 'card-media-content';

    const cardHeader = document.createElement('div');
    cardHeader.className = 'card-media-header';
    const cardTitle = document.createElement('h5');
    cardTitle.textContent = item.title;
    cardHeader.appendChild(cardTitle);

    const cardBody = document.createElement('div');
    cardBody.className = 'card-media-body';
    cardBody.innerHTML = item.content;

    if (item.media) {
      const mediaElement = document.createElement('div');
      mediaElement.className = 'card-media';

      if (item.media.type === 'image') {
        const img = document.createElement('img');
        img.src = item.media.src;
        img.alt = item.media.alt || 'Image';
        img.className = 'card-image';
        mediaElement.appendChild(img);
      } else if (item.media.type === 'video') {
        const video = document.createElement('video');
        video.src = item.media.src;
        video.controls = true;
        video.className = 'card-video';
        mediaElement.appendChild(video);
      }
      card.appendChild(mediaElement);
    }

    // 📌 Footer con botones SIEMPRE VISIBLES
    const footer = document.createElement('div');
    footer.className = 'card-media-footer';

    const gridViewBtn = document.createElement('button');
    gridViewBtn.innerHTML = '<i class="fas fa-th"></i>'; // Ícono de cuadrícula
    gridViewBtn.className = 'toggle-grid-view-btn';
    gridViewBtn.addEventListener('click', () => alert('Vista en cuadrícula'));

    const listViewBtn = document.createElement('button');
    listViewBtn.innerHTML = '<i class="fas fa-list"></i>'; // Ícono de lista
    listViewBtn.className = 'toggle-list-view-btn';
    listViewBtn.addEventListener('click', () => alert('Vista en lista'));

    footer.appendChild(gridViewBtn);
    footer.appendChild(listViewBtn);
    card.appendChild(cardHeader);
    card.appendChild(cardBody);
    card.appendChild(footer); // 🔥 Footer SIEMPRE visible

    cardContainer.appendChild(card);
  });
};
