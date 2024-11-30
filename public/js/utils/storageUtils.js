import { getElementIdentifier } from '../components/global/contextMenu/generateHas.js'
import { getStoredData, saveDataToLocalStorage } from '../helpers.js'

function updateStoredData (key, newData, identifier) {
  const storedData = getStoredData(key)
  const index = storedData.findIndex(item => item.id === identifier)

  if (index >= 0) {
    storedData[index] = newData
  } else {
    storedData.push(newData)
  }

  saveDataToLocalStorage(key, storedData)
}

// Posiciones
export function savePositionToLocalStorage (dragableId, x, y) {
  const roundedPosition = {
    id: dragableId,
    x: Math.round(x * 100) / 100,
    y: Math.round(y * 100) / 100
  }

  updateStoredData('dragPositions', roundedPosition, dragableId)
  console.log('Posiciones almacenadas:', getStoredData('dragPositions'))
}

// Aplica las posiciones almacenadas a los elementos
export function applyStoredPosition () {
  const storedPositions = getStoredData('dragPositions')
  const appliedPositions = []

  document.querySelectorAll('[isEditable="true"]').forEach(element => {
    const identifier = getElementIdentifier(element)
    const storedPosition = storedPositions.find(pos => pos.id === identifier)

    if (storedPosition) {
      element.style.transform = `translate(${storedPosition.x}px, ${storedPosition.y}px)`
      appliedPositions.push({
        id: identifier,
        x: storedPosition.x,
        y: storedPosition.y
      })
    }
  })

  console.log('Posiciones aplicadas desde localStorage:', appliedPositions)
}

// Colores
export function saveColors (elementId, bgColor, textColor) {
  const colorData = { id: elementId, bgColor, textColor }
  updateStoredData('elementColors', colorData, elementId)
}

// Aplica los colores almacenados a los elementos
export function applyStoredColors () {
  const storedColors = getStoredData('elementColors')

  document.querySelectorAll('[isEditable="true"]').forEach(element => {
    const elementId = getElementIdentifier(element)
    const colorData = storedColors.find(item => item.id === elementId)

    if (colorData) {
      element.style.backgroundColor = colorData.bgColor || ''
      element.style.color = colorData.textColor || ''
    }
  })
}

// Función combinada para aplicar posiciones y colores
export function applyStoredStyles () {
  applyStoredPosition()
  applyStoredColors()
}
