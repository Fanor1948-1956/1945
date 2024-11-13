import { isAuthenticated, token } from './options.js'

export function createMenu (options, parent) {
  options.forEach(option => {
    // Comprobar si se requiere autenticación y si el usuario no está autenticado o no tiene token
    if (option.authRequired && !(isAuthenticated && token)) {
      return // Saltar opciones que requieren autenticación si el usuario no está autenticado o no hay token
    }

    const item = document.createElement('div')
    item.innerText = option.label
    item.style.padding = '8px 12px'
    item.style.cursor = 'pointer'
    item.style.color = '#fff'
    item.style.position = 'relative'

    if (option.subOptions) {
      const arrow = document.createElement('span')
      arrow.innerText = ' ▶'
      arrow.style.fontSize = '0.8em'
      arrow.style.marginLeft = '5px'
      item.appendChild(arrow)

      const subMenu = document.createElement('div')
      subMenu.className = 'sub-menu'
      subMenu.style.display = 'none'
      subMenu.style.position = 'absolute'
      subMenu.style.left = '100%'
      subMenu.style.top = '0'
      subMenu.style.backgroundColor = '#333'
      subMenu.style.zIndex = '1000'
      subMenu.style.minWidth = '150px'
      subMenu.style.borderRadius = '5px'

      option.subOptions.forEach(subOption => {
        const subItem = document.createElement('div')
        subItem.innerText = subOption.label
        subItem.style.padding = '8px 12px'
        subItem.style.cursor = 'pointer'
        subItem.style.color = '#fff'

        subItem.addEventListener('click', event => {
          event.stopPropagation()
          parent.style.display = 'none'
          subOption.action()
        })

        subMenu.appendChild(subItem)
      })

      item.appendChild(subMenu)
      item.addEventListener('mouseenter', () => {
        subMenu.style.display = 'block'
      })
      item.addEventListener('mouseleave', () => {
        subMenu.style.display = 'none'
      })
    } else {
      item.addEventListener('click', () => {
        parent.style.display = 'none'
        option.action()
      })
    }

    parent.appendChild(item)
  })
}
