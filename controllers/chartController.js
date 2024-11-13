// const { generateChart } = require('../utils/chartutils.js')
// const {
//   getAvailableYears,
//   getMonthlyActiveData,
//   getMonthlyInactiveData
// } = require('../utils/dataUtils.js')
// const resolveModel = require('../utils/modelResolve.js')

// const Chart = require('../models/chartModel.js') // Asegúrate de importar el modelo de la base de datos

// async function generateCharts (req, res) {
//   try {
//     const { modelName } = req.query

//     if (!modelName) {
//       return res.status(400).send('El parámetro "modelName" es obligatorio')
//     }

//     const Model = resolveModel(modelName)

//     // Obtener los años disponibles
//     const availableYears = await getAvailableYears(Model)

//     const result = []

//     // Generar los datos de gráficos por año
//     for (const yearObj of availableYears) {
//       const year = yearObj.year

//       // Obtener los datos activos e inactivos por mes
//       const activeData = await getMonthlyActiveData(Model, year)
//       const inactiveData = await getMonthlyInactiveData(Model, year)

//       const months = []
//       for (let i = 0; i < 12; i++) {
//         const activeMonthData = activeData.find(item => item._id === i + 1) || {
//           count: 0
//         }
//         const inactiveMonthData = inactiveData.find(
//           item => item._id === i + 1
//         ) || { count: 0 }

//         months.push({
//           month: i + 1,
//           activeRecords: activeMonthData.count,
//           inactiveRecords: inactiveMonthData.count,
//           totalRecords: activeMonthData.count + inactiveMonthData.count
//         })
//       }

//       result.push({ modelName, year, months })
//     }

//     // Generar una imagen y guardarla en la base de datos para cada año
//     const filePaths = []
//     for (const yearData of result) {
//       const chartData = await generateChart(yearData) // Generar la imagen
//       filePaths.push(chartData.imageBase64) // Usamos la base64 de la imagen generada

//       // Guardar la imagen en la base de datos
//       const chart = new Chart({
//         modelName: yearData.modelName,
//         year: yearData.year,
//         imageData: chartData.imageBase64 // Guardamos el gráfico como Base64 en la base de datos
//       })
//       await chart.save()
//     }

//     // Responder con la lista de archivos generados
//     res.json({
//       charts: result.map((yearData, index) => ({
//         title: `Gráfico ${yearData.year}`,
//         modelName: modelName,
//         year: yearData.year,
//         imageData: filePaths[index] // Ya no es necesario agregar prefijo base64 aquí
//       }))
//     })
//   } catch (error) {
//     console.error('Error:', error.message)
//     res.status(500).json({ error: 'Error interno al generar los gráficos' })
//   }
// }

// module.exports = {
//   generateCharts
// }

const {
  getAvailableYears,
  getMonthlyActiveData,
  getMonthlyInactiveData
} = require('../utils/dataUtils.js')
const resolveModel = require('../utils/modelResolve.js')

async function generateCharts (req, res) {
  try {
    const { modelName } = req.query

    if (!modelName) {
      return res.status(400).send('El parámetro "modelName" es obligatorio')
    }

    const Model = resolveModel(modelName)

    // Obtener los años disponibles para el modelo seleccionado
    const availableYears = await getAvailableYears(Model)

    const result = []

    // Generar los datos de gráficos por año y mes
    for (const yearObj of availableYears) {
      const year = yearObj.year

      // Obtener los datos activos e inactivos por mes
      const activeData = await getMonthlyActiveData(Model, year)
      const inactiveData = await getMonthlyInactiveData(Model, year)

      const months = []
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
      }

      result.push({
        modelName,
        year,
        months
      })
    }

    // Enviar respuesta organizada por modelo con los datos del gráfico
    res.json({
      charts: result,
      availableYears: availableYears // Asegurarnos de devolver los años disponibles
    })
  } catch (error) {
    console.error('Error:', error.message)
    res.status(500).json({ error: 'Error interno al generar los gráficos' })
  }
}

module.exports = {
  generateCharts
}
