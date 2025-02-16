export function renderPagination (currentPage, totalItems, itemsPerPage) {
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  // Crear contenedor de paginación
  const paginationContainer = document.createElement('div')
  paginationContainer.classList.add('pagination')

  // Botón de configuración (puedes adaptarlo según lo que necesites)
  const settingsButton = document.createElement('button')
  settingsButton.classList.add('custom-button')
  settingsButton.setAttribute('id', 'customButton')

  const settingsIcon = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'svg'
  )
  settingsIcon.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
  settingsIcon.setAttribute('width', '16')
  settingsIcon.setAttribute('height', '16')
  settingsIcon.setAttribute('fill', 'currentColor')
  settingsIcon.setAttribute('class', 'bi bi-gear')
  settingsIcon.setAttribute('viewBox', '0 0 16 16')

  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
  path.setAttribute(
    'd',
    'M8 4.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zM2 8a6 6 0 1 1 12 0 6 6 0 0 1-12 0zm6-7a1 1 0 0 1 .8 1.6l-.8.4-.8-.4A1 1 0 1 1 8 1zm-4.3 1.4a1 1 0 0 1 1.4.3l.4.8-.4.8a1 1 0 0 1-1.4-.3l-.4-.8a1 1 0 0 1 .3-1.4zm8.4 0a1 1 0 0 1 .4 1.4l-.4.8-.4-.8a1 1 0 0 1 .3-1.4zM1 8a1 1 0 0 1 0-2h1.5a1 1 0 0 1 0 2H1zm12.5 0a1 1 0 0 1 0-2H15a1 1 0 0 1 0 2h-1.5zm-2.5 4.5a1 1 0 0 1-.4 1.4l-.8-.4-.4.8a1 1 0 0 1-1.6-.8l.4-.8-.8-.4a1 1 0 0 1 0-1.6l.8-.4-.4-.8a1 1 0 0 1 1.4-1.6l.8.4.4-.8a1 1 0 0 1 1.6 1.6l-.4.8.8.4a1 1 0 0 1 0 1.6l-.8.4.4.8a1 1 0 0 1-1.4 1.6l-.4-.8-.8.4a1 1 0 0 1-.8 0zm-7.4 0a1 1 0 0 1-1.4-1.6l.4-.8-.8-.4a1 1 0 0 1 0-1.6l.8-.4-.4-.8a1 1 0 0 1 1.6-1.6l.4.8.8-.4a1 1 0 0 1 0 1.6l-.8.4.4.8a1 1 0 0 1-1.4 1.6l-.4-.8-.8.4z'
  )
  settingsIcon.appendChild(path)
  settingsButton.appendChild(settingsIcon)

  // Crear la lista de botones de paginación
  const paginationButtons = document.createElement('div')
  paginationButtons.classList.add('pagination-buttons')

  // Botón para la página anterior
  if (currentPage > 1) {
    const prevButton = document.createElement('button')
    prevButton.classList.add('page-button')
    prevButton.setAttribute('data-page', currentPage - 1)
    prevButton.textContent = 'Anterior'
    paginationButtons.appendChild(prevButton)
  }

  // Lógica para la paginación dinámica
  const maxVisibleButtons = 5
  let startPage = Math.max(1, currentPage - Math.floor(maxVisibleButtons / 2))
  let endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1)

  if (endPage - startPage < maxVisibleButtons - 1) {
    startPage = Math.max(1, endPage - maxVisibleButtons + 1)
  }

  // Agregar el primer grupo de páginas
  if (startPage > 1) {
    const firstPageButton = document.createElement('button')
    firstPageButton.classList.add('page-button')
    firstPageButton.setAttribute('data-page', 1)
    firstPageButton.textContent = '1'
    paginationButtons.appendChild(firstPageButton)
    if (startPage > 2) {
      const dots = document.createElement('span')
      dots.classList.add('dots')
      dots.textContent = '...'
      paginationButtons.appendChild(dots)
    }
  }

  // Agregar las páginas visibles
  for (let i = startPage; i <= endPage; i++) {
    const pageButton = document.createElement('button')
    pageButton.classList.add('page-button')
    if (i === currentPage) {
      pageButton.classList.add('active')
    }
    pageButton.setAttribute('data-page', i)
    pageButton.textContent = i
    paginationButtons.appendChild(pageButton)
  }

  // Agregar el último grupo de páginas
  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      const dots = document.createElement('span')
      dots.classList.add('dots')
      dots.textContent = '...'
      paginationButtons.appendChild(dots)
    }
    const lastPageButton = document.createElement('button')
    lastPageButton.classList.add('page-button')
    lastPageButton.setAttribute('data-page', totalPages)
    lastPageButton.textContent = totalPages
    paginationButtons.appendChild(lastPageButton)
  }

  // Botón para la página siguiente
  if (currentPage < totalPages) {
    const nextButton = document.createElement('button')
    nextButton.classList.add('page-button')
    nextButton.setAttribute('data-page', currentPage + 1)
    nextButton.textContent = 'Siguiente'
    paginationButtons.appendChild(nextButton)
  }

  // Agregar los elementos al contenedor
  paginationContainer.appendChild(settingsButton)
  paginationContainer.appendChild(paginationButtons)

  console.log('HTML de la paginación:', paginationContainer) // Verifica el contenedor

  return paginationContainer
}
