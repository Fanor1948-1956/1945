const chartData = Model => async (req, res, next) => {
  try {
    // Aquí, `Model` será cualquier modelo que recibas dinámicamente (por ejemplo, User, Order, etc.)
    const availableYears = await Model.aggregate([
      { $group: { _id: { $year: '$createdAt' } } }, // Agrupa por año
      { $project: { year: '$_id', _id: 0 } }, // Extrae el campo de año
      { $sort: { year: 1 } } // Ordena los años
    ])

    const result = []
    for (const yearObj of availableYears) {
      const year = yearObj.year

      // Consultar los datos activos para cada año
      const activeData = await Model.aggregate([
        {
          $match: {
            isActive: true,
            createdAt: {
              $gte: new Date(year, 0, 1),
              $lte: new Date(year, 11, 31)
            }
          }
        },
        {
          $group: {
            _id: { $month: '$createdAt' },
            count: { $sum: 1 }
          }
        },
        { $sort: { _id: 1 } }
      ])

      // Consultar los datos inactivos para cada año
      const inactiveData = await Model.aggregate([
        {
          $match: {
            isActive: false,
            createdAt: {
              $gte: new Date(year, 0, 1),
              $lte: new Date(year, 11, 31)
            }
          }
        },
        {
          $group: {
            _id: { $month: '$createdAt' },
            count: { $sum: 1 }
          }
        },
        { $sort: { _id: 1 } }
      ])

      // Crear los registros por mes
      const months = []
      for (let i = 0; i < 12; i++) {
        const activeMonthData = activeData.find(item => item._id === i + 1) || {
          count: 0
        }
        const inactiveMonthData = inactiveData.find(
          item => item._id === i + 1
        ) || { count: 0 }
        const totalRecords = activeMonthData.count + inactiveMonthData.count

        months.push({
          month: i + 1, // Mes numérico
          totalRecords,
          activeRecords: activeMonthData.count,
          inactiveRecords: inactiveMonthData.count
        })
      }

      result.push({
        year,
        months
      })
    }

    // Devuelve los datos generados para ser usados en el gráfico
    res.json(result)
  } catch (error) {
    next(error)
  }
}

module.exports = chartData
