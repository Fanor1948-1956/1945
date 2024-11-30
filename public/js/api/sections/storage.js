// storage.js
import { createCustomSection } from './create.js'
import { addToDropdown } from './addToDropdown.js'

// Cargar secciones en la UI (para refrescar la UI con las secciones actuales)
export function loadSections (keyNamearchive) {
  // Obtener las secciones desde localStorage para el archivo específico
  const allSections = JSON.parse(localStorage.getItem('allSections')) || {}
  const sections = allSections[keyNamearchive] || [] // Si no hay secciones, retorna un array vacío

  console.log('Secciones cargadas:', sections) // Verifica las secciones cargadas

  // Limpiar la UI antes de mostrar las nuevas secciones
  document.getElementById('customStack').innerHTML = ''

  // Crear las secciones en la UI
  sections.forEach(section => {
    createCustomSection(
      section.title,
      section.subtitle,
      section.content,
      section.id
    )
    addToDropdown(section.id, section.title)
  })
}

// Guardar las secciones actuales de la UI en allSections con base en keyNamearchive
export function saveSections (keyNamearchive) {
  const sections = Array.from(document.querySelectorAll('.custom-section')).map(
    section => ({
      id: section.dataset.id,
      title: section.querySelector('h2').innerText,
      subtitle: section.querySelector('h4').innerText,
      content: section.querySelector('.textWrapper').innerText
    })
  )

  const allSections = JSON.parse(localStorage.getItem('allSections')) || {}
  allSections[keyNamearchive] = sections
  localStorage.setItem('allSections', JSON.stringify(allSections)) // Guardar en localStorage
}

// Limpiar las secciones de un archivo específico en allSections
export function clearStorage (keyNamearchive) {
  const allSections = JSON.parse(localStorage.getItem('allSections')) || {}
  delete allSections[keyNamearchive] // Eliminar solo las secciones del archivo actual
  localStorage.setItem('allSections', JSON.stringify(allSections)) // Actualizar en localStorage
  loadSections(allSections[keyNamearchive] || []) // Refrescar la UI con las secciones actualizadas
}
