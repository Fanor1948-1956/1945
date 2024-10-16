// apiFetch.js

// Función para hacer peticiones a la API
export function apiFetch(url, method = 'GET', data = null ) {
  const options = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
     /*  ...headers */
    },
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  return fetch(url, options)
    .then((response) => {
      if (!response.ok) {
        return Promise.reject(response);
      }
      return response.json();
    })
    .catch((error) => {
      console.error('Error en la solicitud:', error);
      throw error;
    });
}
