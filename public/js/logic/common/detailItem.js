import { apiFetch } from '../../apiFetch.js'; // Ajusta la ruta según tu estructura

// Función genérica para cargar y mostrar detalles de cualquier entidad
export function loadDetails(entityType, entityId, translations, allowedKeys) {
  console.log(
    `Cargando detalles para la entidad: ${entityType}, con ID: ${entityId}`
  );

  return apiFetch(`/${entityType}/detail/${entityId}`, 'GET')
    .then((response) => {
      console.log('Respuesta de la API:', response);

      // Obtener la entidad dependiendo del tipo
      const entity = response[entityType.slice(0, -1)];
      console.log(`Entidad obtenida (${entityType.slice(0, -1)}):`, entity);

      if (!entity || typeof entity !== 'object') {
        throw new Error(
          `La entidad ${entityType} no está disponible o es inválida`
        );
      }

      // Generar el HTML dinámico iterando sobre las claves permitidas
      const detailsHtml = allowedKeys
        .map((key) => {
          // Comprobar si la clave está en el objeto
          if (entity.hasOwnProperty(key)) {
            console.log(`Procesando campo: ${key}, valor: ${entity[key]}`);

            // Comprobar si el campo es 'isActive' para mostrar "Sí" o "No"
            if (key === 'isActive') {
              return `<p><strong>${translations[key]}:</strong> ${
                entity[key] ? 'Sí' : 'No'
              }</p>`;
            }

            // Si el valor es un array, lo renderizamos como una lista
            if (Array.isArray(entity[key])) {
              return renderPermissionsField(translations[key], entity[key]);
            }

            // Renderizar como un campo de texto por defecto
            return `<p><strong>${translations[key]}:</strong> ${
              entity[key] || 'N/A'
            }</p>`;
          }
          return '';
        })
        .join('');

      console.log('HTML generado:', detailsHtml);

      return `<div>${detailsHtml}</div>`;
    })
    .catch((xhr) => {
      console.error(`Error al cargar los detalles de ${entityType}:`, xhr);
      throw new Error(`Error al cargar los detalles de ${entityType}`);
    });
}

// Función para renderizar campos de permisos que son arrays
function renderPermissionsField(fieldName, permissionsArray) {
  console.log(`Renderizando campo de permisos: ${fieldName}`, permissionsArray);

  if (permissionsArray.length === 0) {
    return `<p><strong>${fieldName}:</strong> N/A</p>`;
  }

  // Generar una lista con los nombres de los permisos
  const permissionNamesHtml = permissionsArray
    .map((permission) => {
      const name = permission.name || 'N/A'; // Solo mostrar el nombre
      return `<li>${name}</li>`;
    })
    .join('');

  return `
        <p><strong>${fieldName}:</strong></p>
        <ul>${permissionNamesHtml}</ul>
    `;
}
