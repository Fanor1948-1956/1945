import { initializeSidebar } from './components/global/sidebar.js'
import { applyStoredStyles } from './utils/storageUtils.js'

// Inicializa posiciones y colores almacenados en los elementos al cargar la página
export function initializeElementsOnLoad () {
  initializeSidebar('layoutContainer', false)
  applyStoredStyles()
}

// Llamar a initializeElementsOnLoad cuando la página haya cargado
document.addEventListener('DOMContentLoaded', initializeElementsOnLoad)
