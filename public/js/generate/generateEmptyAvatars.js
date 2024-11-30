import { getActions } from '../logic/upload/actions.js';
import {
  handleGenericClick,
  initializeListeners,
} from '../logic/upload/utils.js';
export function generateEmptyAvatars(count, model, ownerId, startIndex = 0) {
  const uploadsList = document.getElementById('uploadsList');
  const emptyAvatars = [];

  Array.from({ length: count }).forEach((_, i) => {
    const emptyAvatar = document.createElement('div');
    emptyAvatar.classList.add('file-item', 'empty-avatar');

    const svgIcon = getSvgIcon(model);
    const fakeId = `empty-avatar-${model}-${startIndex + i + 1}`; // Usar el índice para crear un ID único
    const editButtonId = `edit-button-${fakeId}`;

    emptyAvatar.innerHTML = `
      <div class="image-container">
        ${svgIcon}
        <button id="${editButtonId}" class="edit-button" data-id="${fakeId}" data-owner-model="${model}" data-owner="defaultOwner">Editar</button>
      </div>
      <p>${fakeId}</p>
    `;

    uploadsList.appendChild(emptyAvatar);
    emptyAvatars.push({ id: fakeId, element: emptyAvatar });

    const data = {
      item: fakeId,
      index: startIndex + i,
      actions: getActions(null),
      ownerModel: model,
      owner: ownerId,
    };

    initializeListeners(editButtonId, handleGenericClick, data);
  });

  return emptyAvatars;
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
