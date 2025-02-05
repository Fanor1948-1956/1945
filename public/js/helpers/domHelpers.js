// Función para crear la tabla de horarios
export function createScheduleTable(specialty) {
  const scheduleTable = document.createElement('table');
  scheduleTable.classList.add('schedule-table');

  const thead = document.createElement('thead');
  thead.innerHTML = `
    <tr>
      <th>Lunes</th>
      <th>Martes</th>
      <th>Miércoles</th>
      <th>Jueves</th>
      <th>Viernes</th>
    </tr>
  `;
  scheduleTable.appendChild(thead);

  const tbody = document.createElement('tbody');
  const row = document.createElement('tr');
  ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'].forEach((day) => {
    const cell = document.createElement('td');
    cell.textContent = specialty.horarios[day] || 'No disponible';

    const icon = document.createElement('span');
    icon.className = 'more-icon';
    icon.innerHTML = '<span class="dot"></span><span class="dot"></span><span class="dot"></span>';

    icon.addEventListener('click', (event) => {
      event.stopPropagation(); // Evitar que el clic se propague al documento global
      openContextMenu(event, specialty, day); // Llamar al menú contextual
    });

    icon.style.position = 'absolute';
    icon.style.right = '5px';
    icon.style.top = '50%';
    icon.style.transform = 'translateY(-50%)';

    cell.style.position = 'relative';
    cell.appendChild(icon);
    row.appendChild(cell);
  });
  tbody.appendChild(row);
  scheduleTable.appendChild(tbody);

  return scheduleTable;
}

// Función para crear el acordeón con las especialidades
export function createAccordionContent(specialties, doctorIndex) {
  const accordionContent = document.createElement('tr');
  accordionContent.classList.add('accordion-content');
  const accordionTd = document.createElement('td');
  accordionTd.colSpan = 4;

  const specialtiesList = document.createElement('div');
  specialtiesList.classList.add('specialties-list');
  if (specialties.length > 2) {
    specialtiesList.style.maxHeight = '300px';
    specialtiesList.style.overflowY = 'auto';
  }

  specialties.forEach((specialty, specialtyIndex) => {
    const specialtyDiv = document.createElement('div');
    specialtyDiv.classList.add('specialty');

    const specialtyName = document.createElement('h4');
    specialtyName.textContent = `${doctorIndex + 1}.${specialtyIndex + 1} ${specialty.Especialidad}`;

    const scheduleTable = createScheduleTable(specialty);

    specialtyDiv.appendChild(specialtyName);
    specialtyDiv.appendChild(scheduleTable);
    specialtiesList.appendChild(specialtyDiv);
  });

  accordionTd.appendChild(specialtiesList);
  accordionContent.appendChild(accordionTd);

  return accordionContent;
}
