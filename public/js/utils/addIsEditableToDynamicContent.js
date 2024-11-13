// Función para agregar 'isEditable="true"' a todos los elementos deseados
export function addIsEditableToDynamicContent () {
  // Seleccionamos los elementos a los que se les debe agregar el atributo (por ejemplo, todos los elementos dentro de un contenedor específico)
  const editableElements = document.querySelectorAll('*')

  // Recorremos los elementos y les agregamos el atributo 'isEditable' si no lo tienen ya
  editableElements.forEach(element => {
    // Si el elemento no tiene el atributo 'isEditable', lo agregamos
    if (!element.hasAttribute('isEditable')) {
      element.setAttribute('isEditable', 'true')
    }
  })
}

// Ejecutar la función después de que la página esté completamente cargada
document.addEventListener('DOMContentLoaded', addIsEditableToDynamicContent)

// Si el contenido sigue generándose después de que se carga la página (ej. mediante AJAX), puedes llamar a la función después de cada actualización
