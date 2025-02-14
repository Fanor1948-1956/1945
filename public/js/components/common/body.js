export function createBody (
  containerId,
  headerTitle,
  headerContent,
  content,
  footerContent
) {
  const container = document.getElementById(containerId)

  if (!container) {
    console.error(`Contenedor con ID '${containerId}' no encontrado.`)
    return
  }

  // Limpiar el contenedor antes de agregar elementos nuevos
  container.innerHTML = ''

  // Crear el header FUERA del body-content
  const bodyHeader = document.createElement('div')
  bodyHeader.classList.add('body-header')
  bodyHeader.innerHTML = `
    <div class="body-header-content">
      <h2 class="body-title">${headerTitle}</h2>
      <div class="body-header-actions">${headerContent}</div>
    </div>
  `

  // Crear el content
  const bodyContent = document.createElement('div')
  bodyContent.classList.add('body-content')
  bodyContent.innerHTML = content

  // Crear el footer FUERA del body-content
  const bodyFooter = document.createElement('div')
  bodyFooter.classList.add('body-footer')
  bodyFooter.innerHTML = `
    <div class="body-footer-content">${footerContent}</div>
  `

  // Agregar el header ANTES del contenido
  container.appendChild(bodyHeader)
  container.appendChild(bodyContent)
  container.appendChild(bodyFooter)

  // Verificar la cantidad de cards en el content
  const cards = bodyContent.querySelectorAll('.card')
  if (cards.length > 9) {
    bodyContent.classList.add('enable-scroll')
  } else {
    bodyContent.classList.remove('enable-scroll')
  }

  // Asegurar que el contenido tenga el desplazamiento adecuado
  if (bodyContent.classList.contains('enable-scroll')) {
    bodyContent.style.maxHeight = '60vh'
    bodyContent.style.overflowY = 'auto'
  }
}
