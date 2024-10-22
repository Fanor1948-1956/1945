


function showSnackbar(message, success) {
  const snackbar = $('#snackbar');
  snackbar.html(message);
  snackbar.css('background-color', success ? '#051706' : '#f44336');
  snackbar.addClass('show');
  setTimeout(() => snackbar.removeClass('show'), 3000);
}


window.showSnackbar = showSnackbar;











