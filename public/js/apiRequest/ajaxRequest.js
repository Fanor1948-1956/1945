

function ajaxRequest(url, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: url,
      type: method,
      contentType: 'application/json',
      data: data ? JSON.stringify(data) : null,
      success: resolve,
      error: function (xhr) {
        
        console.error('Error en la solicitud:', xhr);
        reject(xhr);
      },
    });
  });
}


window.ajaxRequest = ajaxRequest;

