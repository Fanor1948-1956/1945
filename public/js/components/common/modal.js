import { renderCards } from '../../renders/renderCards.js'
import { customPaginationUi } from '../custom-ui/pagination.js'

export function customModal (
  modalId,
  size = 'medium',
  title = '',
  backgroundColor = '',
  items = [], // Valor por defecto vacío
  content = null, // Contenido opcional
  footer = '',
  isStateType = ''
) {
  // Buscar el modal en el DOM, si no existe, lo creamos
  let modal = document.getElementById(modalId)

  if (!modal) {
    // Crear el modal si no existe
    modal = document.createElement('div')
    modal.id = modalId // Asignar ID dinámico
    modal.classList.add('customModal')
    document.body.appendChild(modal) // Añadir al body del documento

    const modalContent = document.createElement('div')
    modalContent.classList.add('customModal-content')
    modal.appendChild(modalContent)

    const modalHeader = document.createElement('div')
    modalHeader.classList.add('customModal-header')
    modalContent.appendChild(modalHeader)

    const modalTitle = document.createElement('h2')
    modalTitle.classList.add('customModal-title')
    modalHeader.appendChild(modalTitle)

    const closeButton = document.createElement('span')
    closeButton.classList.add('close-button')
    closeButton.innerText = '×'
    closeButton.onclick = () => closeModal(modalId)
    modalHeader.appendChild(closeButton)

    const modalBody = document.createElement('div')
    modalBody.classList.add('customModal-body')
    modalContent.appendChild(modalBody)

    const modalFooter = document.createElement('div')
    modalFooter.classList.add('customModal-footer')
    modalContent.appendChild(modalFooter)
  }

  // Configuración del modal
  const modalContent = modal.querySelector('.customModal-content')
  const modalTitle = modal.querySelector('.customModal-title')
  const modalBody = modal.querySelector('.customModal-body')
  const modalFooter = modal.querySelector('.customModal-footer')

  if (backgroundColor) modalContent.style.backgroundColor = backgroundColor
  if (size) modalContent.classList.add(size)
  modalTitle.innerHTML = title
  modalBody.innerHTML = ''

  // Si hay contenido, lo insertamos
  if (content) {
    modalBody.appendChild(content)
  } else {
    modalBody.innerHTML = '<p>Sin contenido disponible</p>'
  }

  modalFooter.innerHTML = ''

  // Si hay paginación o acciones, se manejan
  if (isStateType === 'pagination' && items.length > 0) {
    const paginationContainer = document.createElement('div')
    paginationContainer.id = 'pagination-container'
    modalFooter.appendChild(paginationContainer)
    customPaginationUi(paginationContainer, items, renderCards)
  } else if (isStateType === 'actions') {
    const actionsContainer = document.createElement('div')
    actionsContainer.id = 'actions-container'
    modalFooter.appendChild(actionsContainer)
    actions(actionsContainer)
  } else {
    modalFooter.innerHTML = footer
  }

  // Mostrar el modal con animación
  modal.style.display = 'flex'
  modal.style.opacity = 0
  modalContent.style.transform = 'translateY(-50px)'

  setTimeout(() => {
    modal.style.opacity = 1
    modalContent.style.transform = 'translateY(0)'
  }, 10)
}

export function closeModal (modalId) {
  const modal = document.getElementById(modalId)
  if (!modal) {
    console.error(`Modal con ID '${modalId}' no encontrado.`)
    return
  }

  const modalContent = modal.querySelector('.customModal-content')
  modalContent.style.transform = 'translateY(-50px)'
  modal.style.opacity = 0

  setTimeout(() => {
    modal.style.display = 'none'
  }, 300)
}
