// js/search.js
import { createCustomSection } from './create.js'
import { createCustomInputs } from '../../components/custom/input.js'

export function initializeModalInputs () {
  const inputSearch = [
    {
      id: 'inputSearch',
      name: 'inputSearch',
      type: 'text',
      placeholder: 'Buscar...',
      attributes: { oninput: 'filterSections(event.target.value)' }
    }
  ]
  const inputContainer = document.getElementById('inputContainer')
  inputContainer.innerHTML = '' // Limpiar inputs anteriores
  const inputs = createCustomInputs(inputSearch)
  inputContainer.appendChild(inputs)

  const inputField = document.getElementById('inputSearch')
  if (inputField) {
    inputField.addEventListener('input', event => {
      filterSections(event.target.value)
    })
  }
}

export function filterSections (query) {
  // Asegurarse de que estamos buscando en las secciones correctas
  const allSections = JSON.parse(localStorage.getItem('allSections')) || {}

  // Obtener todas las secciones de un archivo específico o el array vacío
  const sections = Object.values(allSections).flat()

  const customStack = document.getElementById('customStack')
  customStack.innerHTML = '' // Limpiar resultados previos

  // Filtrar las secciones por título o subtítulo
  const filteredSections = sections.filter(
    section =>
      section.title.toLowerCase().includes(query.toLowerCase()) ||
      section.subtitle.toLowerCase().includes(query.toLowerCase())
  )

  if (filteredSections.length === 0) {
    // Si no hay resultados, mostrar mensaje
    const noResultsMessage = document.createElement('div')
    noResultsMessage.id = 'noResultsMessage'
    noResultsMessage.textContent = 'No hay resultados para la búsqueda.'
    customStack.appendChild(noResultsMessage)
  } else {
    // Si hay resultados, mostrar las secciones filtradas
    filteredSections.forEach(section => {
      createCustomSection(
        section.title,
        section.subtitle,
        section.content,
        section.id
      )
    })
  }
}
