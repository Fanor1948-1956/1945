// charts.js
import { endpointChart } from '../config/apiEndpoints.js' // Asegúrate de tener la ruta correcta

export function renderCharts (items) {
  items.forEach((item, index) => {
    const section = document.createElement('section')
    section.classList.add('dashboard-subsection')

    // Título y enlace del ítem
    const titleLink = document.createElement('a')
    titleLink.href = item.link
    titleLink.classList.add('subsection-title')
    titleLink.textContent = item.title

    // Contenido adicional
    const contentDiv = document.createElement('div')
    contentDiv.classList.add('subsection-content')
    contentDiv.innerHTML = `<p>Contenido adicional o descripción de ${item.title} puede ir aquí.</p>`

    // Crear un canvas para el gráfico
    const canvas = document.createElement('canvas')
    canvas.id = `chart_${index + 1}`
    canvas.width = 400
    canvas.height = 200

    // Agregar el contenido al contenedor
    section.appendChild(titleLink)
    section.appendChild(contentDiv)
    section.appendChild(canvas)
    document.getElementById('items-container').appendChild(section)

    // Determinar el título según el enlace y cargar el gráfico correspondiente
    let chartTitle = ''
    if (item.link === '/users') {
      chartTitle = 'Usuarios Activos/Inactivos por Mes'
      fetchDataAndRenderChart(
        endpointChart.getUsers,
        `chart_${index + 1}`,
        chartTitle
      )
    } else if (item.link === '/users/patient') {
      chartTitle = 'Usuarios Activos/Inactivos por Mes'
      fetchDataAndRenderChart(
        endpointChart.getUsers,
        `chart_${index + 1}`,
        chartTitle
      )
    } else if (item.link === '/roles') {
      chartTitle = 'Roles Activos/Inactivos por Mes'
      fetchDataAndRenderChart(
        endpointChart.getRoles,
        `chart_${index + 1}`,
        chartTitle
      )
    } else if (item.link === '/permissions') {
      chartTitle = 'Permisos Activos/Inactivos por Mes'
      fetchDataAndRenderChart(
        endpointChart.getPermissions,
        `chart_${index + 1}`,
        chartTitle
      )
    } else if (item.link === '/specialties') {
      chartTitle = 'Especialidades Activos/Inactivos por Mes'
      fetchDataAndRenderChart(
        endpointChart.getSpecialties,
        `chart_${index + 1}`,
        chartTitle
      )
    }
  })
}

async function fetchDataAndRenderChart (endpoint, canvasId, chartTitle) {
  try {
    const response = await fetch(endpoint)
    if (!response.ok) throw new Error('Error al obtener los datos')
    console.log('response', response)
    const data = await response.json()
    renderChart(data, canvasId, chartTitle)
  } catch (error) {
    console.error('Error en la carga del gráfico:', error)
  }
}

function renderChart (data, canvasId, chartTitle) {
  const ctx = document.getElementById(canvasId).getContext('2d')
  const labels = data.result.map(item => item.year)
  const monthlyData = data.result.map(item =>
    item.months.map(month => month.totalRecords)
  )

  const datasets = labels.map((year, index) => ({
    label: `Año ${year}`,
    data: monthlyData[index],
    borderColor: `hsl(${Math.random() * 360}, 100%, 50%)`,
    fill: false,
    tension: 0.1
  }))

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: [
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto',
        'Septiembre',
        'Octubre',
        'Noviembre',
        'Diciembre'
      ],
      datasets
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: chartTitle // Título dinámico basado en el enlace
        },
        legend: {
          position: 'top'
        }
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Meses'
          }
        },
        y: {
          title: {
            display: true,
            text: 'Número de Usuarios'
          },
          beginAtZero: true
        }
      }
    }
  })
}
