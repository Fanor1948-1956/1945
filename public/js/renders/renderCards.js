import { customModal } from '../components/common/modal.js'

export function renderCards (items) {
  const cardsContainer = document.createElement('div')
  cardsContainer.classList.add('cards-container')

  items.forEach(item => {
    const card = document.createElement('div')
    card.classList.add('card')

    const avatar = document.createElement('div')
    avatar.classList.add('card-avatar')
    avatar.innerHTML = `<img src="${
      item.avatarUrl || 'https://www.w3schools.com/html/img_girl.jpg'
    }" alt="${item.name}">`

    const content = document.createElement('div')
    content.classList.add('card-body')
    content.innerHTML = `
      <h3 class="card-title">${item.name}</h3>
      <p class="card-description">${item.description}</p>
      <small>${item.date}</small>
    `

    const footer = document.createElement('div')
    footer.classList.add('card-footer')
    footer.innerHTML = `
      <span class="icon edit-icon" data-id="${item._id}">✏️</span>
      <span class="icon delete-icon" data-id="${item._id}">🗑️</span>
      <span class="icon archive-icon" data-id="${item._id}">📁</span>
      <span class="icon disable-icon" data-id="${item._id}">🚫</span>
    `

    const handleIconClick = event => {
      const icon = event.target
      const itemId = icon.getAttribute('data-id')
      const selectedItem = items.find(i => i._id === itemId)
      const typeModalId = 'typeModal_' + new Date().getTime()
      console.log('typeModalId', typeModalId)

      console.log(`Acción en item con ID: ${itemId}`)

      if (icon.classList.contains('edit-icon')) {
        customModal(
          typeModalId,
          'medium',
          `Editar item: ${selectedItem.name}`,
          '',
          [],
          document.createTextNode(
            `Detalles del ítem para edición:\n\nNombre: ${selectedItem.name}\nDescripción: ${selectedItem.description}`
          ),
          'Cancelar',
          ''
        )
      } else if (icon.classList.contains('delete-icon')) {
        customModal(
          typeModalId,
          'small',
          `Eliminar item: ${selectedItem.name}`,
          '',
          [],
          document.createTextNode(
            `¿Estás seguro de que deseas eliminar el ítem "${selectedItem.name}"?`
          ),
          'Eliminar',
          ''
        )
      } else if (icon.classList.contains('archive-icon')) {
        customModal(
          typeModalId,
          'medium',
          `Archivar item: ${selectedItem.name}`,
          '',
          [],
          document.createTextNode(
            `¿Quieres archivar el ítem "${selectedItem.name}"?`
          ),
          'Archivar',
          ''
        )
      } else if (icon.classList.contains('disable-icon')) {
        customModal(
          typeModalId,
          'medium',
          `Deshabilitar item: ${selectedItem.name}`,
          '',
          [],
          document.createTextNode(
            `¿Deseas deshabilitar el ítem "${selectedItem.name}"?`
          ),
          'Deshabilitar',
          ''
        )
      }
    }

    footer.querySelectorAll('.icon').forEach(icon => {
      icon.addEventListener('click', handleIconClick)
    })

    card.appendChild(avatar)
    card.appendChild(content)
    card.appendChild(footer)

    cardsContainer.appendChild(card)
  })

  return cardsContainer
}

// export function renderCards (items, actionsType = 'containerIcons') {
//   const cardsContainer = document.createElement('div')
//   cardsContainer.classList.add('cards-container')

//   items.forEach((item, index) => {
//     const card = document.createElement('div')
//     card.classList.add('card')

//     // Avatar
//     const avatar = document.createElement('div')
//     avatar.classList.add('card-avatar')
//     avatar.innerHTML = `<img src="${
//       item.avatarUrl || 'https://www.w3schools.com/html/img_girl.jpg'
//     }" alt="${item.name}">`

//     // Contenido
//     const content = document.createElement('div')
//     content.classList.add('card-body')
//     content.innerHTML = `
//       <h3 class="card-title">${item.name}</h3>
//       <p class="card-description">${item.description}</p>
//       <small>${item.date}</small>
//     `

//     // Footer de la tarjeta
//     const footer = document.createElement('div')
//     footer.classList.add('card-footer')

//     // Contenedor de iconos
//     const iconContainer = document.createElement('div')
//     iconContainer.classList.add('icon-container')

//     // Switch para manejar el tipo de acciones
//     switch (actionsType) {
//       case 'containerIcons':
//         // Íconos siempre visibles
//         iconContainer.innerHTML = `
//           <span class="icon edit-icon">✏️</span>
//           <span class="icon delete-icon">🗑️</span>
//           <span class="icon archive-icon">📁</span>
//           <span class="icon disable-icon">🚫</span>
//         `
//         break

//       case 'buttonAction':
//         // Botón para mostrar/ocultar íconos
//         iconContainer.style.display = 'none'

//         const buttonAction = document.createElement('button')
//         buttonAction.classList.add('icon-button')
//         buttonAction.textContent = '⋮' // Tres puntos verticales

//         buttonAction.addEventListener('click', () => {
//           iconContainer.style.display =
//             iconContainer.style.display === 'none' ? 'flex' : 'none'
//         })

//         footer.appendChild(buttonAction)
//         iconContainer.innerHTML = `
//           <span class="icon edit-icon">✏️</span>
//           <span class="icon delete-icon">🗑️</span>
//           <span class="icon archive-icon">📁</span>
//           <span class="icon disable-icon">🚫</span>
//         `
//         break

//       case 'buttonIcon':
//         // Botón independiente en lugar de iconos dentro del contenedor
//         const buttonIcon = document.createElement('button')
//         buttonIcon.classList.add('button-icon')
//         buttonIcon.innerHTML = '⚙️' // Ícono de configuración

//         buttonIcon.addEventListener('click', () => {
//           alert(`Acciones para ${item.name}`)
//         })

//         footer.appendChild(buttonIcon)
//         break

//       default:
//         console.warn('actionsType no válido, usando containerIcons por defecto')
//         iconContainer.innerHTML = `
//           <span class="icon edit-icon">✏️</span>
//           <span class="icon delete-icon">🗑️</span>
//           <span class="icon archive-icon">📁</span>
//           <span class="icon disable-icon">🚫</span>
//         `
//     }

//     footer.appendChild(iconContainer)
//     footer.innerHTML += `<span class="card-number">${index + 1}</span>`

//     // Agregar elementos a la tarjeta
//     card.appendChild(avatar)
//     card.appendChild(content)
//     card.appendChild(footer)
//     cardsContainer.appendChild(card)
//   })

//   return cardsContainer
// }
