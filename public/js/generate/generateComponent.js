export function generateComponents(
  count,
  model,
  ownerId,
  type = 'avatar',
  startIndex = 0
) {
  const componentsList = document.getElementById('uploadsList');
  const components = [];

  Array.from({ length: count }).forEach((_, i) => {
    const component = document.createElement('div');
    component.classList.add('file-item', `${type}-component`);

    const svgIcon = getSvgIcon(model);
    const fakeId = `${type}-${model}-${startIndex + i + 1}`; // Usar el índice para crear un ID único
    const editButtonId = `edit-button-${fakeId}`;

    // Definir el HTML según el tipo de componente
    let componentHTML = '';
    switch (type) {
      case 'avatar':
        componentHTML = `
          <div class="image-container">
            ${svgIcon}
            <button id="${editButtonId}" class="edit-button" data-id="${fakeId}" data-owner-model="${model}" data-owner="defaultOwner">Editar</button>
          </div>
          <p>${fakeId}</p>
        `;
        break;
      case 'image':
        componentHTML = `
          <div class="image-container">
            <img src="${svgIcon}" alt="Imagen" />
            <button id="${editButtonId}" class="edit-button" data-id="${fakeId}" data-owner-model="${model}" data-owner="defaultOwner">Editar</button>
          </div>
          <p>${fakeId}</p>
        `;
        break;
      case 'card':
        componentHTML = `
          <div class="card-container">
            <h3>${model} Card</h3>
            <p>Este es un componente de tarjeta para el modelo ${model}</p>
            <button id="${editButtonId}" class="edit-button" data-id="${fakeId}" data-owner-model="${model}" data-owner="defaultOwner">Editar</button>
          </div>
        `;
        break;
      default:
        componentHTML = `
          <div class="image-container">
            ${svgIcon}
            <button id="${editButtonId}" class="edit-button" data-id="${fakeId}" data-owner-model="${model}" data-owner="defaultOwner">Editar</button>
          </div>
          <p>${fakeId}</p>
        `;
        break;
    }

    component.innerHTML = componentHTML;
    componentsList.appendChild(component);
    components.push({ id: fakeId, element: component });

    const data = {
      item: fakeId,
      index: startIndex + i,
      actions: getActions(null),
      ownerModel: model,
      owner: ownerId,
    };

    initializeListeners(editButtonId, handleGenericClick, data);
  });

  return components;
}
