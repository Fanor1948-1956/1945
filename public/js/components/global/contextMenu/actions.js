// Funciones de acciones

// Funciones para descargar diferentes formatos
export function downloadImage () {
  console.log('Descargar Imagen')
  // Implementar lógica para descargar imagen
}

export function downloadPDF () {
  console.log('Descargar PDF')
  // Implementar lógica para descargar PDF
}

export function downloadWord () {
  console.log('Descargar Word')
  // Implementar lógica para descargar Word
}

export function downloadExcel () {
  console.log('Descargar Excel')
  // Implementar lógica para descargar Excel
}

export function uploadFile (currentElement) {
  console.log('Subir Archivo')
  // Implementar lógica para subir archivo
}
// Función para copiar elementos
export function copyElement (currentElement) {
  if (currentElement) {
    const clone = currentElement.cloneNode(true)
    document.body.appendChild(clone)
    clone.style.position = 'absolute'
    clone.style.left = `${parseInt(currentElement.style.left || 0) + 10}px`
    clone.style.top = `${parseInt(currentElement.style.top || 0) + 10}px`
  }
}

export function setTextAlign (currentElement, alignment) {
  if (currentElement) {
    currentElement.style.textAlign = alignment
  }
}

export function setJustifyContent (currentElement, value) {
  if (currentElement && currentElement.style.display === 'flex') {
    currentElement.style.justifyContent = value
  }
}

// Funciones para cambiar colores

export function openLink (url, newTab = false) {
  if (newTab) {
    window.open(url, '_blank')
  } else {
    window.location.href = url
  }
}

export function removeElement (currentElement) {
  if (currentElement) {
    currentElement.remove()
  }
}
