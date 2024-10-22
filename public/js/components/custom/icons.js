$(document).ready(function () {
  

  const icons = {
    home: `<svg class="icon" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>`,
    user: `<svg class="icon" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-3.31 0-10 1.67-10 5v3h20v-3c0-3.33-6.69-5-10-5z"/></svg>`,
    settings: `<svg class="icon" viewBox="0 0 24 24"><path d="M19.14 12.94c.07-.35.07-.7.07-1.04s0-.69-.07-1.04l2.01-1.56c.18-.14.23-.39.11-.59l-2.34-4.04c-.12-.21-.39-.26-.59-.11l-2.49 1.01a7.966 7.966 0 0 0-1.56-.94l-.38-2.6C14.25 2.02 13.95 2 13.67 2h-3.34c-.28 0-.58.02-.7.2l-.38 2.6c-.63.27-1.22.66-1.76 1.14L5.9 5.75c-.21.15-.27.39-.11.59l2.01 1.56c-.07.35-.07.7-.07 1.04s0 .69.07 1.04l-2.01 1.56c-.18.14-.23.39-.11.59l2.34 4.04c.12.21.39.26.59.11l2.49-1.01c.54.48 1.13.87 1.76 1.14l.38 2.6c.12.18.42.2.7.2h3.34c.28 0 .58-.02.7-.2l.38-2.6c.63-.27 1.22-.66 1.76-1.14l2.49 1.01c.2.15.47.1.59-.11l2.34-4.04c.12-.21.07-.45-.11-.59l-2.01-1.56zM12 15.5c-1.88 0-3.5-1.62-3.5-3.5S10.12 8.5 12 8.5s3.5 1.62 3.5 3.5-1.62 3.5-3.5 3.5z"/></svg>`,

    
    appointment: `<svg class="icon" viewBox="0 0 24 24"><path d="M3 8h18v13H3V8zm5-6h2v3H8V2zm5 0h2v3h-2V2zm5 0h2v3h-2V2z"/></svg>`, 
    doctor: `<svg class="icon" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-3.31 0-10 1.67-10 5v3h20v-3c0-3.33-6.69-5-10-5z"/></svg>`, 
    patient: `<svg class="icon" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-3.31 0-10 1.67-10 5v3h20v-3c0-3.33-6.69-5-10-5z"/></svg>`, 
  };
  

  
  function addIconsToContainer() {
    const container = $('#icon-container');
    $.each(icons, function (key, svg) {
      const iconWrapper = $('<i></i>');
      iconWrapper.html(
        svg + `<span>${key.charAt(0).toUpperCase() + key.slice(1)}</span>`
      ); 
      container.append(iconWrapper);
    });
  }

  
  addIconsToContainer();
});
