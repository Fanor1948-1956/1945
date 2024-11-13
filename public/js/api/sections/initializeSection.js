// initializeSection.js
import { loadSections, clearStorage } from './storage.js'
import { initializeModalInputs } from './search.js'
import { initializeDropdown } from './addToDropdown.js'
import { addNewSection } from './create.js'
import { updateSection } from './update.js'

export function initializeSection (keyNamearchive) {
  // Limpiar las secciones previas en la UI

  // Inicializar dropdown y modal
  initializeDropdown('dropdown', 'settingsButton')
  initializeModalInputs()
  // Llamar a loadSections para cargar y mostrar las secciones
  loadSections(keyNamearchive)

  // Escuchar el botón de agregar sección
  document
    .getElementById('addSectionButton')
    .addEventListener('click', () => addNewSection(keyNamearchive))

  // Referenciar updateSection en el ámbito global (si es necesario)
  window.updateSection = updateSection

  // Escuchar el evento para limpiar almacenamiento
  document
    .getElementById('clearStorageButton')
    .addEventListener('click', () => clearStorage(keyNamearchive))
}
