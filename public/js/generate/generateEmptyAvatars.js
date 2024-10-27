export const defaultAvatarCount = 5;

export function generateEmptyAvatars(count, model) {
  const uploadsList = document.getElementById('uploadsList');

  for (let i = 0; i < count; i++) {
    const emptyAvatar = document.createElement('div');
    emptyAvatar.classList.add('file-item', 'empty-avatar');

    // Aquí puedes ajustar el SVG según el modelo
    const svgIcon = getSvgIcon(model); // Llamamos a la función que devuelve el SVG según el modelo

    // Asignamos un ID ficticio para los botones de edición
    const fakeId = `${Date.now()}-${i + 1}`; // ID único basado en el tiempo y el índice

    emptyAvatar.innerHTML = `
      <div class="image-container" >
        ${svgIcon}  <!-- Insertamos el SVG directamente aquí -->
        <button class="edit-button" data-id="${fakeId}" data-owner-model="${model}" data-owner="defaultOwner">Editar</button>
      </div>
      <p>${fakeId}</p>
    `;

    // Agregar el avatar vacío a la lista existente
    uploadsList.appendChild(emptyAvatar);
  }
}

// Función para obtener el SVG según el modelo
function getSvgIcon(model) {
  switch (model) {
    case 'User':
      return `<svg class="icon" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-3.31 0-10 1.67-10 5v3h20v-3c0-3.33-6.69-5-10-5z"/></svg>`;
    case 'Specialty':
      return `<svg><!-- SVG para especialidad --></svg>`; // Reemplaza esto con el SVG correspondiente
    case 'Post':
      return `<svg><!-- SVG para post --></svg>`; // Reemplaza esto con el SVG correspondiente
    case 'default':
    default:
      return `<svg><!-- SVG por defecto --></svg>`; // Reemplaza esto con el SVG correspondiente
  }
}
