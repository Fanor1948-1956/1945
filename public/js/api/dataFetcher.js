// Fetch de los datos de los doctores desde el servidor
export async function fetchDoctorData() {
  try {
    const response = await fetch('/schedules/all');
    if (!response.ok) {
      throw new Error('Error al cargar los datos del servidor');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    return null;
  }
}

// Función para agrupar los horarios por doctor y especialidad
export function groupSchedules(data) {
  return Object.keys(data).reduce((acc, doctorName) => {
    acc[doctorName] = data[doctorName].map((schedule) => {
      const specialty = {
        Especialidad: schedule.Especialidad,
        horarios: {
          Lunes: 'No disponible',
          Martes: 'No disponible',
          Miércoles: 'No disponible',
          Jueves: 'No disponible',
          Viernes: 'No disponible',
        },
      };

      if (schedule.horarios && Array.isArray(schedule.horarios)) {
        schedule.horarios.forEach((horario) => {
          if (specialty.horarios[horario.dayOfWeek]) {
            specialty.horarios[
              horario.dayOfWeek
            ] = `${horario.startTime} - ${horario.endTime}`;
          }
        });
      }

      return specialty;
    });
    return acc;
  }, {});
}
