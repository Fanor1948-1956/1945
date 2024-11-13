// // Verificar si el usuario está autenticado y tiene un token válido
// import { createMenu } from './menu.js'
// import { options } from './options.js'
// import { applyTheme, toggleTheme } from './theme.js'

// // Aplica el tema al cargar la página
// document.addEventListener('DOMContentLoaded', () => {
//   applyTheme()

//   const themeToggleBtn = document.getElementById('themeToggleBtn')
//   const sunIcon = document.getElementById('sunIcon')
//   const moonIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg')

//   // Crear el icono de luna
//   moonIcon.setAttribute('id', 'moonIcon')
//   moonIcon.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
//   moonIcon.setAttribute('width', '24')
//   moonIcon.setAttribute('height', '24')
//   moonIcon.setAttribute('fill', 'currentColor')
//   moonIcon.setAttribute('viewBox', '0 0 24 24')
//   moonIcon.innerHTML = `<path d="M12 2C6.48 2 2 6.48 2 12c0 5.52 4.48 10 10 10 5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8c4.41 0 8 3.59 8 8s-3.59 8-8 8z"/><path d="M12.5 6c-.83 0-1.5.67-1.5 1.5S11.67 9 12.5 9s1.5-.67 1.5-1.5S13.33 6 12.5 6z"/>`

//   if (localStorage.getItem('theme') === 'dark') {
//     document.getElementById('themeIcon').innerHTML = moonIcon.outerHTML // Icono de luna para modo oscuro
//   }

//   themeToggleBtn.addEventListener('click', () => {
//     toggleTheme()

//     if (localStorage.getItem('theme') === 'dark') {
//       document.getElementById('themeIcon').innerHTML = moonIcon.outerHTML // Icono de luna
//     } else {
//       document.getElementById('themeIcon').innerHTML = sunIcon.outerHTML // Icono de sol
//     }
//   })
// })

// // Variables globales
// let currentElement

// // Crear elemento para mostrar coordenadas
// const coordinatesDisplay = document.createElement('div')
// coordinatesDisplay.style.position = 'fixed'
// coordinatesDisplay.style.bottom = '10px'
// coordinatesDisplay.style.right = '10px'
// coordinatesDisplay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)'
// coordinatesDisplay.style.color = 'white'
// coordinatesDisplay.style.padding = '5px'
// coordinatesDisplay.style.borderRadius = '5px'
// document.body.appendChild(coordinatesDisplay)

// // Crear menú contextual
// const contextMenu = document.createElement('div')
// contextMenu.className = 'context-menu'
// document.body.appendChild(contextMenu)

// // Mostrar el menú contextual al hacer clic derecho
// document.addEventListener('contextmenu', event => {
//   event.preventDefault()
//   currentElement = event.target // Asignar el elemento actual al que se hizo clic
//   if (currentElement) {
//     // Limpiar el menú antes de añadir nuevas opciones
//     contextMenu.innerHTML = '' // Limpiar las opciones del menú

//     // Obtener opciones dinámicamente, pasando currentElement
//     const arrayOptions = options(currentElement)

//     // Crear el menú con las opciones
//     createMenu(arrayOptions, contextMenu)

//     // Mostrar el menú contextual
//     contextMenu.style.display = 'block'
//     contextMenu.style.left = `${event.pageX}px`
//     contextMenu.style.top = `${event.pageY}px`
//   }
// })

// // Cerrar el menú al hacer clic en cualquier parte
// window.addEventListener('click', () => {
//   contextMenu.style.display = 'none'
// })

// Verificar si el usuario está autenticado y tiene un token válido

import { createMenu } from './menu.js'
import { options } from './options.js'

import { applyTheme, toggleTheme } from './theme.js'

// Aplica el tema al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  applyTheme()

  const themeToggleBtn = document.getElementById('themeToggleBtn')
  const sunIcon = document.getElementById('sunIcon')
  const moonIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg')

  // Crear el icono de luna
  moonIcon.setAttribute('id', 'moonIcon')
  moonIcon.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
  moonIcon.setAttribute('width', '24')
  moonIcon.setAttribute('height', '24')
  moonIcon.setAttribute('fill', 'currentColor')
  moonIcon.setAttribute('viewBox', '0 0 24 24')
  moonIcon.innerHTML = `<path d="M12 2C6.48 2 2 6.48 2 12c0 5.52 4.48 10 10 10 5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8c4.41 0 8 3.59 8 8s-3.59 8-8 8z"/><path d="M12.5 6c-.83 0-1.5.67-1.5 1.5S11.67 9 12.5 9s1.5-.67 1.5-1.5S13.33 6 12.5 6z"/>`

  if (localStorage.getItem('theme') === 'dark') {
    document.getElementById('themeIcon').innerHTML = moonIcon.outerHTML // Icono de luna para modo oscuro
  }

  themeToggleBtn.addEventListener('click', () => {
    toggleTheme()

    if (localStorage.getItem('theme') === 'dark') {
      document.getElementById('themeIcon').innerHTML = moonIcon.outerHTML // Icono de luna
    } else {
      document.getElementById('themeIcon').innerHTML = sunIcon.outerHTML // Icono de sol
    }
  })
})

let currentElement

// Crear elemento para mostrar coordenadas
const coordinatesDisplay = document.createElement('div')
coordinatesDisplay.style.position = 'fixed'
coordinatesDisplay.style.bottom = '10px'
coordinatesDisplay.style.right = '10px'
coordinatesDisplay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)'
coordinatesDisplay.style.color = 'white'
coordinatesDisplay.style.padding = '5px'
coordinatesDisplay.style.borderRadius = '5px'
document.body.appendChild(coordinatesDisplay)

// Crear menú contextual
const contextMenu = document.createElement('div')
contextMenu.className = 'context-menu'
document.body.appendChild(contextMenu)

// Mostrar el menú contextual al hacer clic derecho
document.addEventListener('contextmenu', event => {
  event.preventDefault()
  currentElement = event.target // Asignar el elemento actual al que se hizo clic
  if (currentElement) {
    // Limpiar el menú antes de añadir nuevas opciones
    contextMenu.innerHTML = '' // Limpiar las opciones del menú

    // Obtener opciones dinámicamente, pasando currentElement
    const arrayOptions = options(currentElement)

    // Crear el menú con las opciones
    createMenu(arrayOptions, contextMenu)

    // Mostrar el menú contextual
    contextMenu.style.display = 'block'
    contextMenu.style.left = `${event.pageX}px`
    contextMenu.style.top = `${event.pageY}px`
  }
})

// Cerrar el menú al hacer clic en cualquier parte
window.addEventListener('click', () => {
  contextMenu.style.display = 'none'
})

// Funciones de acciones
function copyElement () {
  if (currentElement) {
    const clone = currentElement.cloneNode(true)
    document.body.appendChild(clone)
    clone.style.position = 'absolute'
    clone.style.left = `${parseInt(currentElement.style.left || 0) + 10}px`
    clone.style.top = `${parseInt(currentElement.style.top || 0) + 10}px`
  }
}

function setTextAlign (alignment) {
  if (currentElement) {
    currentElement.style.textAlign = alignment
  }
}

function setJustifyContent (value) {
  if (currentElement && currentElement.style.display === 'flex') {
    currentElement.style.justifyContent = value
  }
}

function changeColor (type) {
  const colorPicker = document.createElement('input')
  colorPicker.type = 'color'
  colorPicker.value = localStorage.getItem(type) || '#ffffff'

  colorPicker.addEventListener('input', () => {
    if (currentElement) {
      currentElement.style[type] = colorPicker.value
      localStorage.setItem(type, colorPicker.value)
    }
  })
  colorPicker.click()
}

// Función para obtener el enlace actual del localStorage
function getCurrentPath () {
  return localStorage.getItem('currentPath') || 'http://ejemplo.com'
}

// Función para abrir enlaces
function openLink (url, newTab = false) {
  if (newTab) {
    window.open(url, '_blank')
  } else {
    window.location.href = url
  }
}

// Funciones para descargar diferentes formatos
function downloadImage () {
  console.log('Descargar Imagen')
  // Implementar lógica para descargar imagen
}

function downloadPDF () {
  console.log('Descargar PDF')
  // Implementar lógica para descargar PDF
}

function downloadWord () {
  console.log('Descargar Word')
  // Implementar lógica para descargar Word
}

function downloadExcel () {
  console.log('Descargar Excel')
  // Implementar lógica para descargar Excel
}

function uploadFile () {
  console.log('Subir Archivo')
  // Implementar lógica para subir archivo
}

function removeElement () {
  if (currentElement) {
    currentElement.remove()
    currentElement = null
  }
}
