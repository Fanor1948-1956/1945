// Función para generar un hash simple del texto
export function generateHash (text) {
  let hash = 0
  for (let i = 0; i < text.length; i++) {
    hash = (hash << 5) - hash + text.charCodeAt(i)
    hash |= 0 // Asegura que el valor sea un entero de 32 bits
  }
  return Math.abs(hash).toString(36) // Convertir el hash a base 36 para hacerlo más corto y legible
}
// Función para generar un hash a partir de una cadena de texto
// Función para enmascarar el hash generado
export function maskId (hash) {
  const mask = 'editable-'
  return mask + hash // Retornar el hash enmascarado con un prefijo
}

// Obtener el identificador del elemento basado en clase, id o generarlo si es necesario
export function getElementIdentifier (element) {
  if (element.classList.length > 0) {
    return [...element.classList].join('-') // Usar todas las clases combinadas como identificador
  }
  if (element.id) {
    return element.id
  }
  const hash = generateHash(element.textContent.trim() || Date.now().toString())
  const maskedId = maskId(hash)
  element.id = maskedId // Asignar el id generado al elemento
  return maskedId
}
