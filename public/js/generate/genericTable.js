// Función para crear la tabla con un menú contextual específico para la tabla
export function createTable (headers, data, container, options = {}) {
  container.innerHTML = '' // Limpiar el contenido previo

  const table = document.createElement('table')
  table.style.width = '100%'
  table.style.borderCollapse = 'collapse'
  table.border = 1

  const thead = document.createElement('thead')
  const headerRow = document.createElement('tr')

  // Crear las celdas de encabezado
  headers.forEach(header => {
    const th = document.createElement('th')
    th.textContent = header

    if (options.hideDoctorColumn && header === 'Doctor') {
      th.style.display = 'none'
    }

    headerRow.appendChild(th)
  })
  thead.appendChild(headerRow)
  table.appendChild(thead)

  const tbody = document.createElement('tbody')

  // Crear las filas de la tabla
  data.forEach(rowData => {
    const row = document.createElement('tr')

    headers.forEach(header => {
      const td = document.createElement('td')
      td.classList.add('context-cell') // Agregar clase para las celdas

      if (options.hideDoctorColumn && header === 'Doctor') {
        td.style.display = 'none'
      }

      td.textContent =
        rowData[header] === 'No disponible' ? '' : rowData[header]
      row.appendChild(td)

      // Escuchar clic derecho en celdas para abrir el menú contextual
      td.addEventListener('contextmenu', event => {
        event.preventDefault() // Prevenir el menú contextual por defecto
        event.stopPropagation() // Evitar que el clic se propague al documento global

        openContextMenu(event, rowData) // Abrir menú contextual
      })
    })

    tbody.appendChild(row)
  })

  table.appendChild(tbody)
  container.appendChild(table)

  // Función para abrir el menú contextual específico para la tabla
  function openContextMenu (event, rowData) {
    const menu = document.getElementById('tableContextMenu')

    // Posicionar el menú en la ubicación del clic
    menu.style.left = `${event.pageX}px`
    menu.style.top = `${event.pageY}px`
    menu.style.display = 'block'

    // Opciones del menú
    document.getElementById('tableViewDetails').onclick = () => {
      alert('Ver detalles: ' + JSON.stringify(rowData))
      menu.style.display = 'none' // Cerrar el menú
    }

    document.getElementById('tableEditSchedule').onclick = () => {
      alert('Editar horario: ' + rowData.Especialidad)
      menu.style.display = 'none' // Cerrar el menú
    }

    document.getElementById('tableDeleteSchedule').onclick = () => {
      alert('Eliminar horario: ' + rowData.Especialidad)
      menu.style.display = 'none' // Cerrar el menú
    }
  }

  // Cerrar el menú si se hace clic fuera de la tabla
  document.addEventListener('click', event => {
    const menu = document.getElementById('tableContextMenu')
    if (
      !menu.contains(event.target) &&
      !event.target.closest('.table-container')
    ) {
      menu.style.display = 'none' // Cerrar el menú
    }
  })
}

// Menú contextual global (si lo tienes) — El menú global no se verá afectado
document.addEventListener('contextmenu', event => {
  // Aquí puedes añadir tu lógica para el menú global, si es necesario.
  // Asegúrate de evitar que se active en la tabla.
  if (event.target.closest('.table-container')) {
    // Si el clic es dentro de la tabla, no hacer nada o manejarlo de manera especial
    return
  }

  // Aquí agregarías el código del menú contextual global
})
