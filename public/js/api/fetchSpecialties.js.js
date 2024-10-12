// fetchSpecialties.js
import { apiFetch } from './apiFetch.js';

// Función para obtener y renderizar especialidades
export async function fetchSpecialties(renderSpecialtiesTable) {
  try {
    // Aquí cambias la URL para consultar las especialidades en lugar de usuarios
    const specialties = await apiFetch(
      'https://8000-fanoro1956-1945-50am2qruf9y.ws-us116.gitpod.io/api/specialties'
    );
    renderSpecialtiesTable(specialties); // Renderizar la tabla con las especialidades obtenidas
  } catch (error) {
    console.error('Error al obtener especialidades:', error);
  }
}

// Función para renderizar la tabla de especialidades
export function renderSpecialtiesTable(specialties) {
  // Verificar si hay especialidades
  if (specialties.length === 0) {
    document.getElementById('specialtiesTableContainer').innerHTML =
      '<p>No hay especialidades disponibles.</p>';
    return;
  }

  // Obtener las claves de las especialidades (asumiendo que todas tienen la misma estructura)
  const keys = Object.keys(specialties[0]);

  let tableHtml = `
    <table>
      <thead>
        <tr>
  `;

  // Crear encabezado de la tabla
  keys.forEach((key) => {
    if (key !== '_id') {
      // Ignorar el campo _id
      tableHtml += `<th>${key.charAt(0).toUpperCase() + key.slice(1)}</th>`;
    }
  });

  tableHtml += `<th>Acciones</th></tr></thead><tbody>`;

  // Crear filas de la tabla
  specialties.forEach((specialty) => {
    tableHtml += `<tr>`;
    keys.forEach((key) => {
      if (key !== '_id') {
        const value = specialty[key];
        if (Array.isArray(value)) {
          // Si es un array, mostrar como lista
          const items = value.map((item) => `<li>${item}</li>`).join('');
          tableHtml += `<td><ul>${items}</ul></td>`;
        } else {
          // Mostrar valor simple
          tableHtml += `<td>${value}</td>`;
        }
      }
    });
    // Agregar acciones
    tableHtml += `
      <td>
        <button class="details-button" data-specialty-id="${specialty._id}">Detalles</button>
        <button class="edit-button" data-specialty-id="${specialty._id}">Editar</button>
        <button class="delete-button" data-specialty-id="${specialty._id}">Eliminar</button>
      </td>
    </tr>`;
  });

  tableHtml += '</tbody></table>';
  document.getElementById('specialtiesTableContainer').innerHTML = tableHtml;
}

// Función simulada para agregar una nueva especialidad (puedes cambiarla para interactuar con la API)
export async function addSpecialty() {
  const newSpecialty = {
    name: 'Nueva Especialidad',
    description: 'Descripción de la especialidad',
    // otros campos que tenga tu especialidad
  };
  try {
    await apiFetch(
      'https://8000-fanoro1956-1945-50am2qruf9y.ws-us116.gitpod.io/api/specialties',
      'POST',
      newSpecialty
    );
    alert('Especialidad agregada correctamente');
  } catch (error) {
    console.error('Error al agregar especialidad:', error);
  }
}
