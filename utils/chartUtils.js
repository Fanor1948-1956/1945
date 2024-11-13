const puppeteer = require('puppeteer')
const path = require('path')
const fs = require('fs')
const { promisify } = require('util')
const readFile = promisify(fs.readFile)

// Función para generar el gráfico con Puppeteer
async function generateChart (yearData) {
  const uploadsDir = path.join(__dirname, '../uploads')
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir)
  }

  // Añadir el título con el nombre del modelo
  const htmlContent = `
    <html>
      <head>
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
      </head>
      <body>
        <h1>${yearData.modelName} - Gráfico Anual (${yearData.year})</h1>
        <canvas id="chart" width="600" height="400"></canvas>
        <script>
          const ctx = document.getElementById('chart').getContext('2d');
          const data = ${JSON.stringify([yearData])};
          new Chart(ctx, {
            type: 'line',
            data: {
              labels: data[0].months.map(month => month.month),
              datasets: [{
                label: 'Registros Mensuales',
                data: data[0].months.map(month => month.totalRecords),
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: false
              }]
            }
          });
        </script>
      </body>
    </html>
  `

  const filePath = path.join(uploadsDir, `chart_${yearData.year}.png`)
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.setContent(htmlContent)

  // Guardar el gráfico como una imagen
  await page.screenshot({ path: filePath })
  await browser.close()

  // Leer el archivo de imagen y convertirlo a base64
  const imageBuffer = await readFile(filePath)
  const base64Image = imageBuffer.toString('base64')

  // Devolver la imagen en formato base64 dentro de un objeto JSON, incluyendo el modelo y el año
  return {
    modelName: yearData.modelName,
    year: yearData.year,
    imageBase64: `data:image/png;base64,${base64Image}` // Devolver ya el prefijo base64 aquí
  }
}

module.exports = {
  generateChart
}
