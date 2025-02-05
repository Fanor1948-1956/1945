import { getActions } from '../logic/upload/actions.js';
import {
  handleGenericClick,
  initializeListeners,
} from '../logic/upload/utils.js';

// Función para generar diferentes tipos de componentes (avatar, imagen, tarjeta)
export function generateEmptyComponents(
  count,
  model,
  ownerId,
  startIndex = 0,
  type = 'avatar'
) {
  const uploadsList = document.getElementById('uploadsList');
  const emptyComponents = [];

  Array.from({ length: count }).forEach((_, i) => {
    const fakeId = `${type}-${model}-${startIndex + i + 1}`;
    const editButtonId = `edit-button-${fakeId}`;
    const svgIcon = getSvgIcon(model);
    const data = {
      item: fakeId,
      index: startIndex + i,
      actions: getActions(null),
      ownerModel: model,
      owner: ownerId,
    };

    let componentHtml = '';

    // Generar HTML según el tipo de componente
    switch (type) {
      case 'avatar':
        componentHtml = generateAvatar(svgIcon, fakeId, editButtonId);
        break;
      case 'image':
        componentHtml = generateImage(svgIcon, fakeId, editButtonId);
        break;
      case 'card':
        componentHtml = generateCard(svgIcon, fakeId, editButtonId);
        break;
      default:
        componentHtml = generateAvatar(svgIcon, fakeId, editButtonId); // Default to avatar if no type is given
        break;
    }

    const component = document.createElement('div');
    component.classList.add('file-item', `empty-${type}`);
    component.innerHTML = componentHtml;
    uploadsList.appendChild(component);

    emptyComponents.push({ id: fakeId, element: component });

    // Inicializar escuchadores para cada botón de editar
    initializeListeners(editButtonId, handleGenericClick, data);
  });

  return emptyComponents;
}

// Funciones para cada tipo de componente
function generateAvatar(svgIcon, fakeId, editButtonId) {
  return `
    <div class="image-container">
      ${svgIcon}
      <button id="${editButtonId}" class="edit-button" data-id="${fakeId}" data-owner-model="User" data-owner="defaultOwner">Editar</button>
    </div>
    <p>${fakeId}</p>
  `;
}

function generateImage(svgIcon, fakeId, editButtonId) {
  return `
    <div class="image-container">
      ${svgIcon}
      <button id="${editButtonId}" class="edit-button" data-id="${fakeId}" data-owner-model="User" data-owner="defaultOwner">Editar</button>
    </div>
    <p>Imagen: ${fakeId}</p>
  `;
}

function generateCard(svgIcon, fakeId, editButtonId) {
  return `
    <div class="card">
      ${svgIcon}
      <div class="card-content">
        <h4>Card ${fakeId}</h4>
        <p>Descripción o detalles de la tarjeta.</p>
      </div>
      <button id="${editButtonId}" class="edit-button" data-id="${fakeId}" data-owner-model="User" data-owner="defaultOwner">Editar</button>
    </div>
  `;
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
