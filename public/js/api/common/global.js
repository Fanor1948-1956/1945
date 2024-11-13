import { saveSections } from '../sections/storage'

// Función para alternar la visibilidad de una sección (usar en el evento `onclick`)
window.toggleSection = function (sectionId) {
  const section = document.querySelector(
    `.custom-section[data-id="${sectionId}"]`
  )
  if (section) {
    const toggleButton = section.querySelector('.toggle-visibility')
    const isCollapsed = section.style.display === 'none'
    section.style.display = isCollapsed ? 'block' : 'none'
    toggleButton.textContent = isCollapsed ? '−' : '+'
    saveSections() // Guarda el estado en localStorage
  }
}

// Función para alternar la visibilidad de una sección específica desde el dropdown
window.toggleVisibility = function (sectionId) {
  const section = document.querySelector(
    `.custom-section[data-id="${sectionId}"]`
  )
  if (section) {
    const isCurrentlyVisible = section.style.display !== 'none'
    section.style.display = isCurrentlyVisible ? 'none' : 'block'
    saveSections()
    updateEyeButton(sectionId, isCurrentlyVisible) // Asegura actualizar el icono de visibilidad si es necesario
  }
}
