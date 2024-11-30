
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
