import { applyStoredColors, saveColors } from '../../../utils/storageUtils.js'
import { getElementIdentifier } from './generateHas.js'

// Cambiar color de fondo y guardar en el array de colores
export function changeBackgroundColor (currentElement) {
  if (!currentElement) return

  const elementId = getElementIdentifier(currentElement)
  const colorPicker = document.createElement('input')
  colorPicker.type = 'color'
  colorPicker.value = '#ffffff'

  colorPicker.addEventListener('input', () => {
    currentElement.style.backgroundColor = colorPicker.value
    saveColors(elementId, colorPicker.value, currentElement.style.color)
    applyStoredColors()
  })
  colorPicker.click()
}

// Cambiar color de texto y guardar en el array de colores
export function changeTextColor (currentElement) {
  if (!currentElement) return

  const elementId = getElementIdentifier(currentElement)
  const colorPicker = document.createElement('input')
  colorPicker.type = 'color'
  colorPicker.value = '#000000'

  colorPicker.addEventListener('input', () => {
    currentElement.style.color = colorPicker.value
    saveColors(
      elementId,
      currentElement.style.backgroundColor,
      colorPicker.value
    )
    applyStoredColors()
  })
  colorPicker.click()
}

// Obtener colores almacenados en un array en localStorage
