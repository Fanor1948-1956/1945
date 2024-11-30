import {
  copyElement,
  setTextAlign,
  openLink,
  removeElement
} from './actions.js'
import { changeBackgroundColor, changeTextColor } from './colorBaground.js'
import { enableDragMode } from './dragDrop.js'

export const isAuthenticated =
  localStorage.getItem('isAuthenticated') === 'true'
export const token = localStorage.getItem('token')

export const options = currentElement => {
  const authOptions =
    isAuthenticated && token
      ? [
          {
            label: 'Copiar',
            action: () => copyElement(currentElement),
            authRequired: true
          },
          {
            label: 'Alinear',
            authRequired: true,
            subOptions: [
              {
                label: 'Izquierda',
                action: () => setTextAlign(currentElement, 'left')
              },
              {
                label: 'Centro',
                action: () => setTextAlign(currentElement, 'center')
              },
              {
                label: 'Derecha',
                action: () => setTextAlign(currentElement, 'right')
              }
            ]
          },
          {
            label: 'Color',
            authRequired: true,
            subOptions: [
              {
                label: 'Fondo',
                action: () => changeBackgroundColor(currentElement)
              },
              {
                label: 'Texto',
                action: () => changeTextColor(currentElement)
              }
            ]
          },
          {
            label: 'Mover',
            action: () => enableDragMode(currentElement),
            authRequired: true
          },
          {
            label: 'Eliminar',
            action: () => removeElement(currentElement),
            authRequired: true
          },
          {
            label: 'Abrir Enlace',
            authRequired: true,
            action: () => openLink('http://ejemplo.com')
          }
        ]
      : []

  return [
    ...authOptions,
    { label: 'Actualizar', action: () => location.reload() }
  ]
}
