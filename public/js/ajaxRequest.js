// ajaxRequest.js

function ajaxRequest(url, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: url,
      type: method,
      contentType: 'application/json',
      data: data ? JSON.stringify(data) : null,
      success: resolve,
      error: function (xhr) {
        // Manejo de errores
        console.error('Error en la solicitud:', xhr);
        reject(xhr);
      },
    });
  });
}

// Exportar la función para uso global
window.ajaxRequest = ajaxRequest;
