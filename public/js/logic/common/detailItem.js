import { apiFetch } from '../../api/apiFetch.js';

export function loadDetails(entityType, entityId, translations, allowedKeys) {
  console.log(
    `Cargando detalles para la entidad: ${entityType}, con ID: ${entityId}`
  );

  return apiFetch(`/${entityType}/detail/${entityId}`, 'GET')
    .then((response) => {
      console.log('Respuesta de la API:', response);

      const entity = response[entityType.slice(0, -1)];
      console.log(`Entidad obtenida (${entityType.slice(0, -1)}):`, entity);

      if (!entity || typeof entity !== 'object') {
        throw new Error(
          `La entidad ${entityType} no está disponible o es inválida`
        );
      }

      const detailsHtml = allowedKeys
        .map((key) => {
          if (entity.hasOwnProperty(key)) {
            console.log(`Procesando campo: ${key}, valor: ${entity[key]}`);

            if (key === 'isActive') {
              return `<p><strong>${translations[key]}:</strong> ${
                entity[key] ? 'Sí' : 'No'
              }</p>`;
            }

            if (Array.isArray(entity[key])) {
              return renderPermissionsField(translations[key], entity[key]);
            }

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

function renderPermissionsField(fieldName, permissionsArray) {
  console.log(`Renderizando campo de permisos: ${fieldName}`, permissionsArray);

  if (permissionsArray.length === 0) {
    return `<p><strong>${fieldName}:</strong> N/A</p>`;
  }

  const permissionNamesHtml = permissionsArray
    .map((permission) => {
      const name = permission.name || 'N/A';
      return `<li>${name}</li>`;
    })
    .join('');

  return `
        <p><strong>${fieldName}:</strong></p>
        <ul>${permissionNamesHtml}</ul>
    `;
}
