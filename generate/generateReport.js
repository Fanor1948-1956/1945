const puppeteer = require('puppeteer')
const path = require('path')
const {
  getAvailableYears,
  getMonthlyActiveData,
  getMonthlyInactiveData
} = require('../utils/dataUtils.js')
const resolveModel = require('../utils/modelResolve.js')
const fs = require('fs')
async function generateReport (req, res) {
  const { modelName, year, chartType = 'bar' } = req.query // El tipo de gráfico por defecto es 'bar'

  if (!modelName || !year) {
    return res.status(400).send('Faltan parámetros: "modelName" y "year"')
  }

  try {
    const Model = resolveModel(modelName)

    // Obtener los años disponibles para el modelo seleccionado
    const availableYears = await getAvailableYears(Model)

    // Obtener los datos activos e inactivos para el año seleccionado
    const activeData = await getMonthlyActiveData(Model, year)
    const inactiveData = await getMonthlyInactiveData(Model, year)

    // Preparar los datos para los gráficos
    const months = []
    let totalActiveRecords = 0
    let totalInactiveRecords = 0

    for (let i = 0; i < 12; i++) {
      const activeMonthData = activeData.find(item => item._id === i + 1) || {
        count: 0
      }
      const inactiveMonthData = inactiveData.find(
        item => item._id === i + 1
      ) || { count: 0 }

      months.push({
        month: i + 1,
        activeRecords: activeMonthData.count,
        inactiveRecords: inactiveMonthData.count,
        totalRecords: activeMonthData.count + inactiveMonthData.count
      })

      totalActiveRecords += activeMonthData.count
      totalInactiveRecords += inactiveMonthData.count
    }

    // Crear la carpeta "pdf" si no existe
    const pdfFolderPath = path.join(__dirname, 'pdf')
    if (!fs.existsSync(pdfFolderPath)) {
      fs.mkdirSync(pdfFolderPath)
    }

    // Abrir Puppeteer y generar el PDF
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    // Renderizar el HTML con el gráfico según el tipo seleccionado
    await page.setContent(`
      <html>
        <head>
          <title>Reporte de Gráficos</title>
          <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        </head>
        <body>
          <h1>Reporte de Gráficos para el Modelo: ${modelName} - Año ${year}</h1>
          <canvas id="myChart" width="400" height="400"></canvas>
          <script>
            const ctx = document.getElementById('myChart').getContext('2d');
            const myChart = new Chart(ctx, {
              type: '${chartType}',  // Usar el tipo de gráfico que seleccionó el usuario
              data: {
                labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                datasets: [{
                  label: 'Registros Activos',
                  data: ${JSON.stringify(
                    months.map(month => month.activeRecords)
                  )},
                  borderColor: 'rgba(75, 192, 192, 1)',
                  backgroundColor: 'rgba(75, 192, 192, 0.2)',
                  fill: false
                },
                {
                  label: 'Registros Inactivos',
                  data: ${JSON.stringify(
                    months.map(month => month.inactiveRecords)
                  )},
                  borderColor: 'rgba(255, 99, 132, 1)',
                  backgroundColor: 'rgba(255, 99, 132, 0.2)',
                  fill: false
                }]
              }
            });
          </script>

          <!-- Resumen de Totales -->
          <h2>Resumen de Registros para el Año ${year}</h2>
          <p><strong>Registros Activos:</strong> ${totalActiveRecords}</p>
          <p><strong>Registros Inactivos:</strong> ${totalInactiveRecords}</p>
          <p><strong>Total de Registros:</strong> ${
            totalActiveRecords + totalInactiveRecords
          }</p>
          <p>Este reporte incluye los registros activos e inactivos mensuales, junto con un resumen anual. Los datos reflejan la actividad y los cambios ocurridos durante el año ${year} para el modelo ${modelName}.</p>
        </body>
      </html>
    `)

    await page.waitForSelector('#myChart') // Esperar que el gráfico esté completamente renderizado

    // Generar el PDF con los gráficos y guardarlo en la carpeta "pdf"
    const pdfPath = path.join(pdfFolderPath, `reporte-${modelName}-${year}.pdf`)
    await page.pdf({ path: pdfPath, format: 'A4', printBackground: true })

    await browser.close()

    // Enviar el archivo PDF al cliente
    res.sendFile(pdfPath)
  } catch (error) {
    console.error('Error al generar el reporte:', error.message)
    res.status(500).json({ error: 'Error interno al generar el reporte' })
  }
}

module.exports = { generateReport }
