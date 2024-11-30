export const renderSubItemsCheckboxesForSelection = (
  subItems,
  selectedSubItems,
  containerId
) => {
  const container = document.getElementById(containerId)

  if (!container) {
    console.error(`El contenedor con ID "${containerId}" no fue encontrado.`)
    return
  }

  // Limpiar el contenedor antes de agregar los nuevos elementos
  container.innerHTML = ''

  // Crear un contenedor para los checkboxes en formato de "matriz"
  const matrixContainer = document.createElement('div')
  matrixContainer.classList.add('checkbox-matrix-container') // Clase para estilizar la matriz de checkboxes
  container.appendChild(matrixContainer)

  // Variables de paginación
  const itemsPerPage = 20
  let currentPage = 1
  const totalPages = Math.ceil(subItems.length / itemsPerPage)

  // Función recursiva para renderizar los sub-elementos y sus sub-sub-elementos
  const renderSubItemWithSubItems = (subItem, parentContainer) => {
    // Crear checkbox para el subItem
    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.id = `selectSubItems-${subItem._id}`
    checkbox.value = subItem._id

    const label = document.createElement('label')
    label.htmlFor = checkbox.id
    label.textContent = subItem.name

    // Marcar el checkbox si el subItem está en la lista de seleccionados
    checkbox.checked = selectedSubItems.includes(subItem._id)

    // Crear un contenedor para este subItem (checkbox + label)
    const checkboxContainer = document.createElement('div')
    checkboxContainer.classList.add('checkbox-item') // Clase para cada checkbox

    // Agregar el checkbox y el label al contenedor de este subItem
    checkboxContainer.appendChild(checkbox)
    checkboxContainer.appendChild(label)

    // Agregar el contenedor del subItem al contenedor principal de la matriz
    parentContainer.appendChild(checkboxContainer)

    // Si el subItem tiene subSubItems, renderizarlos recursivamente
    if (subItem.subSubItems && subItem.subSubItems.length > 0) {
      const subSubItemsContainer = document.createElement('div')
      subSubItemsContainer.style.marginLeft = '20px' // Indentar los sub-sub-items

      subItem.subSubItems.forEach(subSubItem => {
        renderSubItemWithSubItems(subSubItem, subSubItemsContainer)
      })

      // Agregar el contenedor de subSubItems al contenedor del subItem
      checkboxContainer.appendChild(subSubItemsContainer)
    }
  }

  // Función para renderizar los elementos de la página actual
  const renderPage = page => {
    const startIndex = (page - 1) * itemsPerPage
    const endIndex = Math.min(page * itemsPerPage, subItems.length)
    const itemsToRender = subItems.slice(startIndex, endIndex)

    // Limpiar el contenedor antes de renderizar los nuevos elementos
    matrixContainer.innerHTML = ''

    itemsToRender.forEach(subItem => {
      renderSubItemWithSubItems(subItem, matrixContainer)
    })
  }

  // Función para actualizar los botones de navegación
  const updatePaginationButtons = () => {
    const prevButton = document.getElementById('prevButton')
    const nextButton = document.getElementById('nextButton')

    prevButton.disabled = currentPage === 1 // Deshabilitar "Anterior" en la primera página
    nextButton.disabled = currentPage === totalPages // Deshabilitar "Siguiente" en la última página
  }

  // Función para cambiar de página
  const goToPage = page => {
    if (page >= 1 && page <= totalPages) {
      currentPage = page
      renderPage(currentPage)
      updatePaginationButtons()
    }
  }

  // Renderizar la primera página
  renderPage(currentPage)

  // Crear botones de navegación
  const navContainer = document.createElement('div')
  navContainer.classList.add('pagination-slider-buttons')
  container.appendChild(navContainer)

  const prevButton = document.createElement('button')
  prevButton.id = 'prevButton'
  prevButton.textContent = '<'
  prevButton.onclick = () => goToPage(currentPage - 1)
  navContainer.appendChild(prevButton)

  const nextButton = document.createElement('button')
  nextButton.id = 'nextButton'
  nextButton.textContent = '>'
  nextButton.onclick = () => goToPage(currentPage + 1)
  navContainer.appendChild(nextButton)

  // Inicializar los botones de navegación
  updatePaginationButtons()
}
