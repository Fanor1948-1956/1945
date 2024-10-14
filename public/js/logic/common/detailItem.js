import { apiFetch } from '../../apiFetch.js'; // Ajusta la ruta según tu estructura

// Función genérica para cargar y mostrar detalles de cualquier entidad, usando Object.keys
export function loadDetails(entityType, entityId) {
  console.log(
    `Cargando detalles para la entidad: ${entityType}, con ID: ${entityId}`
  ); // Console para depurar

  return apiFetch(`/${entityType}/detail/${entityId}`, 'GET')
    .then((response) => {
      console.log('Respuesta de la API:', response); // Verificar la respuesta completa

      // La clave del objeto depende del tipo de entidad. Para roles, la clave es 'role'.
      const entity = response[entityType.slice(0, -1)]; // Ajustamos la clave eliminando la 's' final de 'roles' -> 'role'
      console.log(`Entidad obtenida (${entityType.slice(0, -1)}):`, entity); // Verificar la entidad

      if (!entity || typeof entity !== 'object') {
        throw new Error(
          `La entidad ${entityType} no está disponible o es inválida`
        );
      }

      // Generar el HTML dinámico iterando sobre las claves del objeto
      const detailsHtml = Object.keys(entity)
        .map((key) => {
          console.log(`Procesando campo: ${key}, valor: ${entity[key]}`); // Verificar cada campo y valor

          // Si el valor es un array, lo renderizamos como una lista
          if (Array.isArray(entity[key])) {
            return renderArrayField(key, entity[key]);
          }

          // Renderizar como un campo de texto por defecto
          return `<p><strong>${key}:</strong> ${entity[key] || 'N/A'}</p>`;
        })
        .join('');

      console.log('HTML generado:', detailsHtml); // Verificar el HTML generado

      return `
        <div>
          ${detailsHtml}
        </div>
      `;
    })
    .catch((xhr) => {
      console.error(`Error al cargar los detalles de ${entityType}:`, xhr);
      throw new Error(`Error al cargar los detalles de ${entityType}`);
    });
}

// Función para renderizar campos que son arrays
function renderArrayField(fieldName, arrayData) {
  console.log(`Renderizando campo array: ${fieldName}`, arrayData); // Verificar los arrays

  if (arrayData.length === 0) {
    return `<p><strong>${fieldName}:</strong> N/A</p>`;
  }

  // Generar una lista con los elementos del array
  const arrayItemsHtml = arrayData
    .map((item) => {
      console.log(`Procesando elemento del array:`, item); // Verificar cada elemento del array

      // Si el item es un objeto, renderizar sus claves también
      if (typeof item === 'object') {
        const objectItems = Object.keys(item)
          .map(
            (subKey) => `<li><strong>${subKey}:</strong> ${item[subKey]}</li>`
          )
          .join('');
        return `<ul>${objectItems}</ul>`;
      }

      // Si es un valor simple, solo lo mostramos
      return `<li>${item}</li>`;
    })
    .join('');

  return `
    <p><strong>${fieldName}:</strong></p>
    <ul>${arrayItemsHtml}</ul>
  `;
}
