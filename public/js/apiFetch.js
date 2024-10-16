// apiFetch.js

// Función para hacer peticiones a la API
export function apiFetch(url, method = "GET", data = null, headers = {}) {
  const options = {
    method: method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",

      ...headers, // Combina con otros headers que puedas querer agregar
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
      console.error("Error en la solicitud:", error);
      throw error;
    });
}
