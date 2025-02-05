// Función para abrir el menú contextual
export function openContextMenu(event, specialty, day) {
  const menu = document.getElementById('tableContextMenu');
  menu.style.left = `${event.pageX}px`;
  menu.style.top = `${event.pageY}px`;
  menu.style.display = 'block';

  const scheduleStatus = specialty.horarios[day];

  if (scheduleStatus === 'No disponible') {
    document.getElementById('tableAddSchedule').style.display = 'block';
    document.getElementById('tableEditSchedule').style.display = 'none';
    document.getElementById('tableViewDetails').style.display = 'none';
    document.getElementById('tableDeleteSchedule').style.display = 'none';
    document.getElementById('tableDeactivateSchedule').style.display = 'none';
  } else {
    document.getElementById('tableAddSchedule').style.display = 'none';
    document.getElementById('tableEditSchedule').style.display = 'block';
    document.getElementById('tableViewDetails').style.display = 'block';
    document.getElementById('tableDeleteSchedule').style.display = 'block';
    document.getElementById('tableDeactivateSchedule').style.display = 'block';
  }

  // Asignar acciones a los elementos del menú
  document.getElementById('tableAddSchedule').onclick = () => {
    closeContextMenu();
    alert(`Añadir horario para: ${specialty.Especialidad} - ${day}`);
  };

  document.getElementById('tableViewDetails').onclick = () => {
    closeContextMenu();
    alert(`Ver detalles de: ${specialty.Especialidad} - ${day}`);
  };

  document.getElementById('tableEditSchedule').onclick = () => {
    closeContextMenu();
    alert(`Editar horario de: ${specialty.Especialidad} - ${day}`);
  };

  document.getElementById('tableDeleteSchedule').onclick = () => {
    closeContextMenu();
    alert(`Eliminar horario de: ${specialty.Especialidad} - ${day}`);
  };

  document.getElementById('tableDeactivateSchedule').onclick = () => {
    closeContextMenu();
    alert(`Desactivar horario de: ${specialty.Especialidad} - ${day}`);
  };
}

// Función para cerrar el menú contextual
export function closeContextMenu() {
  const menu = document.getElementById('tableContextMenu');
  menu.style.display = 'none';
}

// Cerrar el menú si se hace clic fuera de la tabla
export function closeMenuOnClickOutside() {
  document.addEventListener('click', (event) => {
    const menu = document.getElementById('tableContextMenu');
    if (
      !menu.contains(event.target) &&
      !event.target.closest('.doctorTableBody')
    ) {
      closeContextMenu();
    }
  });
}
