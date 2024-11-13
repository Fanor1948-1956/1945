// js/update.js
import { loadSections, saveSections } from './storage.js'
// js/update.js

// Editar sección
window.editSection = function (sectionId, keyNamearchive) {
  const section = document.querySelector(
    `.custom-section[data-id="${sectionId}"]`
  )
  if (section) {
    const title = section.querySelector('h2')?.innerText || ''
    const subtitle = section.querySelector('h4')?.innerText || ''
    const content = section.querySelector('.textWrapper')?.innerText || ''

    // Crear el formulario de edición
    const editForm = document.createElement('div')
    editForm.innerHTML = `
      <h3>Editar Sección</h3>
      <label>Título:</label>
      <input type="text" id="editTitle" value="${title}" />
      <label>Subtítulo:</label>
      <input type="text" id="editSubtitle" value="${subtitle}" />
      <label>Contenido:</label>
      <textarea id="editContent">${content}</textarea>
      <button id="saveEditButton">Guardar</button>
      <button id="cancelEditButton">Cancelar</button>
    `
    section.innerHTML = '' // Limpiar el contenido de la sección
    section.appendChild(editForm)

    document.getElementById('saveEditButton')?.addEventListener('click', () => {
      const newTitle = document.getElementById('editTitle').value
      const newSubtitle = document.getElementById('editSubtitle').value
      const newContent = document.getElementById('editContent').value

      // Actualizar la sección en la UI
      updateSection(
        sectionId,
        newTitle,
        newSubtitle,
        newContent,
        keyNamearchive
      )
    })

    document
      .getElementById('cancelEditButton')
      ?.addEventListener('click', () => {
        loadSections(keyNamearchive) // Cargar nuevamente las secciones
      })
  } else {
    console.error(`No se encontró la sección con ID ${sectionId}.`)
  }
}

// Actualizar una sección con nuevos datos
export function updateSection (
  sectionId,
  newTitle,
  newSubtitle,
  newContent,
  keyNamearchive
) {
  const section = document.querySelector(
    `.custom-section[data-id="${sectionId}"]`
  )
  if (section) {
    section.innerHTML = `
      <div class="section-content" >
        <span class="toggle-visibility" data-id="${sectionId}" onclick="toggleSection('${sectionId}')">−</span>
        <h2>${newTitle}</h2>
        <h4>${newSubtitle}</h4>
        <div class="textWrapper">${newContent}</div>
        <button class="remove-section" data-id="${sectionId}" onclick="removeSection('${sectionId}')">Eliminar</button>
        <button class="edit-section" data-id="${sectionId}" onclick="editSection('${sectionId}', '${keyNamearchive}')">Editar</button>
      </div>
    `
    saveSections(keyNamearchive) // Guardar las secciones con el nuevo contenido
  } else {
    console.error(
      `No se pudo actualizar la sección con ID ${sectionId}, no se encontró.`
    )
  }
}

// Eliminar una sección
window.removeSection = function (sectionId) {
  const section = document.querySelector(
    `.custom-section[data-id="${sectionId}"]`
  )
  if (section) {
    section.remove()
    saveSections()
  } else {
    console.error(
      `No se pudo eliminar la sección con ID ${sectionId}, no se encontró.`
    )
  }
}

// Asegura que `updateSection` esté disponible en el ámbito global
window.updateSection = updateSection
