function apiFetch(url, method, data = null) {
  const options = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  return fetch(url, options).then((response) => {
    if (!response.ok) {
      return response.json().then((err) => {
        throw err;
      });
    }
    return response.json();
  });
}

// Exportar la función para uso global
window.apiFetch = apiFetch;
