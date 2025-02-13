export function renderCards(items) {
  const cardsContainer = document.createElement('div');
  cardsContainer.classList.add('cards-container'); // Contenedor de las tarjetas

  items.forEach((item) => {
    const card = document.createElement('div');
    card.classList.add('card');

    // Crear el avatar dentro de un div contenedor
    const avatar = document.createElement('div');
    avatar.classList.add('card-avatar');
    avatar.innerHTML = `<img src="${
      item.avatarUrl || 'https://www.w3schools.com/html/img_girl.jpg'
    }" alt="${item.name}">`;

    // Crear el contenido de la tarjeta
    const content = document.createElement('div');
    content.classList.add('card-body');
    content.innerHTML = `
         <h3 class="card-title">${item.name}</h4>
    <p class="card-description">${item.description}</p>
      <small>${item.date}</small>
    `;

    // Agregar avatar y contenido a la tarjeta
    card.appendChild(avatar);
    card.appendChild(content);

    cardsContainer.appendChild(card);
  });

  return cardsContainer;
}
