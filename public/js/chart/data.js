// data.js

export function generateMockData(yearsCount) {
  const data = [];
  const currentYear = new Date().getFullYear();

  for (let year = currentYear; year > currentYear - yearsCount; year--) {
    const months = [];
    for (let month = 0; month < 12; month++) {
      const days = [];
      const daysInMonth = new Date(year, month + 1, 0).getDate(); // Obtener el número de días en el mes

      for (let day = 1; day <= daysInMonth; day++) {
        // Generar un registro por cada día
        days.push({
          day,
          value: Math.floor(Math.random() * 10) + 1, // Valor aleatorio entre 1 y 10
          title: `Registro del ${day}/${month + 1}/${year}`,
        });
      }

      months.push({
        month: month + 1, // Mes (1-12)
        days, // Array de registros de días
      });
    }

    data.push({
      year, // Año
      months, // Array de meses
    });
  }
  return data;
}
