import {
  showContentAndButton,
  initializeViewButton
} from '../../components/common/spinner.js'
import { loadContent, scrollToHash } from '../utils/index.js'

export function initializeSidebar (idContainer, showButtonImmediately = false) {
  const hamburgerBtn = document.getElementById('hamburgerBtn')
  const sidebar = document.getElementById('sidebar')
  const layoutContainer = document.getElementById(idContainer)
  const submenuLinks = document.querySelectorAll('.sidebar ul li > a')

  showContentAndButton(showButtonImmediately)

  // Manejar el clic en el botón hamburguesa
  hamburgerBtn.addEventListener('click', event => {
    event.stopPropagation() // Evitar que el evento se propague al documento
    console.log('Hamburger button clicked')
    toggleSidebar()
  })

  // Manejar el clic fuera de la barra lateral
  document.addEventListener('click', event => {
    const isClickInsideSidebar = sidebar.contains(event.target)
    const isClickOnHamburger = hamburgerBtn.contains(event.target)

    // Si el clic está fuera de la barra lateral y el botón hamburguesa está activo, cerrarlo
    if (
      !isClickInsideSidebar &&
      !isClickOnHamburger &&
      sidebar.classList.contains('active')
    ) {
      console.log('Click detected outside sidebar; closing sidebar')
      closeSidebar()
    }
  })

  submenuLinks.forEach(link => {
    const submenu = link.nextElementSibling // Obtener el submenú correspondiente
    const parentLi = link.parentElement // Obtener el elemento padre (li)

    // Evento para manejar el clic en el enlace
    link.addEventListener('click', event => {
      const parentHref = link.getAttribute('data-route')
      event.preventDefault() // Prevenir comportamiento predeterminado
      console.log(`Link clicked: ${parentHref}`)

      // Cerrar otros elementos antes de activar el actual
      closeOtherElements(parentLi)

      // Manejar el submenú si existe
      if (submenu) {
        console.log('Toggling submenu')
        toggleSubmenu(submenu, parentLi, link)
      } else {
        // Si es un enlace simple
        activateLink(parentLi, link, parentHref)
      }
    })

    // Agregar un evento de clic al elemento padre (li)
    parentLi.addEventListener('click', event => {
      // Verificar si el clic no fue en un submenú y redirigir
      if (!submenu || !submenu.classList.contains('active')) {
        event.stopPropagation() // Evitar que el clic se propague
        const parentHref = link.getAttribute('data-route')
        console.log(`Parent clicked; redirecting to path: ${parentHref}`)

        // Llamamos a loadContent o redirigimos a la ruta directamente
        if (parentHref.startsWith('#')) {
          scrollToHash(parentHref) // Si es un hash, hacer scroll
        } else {
          showContentAndButton(false)

          closeSidebar() // Cerrar la barra lateral después de cargar contenido
        }
      }
    })

    // Mantener activo el padre cuando el mouse está sobre el submenú
    if (submenu) {
      submenu.addEventListener('mouseenter', () => {
        console.log('Mouse entered submenu; keeping parent active')
        parentLi.classList.add('active') // Mantener activo el padre
      })

      submenu.addEventListener('mouseleave', () => {
        console.log('Mouse left submenu; checking for active children')
        // Verificar si hay algún hijo activo al salir
        if (!submenu.querySelector('.active')) {
          parentLi.classList.remove('active') // Remover activo al salir
        }
      })
    }
  })

  const toggleSidebar = () => {
    console.log('Toggling sidebar')
    sidebar.classList.toggle('active')
    layoutContainer.classList.toggle('shifted')
  }

  const closeSidebar = () => {
    console.log('Closing sidebar')
    sidebar.classList.remove('active')
    layoutContainer.classList.remove('shifted')
  }

  const toggleSubmenu = (submenu, parentLi, link) => {
    const isActive = submenu.classList.contains('active')
    console.log(`Toggling submenu for link: ${link.textContent}`)
    submenu.classList.toggle('active', !isActive) // Alternar el estado del submenú
    parentLi.classList.toggle('active', !isActive) // Alternar el estado activo del padre
    link.classList.toggle('active', !isActive) // Alternar el estado activo del hijo
  }

  const activateLink = (parentLi, link, parentHref) => {
    console.log(`Activating link: ${parentHref}`)
    parentLi.classList.add('active') // Activar el padre
    link.classList.add('active') // Activar el hijo también

    // Activar abuelo si existe
    const grandParentLi = parentLi.parentElement.parentElement
    if (grandParentLi) {
      grandParentLi.classList.add('active') // Activar el abuelo si existe
    }

    if (parentHref.startsWith('#')) {
      scrollToHash(parentHref)
    } else {
      showContentAndButton(false)
      loadContent(parentHref, true)
      closeSidebar() // Cerrar la barra lateral después de cargar contenido
    }
  }

  const closeOtherElements = currentLi => {
    submenuLinks.forEach(link => {
      const submenu = link.nextElementSibling
      const parentLi = link.parentElement

      // Si no es el elemento actual, cerramos sus submenús y desactivamos
      if (parentLi !== currentLi) {
        if (submenu) {
          submenu.classList.remove('active')
        }
        parentLi.classList.remove('active')
        link.classList.remove('active') // Desactivar también el hijo
      }
    })
  }

  initializeViewButton()

  // Cerrar el sidebar si se cambia el tamaño de la ventana
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && sidebar.classList.contains('active')) {
      console.log('Window resized; closing sidebar if active')
      closeSidebar()
    }
  })

  // Manejar el cambio de estado del historial
  window.addEventListener('popstate', event => {
    if (event.state && event.state.url) {
      console.log(`Loading content for URL: ${event.state.url}`)
      showContentAndButton(false)
      loadContent(event.state.url, false)
    }
  })
}
