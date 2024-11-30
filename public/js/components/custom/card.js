// Función para crear una tarjeta y agregarla a un contenedor específico
export function createCard(containerId, title, formHTML) {
  const cardContainer = document.getElementById(containerId); // Obtiene el contenedor por ID

  // Crear los elementos de la tarjeta
  const card = document.createElement('div');
  card.className = 'card';

  const cardHeader = document.createElement('div');
  cardHeader.className = 'card-header';
  const cardTitle = document.createElement('h5');
  cardTitle.textContent = title;
  cardHeader.appendChild(cardTitle);

  const cardBody = document.createElement('div');
  cardBody.className = 'card-body';
  cardBody.innerHTML = formHTML; // Agregar el contenido del formulario

  // Añadir el encabezado y el cuerpo a la tarjeta
  card.appendChild(cardHeader);
  card.appendChild(cardBody);

  // Añadir la tarjeta al contenedor
  cardContainer.appendChild(card);
}
