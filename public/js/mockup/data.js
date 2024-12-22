// Generar horarios aleatorios
function generateRandomSchedule() {
  const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
  const schedule = {};

  days.forEach((day) => {
    const startHour = Math.floor(Math.random() * (12 - 8 + 1)) + 8; // Hora entre 8 y 12
    const endHour = startHour + Math.floor(Math.random() * (3 - 1 + 1)) + 1; // Duración entre 1 y 3 horas
    schedule[day] = `${String(startHour).padStart(2, '0')}:00 - ${String(
      endHour
    ).padStart(2, '0')}:00`;
  });

  return schedule;
}

// Generar especialidades con cantidad aleatoria entre 1 y 3
function generateSpecialties() {
  const specialties = [
    'Cardiología',
    'Dermatología',
    'Odontología',
    'Pediatría',
    'Neurología',
    'Gastroenterología',
    'Oncología',
    'Psiquiatría',
    'Oftalmología',
    'Urología',
  ];

  const numSpecialties = Math.floor(Math.random() * 3) + 1; // Número aleatorio entre 1 y 3
  const selectedSpecialties = specialties
    .sort(() => Math.random() - 0.5)
    .slice(0, numSpecialties); // Seleccionar especialidades aleatorias

  return selectedSpecialties.map((specialty) => ({
    name: specialty,
    schedule: generateRandomSchedule(),
  }));
}

// Generar nombres únicos
function generateUniqueName(index) {
  const firstNames = [
    'Juan',
    'María',
    'Pedro',
    'Ana',
    'Luis',
    'Sofía',
    'Carlos',
    'Lucía',
    'José',
    'Elena',
  ];
  const lastNames = [
    'González',
    'Rodríguez',
    'Pérez',
    'Martínez',
    'Gómez',
    'Díaz',
    'Fernández',
    'Lopez',
    'Morales',
    'Vargas',
  ];

  const firstName = firstNames[index % firstNames.length];
  const lastName =
    lastNames[Math.floor(index / firstNames.length) % lastNames.length];
  return `${firstName} ${lastName}`;
}

// Generar datos de doctores
function generateDoctors(numDoctors) {
  const doctors = [];

  for (let i = 0; i < numDoctors; i++) {
    doctors.push({
      name: generateUniqueName(i), // Usar nombres únicos
      specialties: generateSpecialties(), // Número aleatorio de especialidades
    });
  }

  return doctors;
}

// Generar 10 doctores
export const scheduleData = generateDoctors(10);

console.log(scheduleData);
