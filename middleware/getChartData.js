const { format } = require('date-fns')

const getDataChart = Model => async (req, res, next) => {
  try {
    const availableYears = await Model.aggregate([
      { $group: { _id: { $year: '$createdAt' } } },
      { $project: { year: '$_id', _id: 0 } },
      { $sort: { year: 1 } }
    ])

    const result = []
    let totalRecordsGlobal = 0
    let totalRecordsActiveGlobal = 0
    let totalRecordsInactiveGlobal = 0

    for (const yearObj of availableYears) {
      const year = yearObj.year

      if (year === null) {
        continue // Ignorar años nulos
      }

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
            _id: {
              month: { $month: '$createdAt' }
            },
            count: { $sum: 1 },
            documents: { $push: '$$ROOT' }
          }
        },
        {
          $sort: { '_id.month': 1 }
        }
      ])

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
            _id: {
              month: { $month: '$createdAt' }
            },
            count: { $sum: 1 },
            documents: { $push: '$$ROOT' }
          }
        },
        {
          $sort: { '_id.month': 1 }
        }
      ])

      const months = []
      let totalRecordsMonthly = 0
      let totalRecordsActive = 0
      let totalRecordsInactive = 0

      for (let i = 0; i < 12; i++) {
        const activeMonthData = activeData.find(
          item => item._id.month === i + 1
        ) || { count: 0, documents: [] }
        const inactiveMonthData = inactiveData.find(
          item => item._id.month === i + 1
        ) || { count: 0, documents: [] }
        const monthName = format(new Date(year, i, 1), 'MMMM')

        const totalRecords = activeMonthData.count + inactiveMonthData.count
        totalRecordsMonthly += totalRecords
        totalRecordsActive += activeMonthData.count
        totalRecordsInactive += inactiveMonthData.count

        months.push({
          month: monthName,
          totalRecords,
          activeRecords: activeMonthData.count,
          inactiveRecords: inactiveMonthData.count,
          activeDocuments: activeMonthData.documents,
          inactiveDocuments: inactiveMonthData.documents
        })
      }

      result.push({
        year,
        months,
        totalRecordsMonthly,
        totalRecordsActive,
        totalRecordsInactive
      })

      totalRecordsGlobal += totalRecordsMonthly
      totalRecordsActiveGlobal += totalRecordsActive
      totalRecordsInactiveGlobal += totalRecordsInactive
    }

    res.json({
      result,
      availableYears: availableYears
        .filter(yearObj => yearObj.year !== null)
        .map(yearObj => yearObj.year),
      totalRecordsGlobal,
      totalRecordsActiveGlobal,
      totalRecordsInactiveGlobal
    })
  } catch (error) {
    next(error)
  }
}

module.exports = getDataChart
