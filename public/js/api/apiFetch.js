// export function apiFetch(url, method = 'GET', data = null) {
//   const options = {
//     method: method,
//     headers: {
//       'Content-Type': 'application/json',
//       Accept: 'application/json',

//     },
//     credentials: 'include',
//   };

//   if (data) {
//     options.body = JSON.stringify(data);
//   }

//   return fetch(url, options)
//     .then((response) => {
//       if (!response.ok) {
//         return response.text().then((text) => {
//           console.error('Respuesta del servidor:', text);
//           return Promise.reject(response);
//         });
//       }
//       return response.json();
//     })
//     .catch((error) => {
//       console.error('Error en la solicitud:', error);
//       throw error;
//     });
// }

export function apiFetch(url, method = 'GET', data = null) {
  // Función para obtener el valor de una cookie por su nombre
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  // Intenta obtener el token de las cookies primero
  let token = getCookie('token'); // Primero intenta obtener de las cookies
  // console.log('cokiestoken', token);
  if (!token) {
    token = localStorage.getItem('token'); // Si no existe, intenta obtener del localStorage
  }

  console.log('token', token); // Verifica cuál es el token que se ha obtenido

  const options = {
    method: method,
    headers: {
      Accept: 'application/json',
      'x-access-token': token || '', // Usar el token obtenido, si no hay token, enviar una cadena vacía
    },
    credentials: 'include',
  };

  if (data) {
    if (data instanceof FormData) {
      options.body = data;
    } else {
      options.body = JSON.stringify(data);
      options.headers['Content-Type'] = 'application/json';
    }
  }

  return fetch(url, options)
    .then(async (response) => {
      const contentType = response.headers.get('content-type');
      if (!response.ok) {
        const text = await response.text();
        console.error('Respuesta del servidor:', text);
        return Promise.reject(new Error(`Error ${response.status}: ${text}`));
      }
      if (contentType && contentType.includes('application/json')) {
        return response.json();
      } else {
        const text = await response.text();
        console.warn('Respuesta inesperada (no JSON):', text);
        return Promise.reject(
          new Error('La respuesta no está en formato JSON.')
        );
      }
    })
    .catch((error) => {
      console.error('Error en la solicitud:', error);
      throw error;
    });
}
