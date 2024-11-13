export function createCustomSection (
  title,
  subtitle,
  content,
  sectionId = Date.now()
) {
  // Crear una nueva sección en la interfaz
  const section = document.createElement('div')
  section.className = 'custom-section'
  section.dataset.id = sectionId

  section.innerHTML = `
    <div class="section-content">
      <span class="toggle-visibility" data-id="${sectionId}" onclick="toggleSection('${sectionId}')">−</span>
      <h2>${title}</h2>
      <h4>${subtitle}</h4>
      <div class="textWrapper">${content}</div>
      <button class="remove-section" data-id="${sectionId}" onclick="removeSection('${sectionId}')">Eliminar</button>
      <button class="edit-section" data-id="${sectionId}" onclick="editSection('${sectionId}')">Editar</button>
    </div>
  `

  // Obtener todas las etiquetas dentro de la sección creada
  const sectionContent = section.querySelector('.section-content')

  // Iterar sobre todas las etiquetas dentro de section-content y agregar el atributo isEditable="true"
  sectionContent.querySelectorAll('*').forEach(element => {
    element.setAttribute('isEditable', 'true')
  })

  // Agregar la sección al contenedor
  document.getElementById('customStack').appendChild(section)
}

export function addNewSection (keyNamearchive) {
  const sectionId = Date.now() // Usamos Date.now() como ID único

  // Crear la nueva sección
  const section = {
    id: sectionId,
    title: `Sección ${sectionId}`,
    subtitle: `Subtítulo ${sectionId}`,
    content: `Contenido de Sección ${sectionId}`
  }

  // Obtener el objeto de secciones globales desde localStorage, o crear uno nuevo si no existe
  const allSections = JSON.parse(localStorage.getItem('allSections')) || {}

  // Inicializar el array de secciones para la clave específica si no existe
  if (!allSections[keyNamearchive]) {
    allSections[keyNamearchive] = []
  }

  // Agregar la nueva sección al array correspondiente en el objeto `allSections`
  allSections[keyNamearchive].push(section)

  // Guardar el objeto actualizado en localStorage
  localStorage.setItem('allSections', JSON.stringify(allSections))

  // Ahora que está guardada, la agregamos a la UI
  createCustomSection(
    section.title,
    section.subtitle,
    section.content,
    sectionId
  )
}
