// Función para obtener los años disponibles
async function getAvailableYears (Model) {
  try {
    const availableYears = await Model.aggregate([
      { $group: { _id: { $year: '$createdAt' } } },
      { $project: { year: '$_id', _id: 0 } },
      { $sort: { year: 1 } }
    ])
    return availableYears
  } catch (error) {
    throw new Error('Error al obtener los años disponibles: ' + error.message)
  }
}

// Función para obtener los datos activos por mes
async function getMonthlyActiveData (Model, year) {
  try {
    return await Model.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(`${year}-01-01`),
            $lt: new Date(`${year + 1}-01-01`)
          },
          isActive: true
        }
      },
      { $group: { _id: { $month: '$createdAt' }, count: { $sum: 1 } } }
    ])
  } catch (error) {
    throw new Error('Error al obtener los datos activos: ' + error.message)
  }
}

// Función para obtener los datos inactivos por mes
async function getMonthlyInactiveData (Model, year) {
  try {
    return await Model.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(`${year}-01-01`),
            $lt: new Date(`${year + 1}-01-01`)
          },
          isActive: false
        }
      },
      { $group: { _id: { $month: '$createdAt' }, count: { $sum: 1 } } }
    ])
  } catch (error) {
    throw new Error('Error al obtener los datos inactivos: ' + error.message)
  }
}

module.exports = {
  getAvailableYears,
  getMonthlyActiveData,
  getMonthlyInactiveData
}
