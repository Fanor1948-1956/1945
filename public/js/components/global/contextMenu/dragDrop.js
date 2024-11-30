import {
  applyStoredPosition,
  savePositionToLocalStorage
} from '../../../utils/storageUtils.js'
import { getElementIdentifier } from './generateHas.js'

// Datos de arrastre compartidos
let draggingData = {}

// Habilita el modo de arrastre en un elemento específico
export function enableDragMode (currentElement) {
  if (!currentElement) return

  const identifier = getElementIdentifier(currentElement)
  let data = draggingData[identifier]

  // Inicializa datos si es la primera vez
  if (!data) {
    data = createInitialDragData()
    draggingData[identifier] = data
  }

  // Activa arrastre solo si no está ya en arrastre
  if (!data.isDragging) {
    data.isDragging = true
    applyInitialStyles(currentElement)

    if (currentElement.isEditable) {
      applyStoredPosition(currentElement)
    }

    startDragMode(currentElement, identifier)
  }
}

// Crea un objeto de datos inicial para el arrastre
function createInitialDragData () {
  return {
    isDragging: false,
    initialX: 0,
    initialY: 0,
    currentX: 0,
    currentY: 0,
    moveHistory: [],
    removeEventListeners: null
  }
}

// Configura el modo de arrastre en el elemento
function startDragMode (currentElement, dragableId) {
  applyActiveDragStyles(currentElement)
  const data = draggingData[dragableId]

  // Limpiar event listener previo si existe
  if (data.mousedownListener) {
    currentElement.removeEventListener('mousedown', data.mousedownListener)
  }

  // Añadir event listener para inicio de arrastre
  data.mousedownListener = event => {
    if (data.isDragging) startDrag(event, currentElement, dragableId)
  }
  currentElement.addEventListener('mousedown', data.mousedownListener)
}

// Comienza el proceso de arrastre cuando se detecta un mousedown
function startDrag (event, currentElement, dragableId) {
  event.preventDefault()

  const data = draggingData[dragableId]
  if (data && data.isDragging) {
    initializeDragData(data, event)
    currentElement.classList.add('dragging')

    const mouseMoveHandler = e => dragElement(e, currentElement, dragableId)
    const mouseUpHandler = () => stopDrag(currentElement, dragableId)

    document.addEventListener('mousemove', mouseMoveHandler)
    document.addEventListener('mouseup', mouseUpHandler)

    // Guardar manejadores para limpiar eventos luego
    data.removeEventListeners = () => {
      document.removeEventListener('mousemove', mouseMoveHandler)
      document.removeEventListener('mouseup', mouseUpHandler)
      console.log(
        `Eventos de arrastre eliminados para el elemento: ${dragableId}`
      )
    }
  }
}

// Actualiza la posición del elemento en función del movimiento del mouse
function dragElement (event, currentElement, dragableId) {
  const data = draggingData[dragableId]
  if (data && data.isDragging) {
    updatePosition(data, event)
    updateElementPosition(currentElement, data)
    updateCoordinateDisplay(data)
  }
}

// Finaliza el proceso de arrastre
function stopDrag (currentElement, dragableId) {
  const data = draggingData[dragableId]
  if (data && data.isDragging) {
    data.isDragging = false
    savePositionToLocalStorage(dragableId, data.currentX, data.currentY)
    resetElementStyles(currentElement)

    if (data.removeEventListeners) {
      data.removeEventListeners()
      data.removeEventListeners = null
      console.log('Eventos de arrastre limpiados en stopDrag')
    }
    console.log('Arrastre detenido para el elemento:', dragableId)
  }
}

// Funciones de Utilidad

function initializeDragData (data, event) {
  data.initialX = event.clientX
  data.initialY = event.clientY
}

function updatePosition (data, event) {
  const deltaX = event.clientX - data.initialX
  const deltaY = event.clientY - data.initialY
  data.currentX += deltaX
  data.currentY += deltaY
  data.moveHistory.push({ x: data.currentX, y: data.currentY })
  data.initialX = event.clientX
  data.initialY = event.clientY
}

function updateElementPosition (element, data) {
  element.style.transform = `translate(${data.currentX}px, ${data.currentY}px)`
}

function updateCoordinateDisplay (data) {
  const coordinatesDisplay = document.getElementById('coordinatesDisplay')
  if (coordinatesDisplay) {
    coordinatesDisplay.innerHTML = `
      <div><strong>Posición Actual:</strong> X: ${data.currentX}px, Y: ${data.currentY}px</div>
    `
  }
}

function applyInitialStyles (element) {
  element.style.boxShadow = '0 4px 8px rgba(0, 0, 250, 0.2)'
  element.style.zIndex = '1000'
  element.style.border = '2px dashed rgba(144, 238, 144, 0.8)'
}

function applyActiveDragStyles (element) {
  element.style.position = 'relative'
  element.style.border = '2px solid yellow'
  element.style.boxShadow = '2px 2px 2px black'
}

function resetElementStyles (element) {
  element.style.boxShadow = ''
  element.style.zIndex = ''
  element.style.border = ''
  element.classList.remove('dragging')
}

// Almacena la posición en el localStorage
