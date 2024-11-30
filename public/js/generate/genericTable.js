// import { openModal, closeModal } from '../components/custom/modal.js';

// export function createTable(headers, data, container, options = {}) {
//   container.innerHTML = ''; // Limpiar el contenido previo

//   const table = document.createElement('table');
//   table.style.width = '100%';
//   table.style.borderCollapse = 'collapse';
//   table.border = 1;

//   const thead = document.createElement('thead');
//   const headerRow = document.createElement('tr');

//   // Crear las celdas de encabezado
//   headers.forEach((header) => {
//     const th = document.createElement('th');
//     th.textContent = header;

//     if (options.hideDoctorColumn && header === 'Doctor') {
//       th.style.display = 'none';
//     }

//     headerRow.appendChild(th);
//   });
//   thead.appendChild(headerRow);
//   table.appendChild(thead);

//   const tbody = document.createElement('tbody');

//   // Crear las filas de la tabla
//   data.forEach((rowData) => {
//     const row = document.createElement('tr');

//     row.addEventListener('mouseleave', () => {
//       row.style.backgroundColor = '';
//     });

//     headers.forEach((header) => {
//       const td = document.createElement('td');
//       td.classList.add('context-cell'); // Agregar clase para las celdas
//       td.style.position = 'relative'; // Hacer que la celda sea el contenedor para el ícono

//       if (options.hideDoctorColumn && header === 'Doctor') {
//         td.style.display = 'none';
//       }

//       // Contenido de la celda
//       td.textContent =
//         rowData[header] === 'No disponible' ? '' : rowData[header];
//       row.appendChild(td);

//       // Agregar ícono de tres puntos horizontales en la celda
//       if (header !== 'Doctor') {
//         const icon = document.createElement('span');
//         icon.className = 'more-icon'; // Usar la clase para el ícono

//         // Crear el ícono de tres puntos horizontales
//         icon.innerHTML =
//           '<span class="dot"></span><span class="dot"></span><span class="dot"></span>';

//         // Agregar evento para abrir el menú contextual al hacer clic
//         icon.addEventListener('click', (event) => {
//           event.stopPropagation(); // Evitar que el clic se propague al documento global

//           // Marcar la celda como activa
//           setActiveCell(td);

//           // Llamar la función para manejar el menú contextual
//           openContextMenu(event, rowData);
//         });

//         td.appendChild(icon); // Añadir el ícono a la celda
//       }
//     });

//     tbody.appendChild(row);
//   });

//   table.appendChild(tbody);
//   container.appendChild(table);

//   // Función para manejar el menú contextual
//   function openContextMenu(event, rowData) {
//     const contextMenu = document.getElementById('tableContextMenu');
//     contextMenu.style.display = 'block';
//     contextMenu.style.left = `${event.pageX}px`;
//     contextMenu.style.top = `${event.pageY}px`;

//     // Acción de añadir horario al hacer clic en el botón correspondiente
//     document.getElementById('tableAddSchedule').onclick = () => {
//       openModal('scheduleModal', 'small', 'Añadir Nuevo Horario');
//       document.getElementById('modalContent').innerHTML = `
//         <form id="addScheduleForm">
//           <label for="doctor">Doctor:</label>
//           <input type="text" id="doctor" name="doctor" placeholder="Nombre del doctor" required />

//           <label for="dayOfWeek">Día de la Semana:</label>
//           <select id="dayOfWeek" name="dayOfWeek" required>
//             <option value="Lunes">Lunes</option>
//             <option value="Martes">Martes</option>
//             <option value="Miércoles">Miércoles</option>
//             <option value="Jueves">Jueves</option>
//             <option value="Viernes">Viernes</option>
//             <option value="Sábado">Sábado</option>
//             <option value="Domingo">Domingo</option>
//           </select>

//           <label for="startTime">Hora de Inicio:</label>
//           <input type="time" id="startTime" name="startTime" required />

//           <label for="endTime">Hora de Fin:</label>
//           <input type="time" id="endTime" name="endTime" required />

//           <button type="submit" id="submitAddSchedule">Añadir</button>
//         </form>
//       `;
//       document
//         .getElementById('addScheduleForm')
//         .addEventListener('submit', handleAddSchedule);
//     };
//     document.getElementById('tableViewDetails').onclick = () => {
//       closeContextMenuAndOpenModal(() => {
//         openModal('scheduleModal', 'small', `Detalle de la celda (${header})`);

//         // Mostrar los detalles de la celda y la fecha de creación
//         const details = `
//       <strong>Valor:</strong> ${rowData[header] || 'No disponible'}<br>
//       <strong>Fecha de Creación:</strong> ${rowData.createAt || 'No disponible'}
//     `;

//         document.getElementById('modalContent').innerHTML = details;

//         // Agregar funcionalidad para cerrar el modal después de visualizar
//         document.getElementById('closeModalButton').onclick = () => {
//           closeModal('scheduleModal');
//         };
//       });
//     };
//     document.getElementById('tableEditSchedule').onclick = () => {
//       alert('Editar horario: ' + rowData.Especialidad);
//       menu.style.display = 'none'; // Cerrar el menú
//     };

//     document.getElementById('tableDeleteSchedule').onclick = () => {
//       alert('Eliminar horario: ' + rowData.Especialidad);
//       menu.style.display = 'none'; // Cerrar el menú
//     };
//     // Cerrar el menú contextual si se hace clic fuera de él
//     document.addEventListener('click', () => {
//       contextMenu.style.display = 'none';
//     });
//   }

//   // Manejador de la función para agregar un nuevo horario
//   async function handleAddSchedule(event) {
//     event.preventDefault();

//     const doctor = document.getElementById('doctor').value;
//     const dayOfWeek = document.getElementById('dayOfWeek').value;
//     const startTime = document.getElementById('startTime').value;
//     const endTime = document.getElementById('endTime').value;

//     if (!doctor || !dayOfWeek || !startTime || !endTime) {
//       alert('Por favor, complete todos los campos.');
//       return;
//     }

//     const scheduleData = { doctor, dayOfWeek, startTime, endTime };

//     try {
//       const response = await fetch('/schedules', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(scheduleData),
//       });

//       if (response.ok) {
//         alert('Horario añadido correctamente');
//         closeModal('scheduleModal');
//         // Puedes refrescar la tabla si es necesario después de añadir el horario.
//       } else {
//         alert('Error al añadir el horario');
//       }
//     } catch (error) {
//       console.error('Error al añadir horario:', error);
//       alert('Ocurrió un error');
//     }
//   }

//   // Función para cerrar el menú contextual
//   function closeContextMenu() {
//     const menu = document.getElementById('tableContextMenu');
//     menu.style.display = 'none'; // Ocultar el menú
//     removeActiveCell(); // Quitar la clase activa
//   }

//   // Mantener activa la celda seleccionada
//   function setActiveCell(cell) {
//     removeActiveCell(); // Eliminar cualquier celda activa previa
//     cell.classList.add('active-cell');
//   }

//   // Quitar la clase activa de la celda seleccionada
//   function removeActiveCell() {
//     const activeCell = document.querySelector('.active-cell');
//     if (activeCell) {
//       activeCell.classList.remove('active-cell');
//     }
//   }

//   // Cerrar el menú si se hace clic fuera de la tabla
//   document.addEventListener('click', (event) => {
//     const menu = document.getElementById('tableContextMenu');
//     if (
//       !menu.contains(event.target) &&
//       !event.target.closest('.table-container')
//     ) {
//       closeContextMenu(); // Cerrar el menú al hacer clic fuera de la tabla
//     }
//   });
// }

import { openModal, closeModal } from '../components/custom/modal.js';

export function createTable(headers, data, container, options = {}) {
  container.innerHTML = ''; // Limpiar el contenido previo

  const table = document.createElement('table');
  table.style.width = '100%';
  table.style.borderCollapse = 'collapse';
  table.border = 1;

  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');

  // Crear las celdas de encabezado
  headers.forEach((header) => {
    const th = document.createElement('th');
    th.textContent = header;

    if (options.hideDoctorColumn && header === 'Doctor') {
      th.style.display = 'none';
    }

    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = document.createElement('tbody');

  // Crear las filas de la tabla
  data.forEach((rowData) => {
    const row = document.createElement('tr');

    headers.forEach((header) => {
      const td = document.createElement('td');
      td.classList.add('context-cell'); // Agregar clase para las celdas

      if (options.hideDoctorColumn && header === 'Doctor') {
        td.style.display = 'none';
      }

      // Contenido de la celda
      td.textContent =
        rowData[header] === 'No disponible' ? '' : rowData[header];
      row.appendChild(td);

      // Agregar ícono de tres puntos horizontales en la celda
      if (header !== 'Doctor') {
        const icon = document.createElement('span');
        icon.className = 'more-icon'; // Usar la clase para el ícono

        // Crear el ícono de tres puntos horizontales
        icon.innerHTML =
          '<span class="dot"></span><span class="dot"></span><span class="dot"></span>';

        // Agregar evento para abrir el menú contextual al hacer clic
        icon.addEventListener('click', (event) => {
          event.stopPropagation(); // Evitar que el clic se propague al documento global

          // Marcar la celda como activa
          setActiveCell(td);

          // Abre el menú contextual con los datos correspondientes
          openContextMenu(event, rowData, header);
        });

        td.appendChild(icon);
      }
    });

    tbody.appendChild(row);
  });

  table.appendChild(tbody);
  container.appendChild(table);
  // Función para abrir el menú contextual específico para la tabla
  function openContextMenu(event, rowData, header) {
    const menu = document.getElementById('tableContextMenu');

    // Posicionar el menú en la ubicación del clic
    menu.style.left = `${event.pageX}px`;
    menu.style.top = `${event.pageY}px`;
    menu.style.display = 'block';

    // Acción de añadir horario al hacer clic en el botón correspondiente
    document.getElementById('tableAddSchedule').onclick = () => {
      closeContextMenu(); // Cerrar el menú contextual
      openModal('scheduleModal', 'small', 'Añadir Nuevo Horario');
      document.getElementById('modalContent').innerHTML = `
      <form id="addScheduleForm">
        <label for="doctor">Doctor:</label>
        <input type="text" id="doctor" name="doctor" placeholder="Nombre del doctor" required />

        <label for="dayOfWeek">Día de la Semana:</label>
        <select id="dayOfWeek" name="dayOfWeek" required>
          <option value="Lunes">Lunes</option>
          <option value="Martes">Martes</option>
          <option value="Miércoles">Miércoles</option>
          <option value="Jueves">Jueves</option>
          <option value="Viernes">Viernes</option>
          <option value="Sábado">Sábado</option>
          <option value="Domingo">Domingo</option>
        </select>

        <label for="startTime">Hora de Inicio:</label>
        <input type="time" id="startTime" name="startTime" required />

        <label for="endTime">Hora de Fin:</label>
        <input type="time" id="endTime" name="endTime" required />

        <button type="submit" id="submitAddSchedule">Añadir</button>
      </form>
    `;
      document
        .getElementById('addScheduleForm')
        .addEventListener('submit', handleAddSchedule);
      // Agregar funcionalidad para cerrar el modal después de eliminar
      document.getElementById('closeModalButton').onclick = () => {
        closeModal('myModal');
      };
    };

    // Ver detalles
    document.getElementById('tableViewDetails').onclick = () => {
      closeContextMenu(); // Cerrar el menú contextual
      closeContextMenuAndOpenModal(() => {
        openModal('scheduleModal', 'small', `Detalle de la celda (${header})`);

        // Mostrar los detalles de la celda y la fecha de creación
        const details = `
        <strong>Valor:</strong> ${rowData[header] || 'No disponible'}<br>
        <strong>Fecha de Creación:</strong> ${
          rowData.createAt || 'No disponible'
        }
      `;
        document.getElementById('modalContent').innerHTML = details;

        // Agregar funcionalidad para cerrar el modal después de visualizar
        document.getElementById('closeModalButton').onclick = () => {
          closeModal('scheduleModal');
        };
      });
    };

    // Editar horario
    document.getElementById('tableEditSchedule').onclick = () => {
      closeContextMenu(); // Cerrar el menú contextual
      closeContextMenuAndOpenModal(() => {
        openModal('scheduleModal', 'small', `Editar contenido (${header})`);
        document.getElementById('modalContent').textContent = `Editar ${
          rowData[header] || 'No disponible'
        }`;

        // Agregar funcionalidad para cerrar el modal después de editar
        document.getElementById('closeModalButton').onclick = () => {
          closeModal('myModal');
        };
      });
    };

    // Eliminar horario
    document.getElementById('tableDeleteSchedule').onclick = () => {
      closeContextMenu(); // Cerrar el menú contextual
      closeContextMenuAndOpenModal(() => {
        openModal('scheduleModal', 'small', `Eliminar contenido (${header})`);
        document.getElementById(
          'modalContent'
        ).textContent = `¿Estás seguro de eliminar ${
          rowData[header] || 'esto'
        }?`;

        // Agregar funcionalidad para cerrar el modal después de eliminar
        document.getElementById('closeModalButton').onclick = () => {
          closeModal('myModal');
        };
      });
    };
  }

  // Función para cerrar el menú contextual y luego abrir el modal
  function closeContextMenuAndOpenModal(callback) {
    closeContextMenu(); // Cerrar el menú
    setTimeout(callback, 300); // Esperar un pequeño retraso antes de abrir el modal
  }

  // Función para cerrar el menú contextual
  function closeContextMenu() {
    const menu = document.getElementById('tableContextMenu');
    menu.style.display = 'none'; // Ocultar el menú
    removeActiveCell(); // Quitar la clase activa
  }

  // Mantener activa la celda seleccionada
  function setActiveCell(cell) {
    removeActiveCell(); // Eliminar cualquier celda activa previa
    cell.classList.add('active-cell');
  }

  // Quitar la clase activa de la celda seleccionada
  function removeActiveCell() {
    const activeCell = document.querySelector('.active-cell');
    if (activeCell) {
      activeCell.classList.remove('active-cell');
    }
  }

  // Cerrar el menú si se hace clic fuera de la tabla
  document.addEventListener('click', (event) => {
    const menu = document.getElementById('tableContextMenu');
    if (
      !menu.contains(event.target) &&
      !event.target.closest('.table-container')
    ) {
      closeContextMenu(); // Cerrar el menú al hacer clic fuera de la tabla
    }
  });
}
