import { actions } from '../logic/upload/actions.js';
import {
  handleGenericClick,
  initializeListeners,
} from '../logic/upload/utils.js';

export function generateEmptyAvatars(count, model, ownerId) {
  const uploadsList = document.getElementById('uploadsList');

  const emptyAvatars = Array.from({ length: count });

  emptyAvatars.forEach((_, i) => {
    const emptyAvatar = document.createElement('div');
    emptyAvatar.classList.add('file-item', 'empty-avatar');

    // Ajustar el SVG según el modelo
    const svgIcon = getSvgIcon(model);

    // Generar un ID único para avatares vacíos, prefijando con "empty-avatar-"
    const fakeId = `empty-avatar-${Date.now()}-${i + 1}`; // o algún generador de ID único
    const editButtonId = `edit-button-${fakeId}`;

    emptyAvatar.innerHTML = `
      <div class="image-container">
        ${svgIcon}
        <button id="${editButtonId}" class="edit-button" data-id="${fakeId}" data-owner-model="${model}" data-owner="defaultOwner">Editar</button>
      </div>
      <p>${fakeId}</p>
    `;

    uploadsList.appendChild(emptyAvatar);

    // Definir data para la función genérica, diferenciando entre elementos de datos y elementos vacíos
    const data = {
      item: fakeId, // Este será único pero no relacionado a base de datos
      actions,
      ownerModel: model,
      owner: ownerId,
    };

    initializeListeners(editButtonId, handleGenericClick, data);
  });
}

// Función para obtener el SVG según el modelo
export function getSvgIcon(model) {
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
