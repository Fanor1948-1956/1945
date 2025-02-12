export function generateCards(items, containerId, itemsPerRow) {
  // Obtener el contenedor donde se agregarán las tarjetas
  const container = document.getElementById(containerId);

  if (!container) {
    console.error('Contenedor no encontrado');
    return;
  }

  // Limpiar el contenedor antes de agregar nuevas tarjetas
  container.innerHTML = '';

  // Establecer el número de columnas de manera dinámica usando grid-template-columns
  const columns = itemsPerRow; // Usamos el valor que pasamos (por ejemplo, 4)
  container.style.display = 'grid';
  container.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
  container.style.gap = '5px'; // Espacio entre las tarjetas

  // Iterar sobre cada item y generar una tarjeta
  items.forEach((item, index) => {
    const card = generateCard(item); // Usamos la función que genera la tarjeta por defecto
    container.appendChild(card);
  });
}

// Función por defecto para generar la tarjeta
function generateCard(item) {
  const card = document.createElement('div');
  card.classList.add('card'); // Clase base para la tarjeta

  // Crear el contenido de la tarjeta
  const avatar = document.createElement('div');
  avatar.classList.add('card-avatar');
  avatar.innerHTML = `<img src="${
    item.avatarUrl || 'https://www.w3schools.com/html/img_girl.jpg'
  }" alt="Avatar">`;

  const body = document.createElement('div');
  body.classList.add('card-body');
  body.innerHTML = `
    <h3 class="card-title">${item.name}</h3>
    <p class="card-description">${
      item.description || 'Descripción no disponible'
    }</p>
  `;

  const footer = document.createElement('div');
  footer.classList.add('card-footer');
  footer.innerHTML = `
    <span class="card-date">${item.date || 'Fecha no disponible'}</span>
  `;

  // Agregar los elementos al contenedor de la tarjeta
  card.appendChild(avatar);
  card.appendChild(body);
  card.appendChild(footer);

  return card;
}
