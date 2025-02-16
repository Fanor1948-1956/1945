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

export function apiFetch (url, method = 'GET', data = null) {
  console.log('apiFetch llamada con url:', url, 'y método:', method) // Log para ver cuando se llama apiFetch
  console.log('Datos enviados:', data) // Log para ver los datos enviados

  function getCookie (name) {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) return parts.pop().split(';').shift()
  }

  let token = getCookie('token')
  if (!token) {
    token = localStorage.getItem('token')
  }

  console.log('tokenCookie:', token) // Log del token obtenido

  const options = {
    method: method,
    headers: {
      Accept: 'application/json',
      'x-access-token': token || ''
    },
    credentials: 'include'
  }

  if (data) {
    if (data instanceof FormData) {
      options.body = data
    } else {
      options.body = JSON.stringify(data)
      options.headers['Content-Type'] = 'application/json'
    }
  }

  return fetch(url, options)
    .then(async response => {
      console.log('Respuesta del servidor:', response.status) // Log para ver la respuesta del servidor

      const contentType = response.headers.get('content-type')
      if (!response.ok) {
        const text = await response.text()
        console.error('Respuesta del servidor con error:', text)
        return Promise.reject(new Error(`Error ${response.status}: ${text}`))
      }
      if (contentType && contentType.includes('application/json')) {
        return response.json()
      } else {
        const text = await response.text()
        console.warn('Respuesta inesperada (no JSON):', text)
        return Promise.reject(
          new Error('La respuesta no está en formato JSON.')
        )
      }
    })
    .catch(error => {
      console.error('Error en la solicitud:', error)
      throw error
    })
}
