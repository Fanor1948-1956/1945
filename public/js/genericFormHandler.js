class GenericFormHandler {
  constructor(formSelector) {
    this.$form = $(formSelector);
    this.originalValues = this.getOriginalValues();
    this.hooks = {
      beforeEnable: [],
      afterEnable: [],
      beforeSubmit: [],
      afterSubmit: [],
      beforeCancel: [],
      afterCancel: [],
    };
    this.init();
  }

  init() {
    this.bindEditButton();
    this.bindFormSubmit();
    this.bindCancelButton();
  }

  getOriginalValues() {
    return this.$form
      .find('input, select')
      .map(function () {
        return $(this).val();
      })
      .get();
  }

  registerHook(hookName, callback) {
    if (this.hooks[hookName]) {
      this.hooks[hookName].push(callback);
    }
  }

  executeHooks(hookName) {
    if (this.hooks[hookName]) {
      this.hooks[hookName].forEach((callback) => callback());
    }
  }

  bindEditButton() {
    this.$form.find('.edit-button').on('click', () => {
      this.executeHooks('beforeEnable');
      this.enableInputs();
      this.executeHooks('afterEnable');
    });
  }

  bindFormSubmit() {
    this.$form.on('submit', (event) => {
      event.preventDefault();
      this.executeHooks('beforeSubmit');
      const formData = this.$form.serialize();
      $.ajax({
        type: 'POST',
        url: this.$form.attr('action'),
        data: formData,
        success: (response) => {
          alert('Datos actualizados correctamente.');
          this.updateUI(response);
          this.executeHooks('afterSubmit');
        },
        error: (xhr) => {
          alert('Ocurrió un error: ' + xhr.responseText);
        },
      });
    });
  }

  bindCancelButton() {
    this.$form.find('.cancel-button').on('click', () => {
      this.executeHooks('beforeCancel');
      this.disableInputs();
      this.restoreOriginalValues();
      this.executeHooks('afterCancel');
    });
  }

  enableInputs() {
    this.$form.find('input, select').prop('disabled', false);
    this.$form.find('.edit-button').hide();
    this.$form.find('.update-button, .cancel-button').show();
  }

  disableInputs() {
    this.$form.find('input, select').prop('disabled', true);
    this.$form.find('.update-button, .cancel-button').hide();
  }

  restoreOriginalValues() {
    this.$form.find('input, select').each((index, element) => {
      $(element).val(this.originalValues[index]);
    });
  }

  updateUI(response) {
    const data = JSON.parse(response);
    this.$form.find('input[name="name"]').val(data.name);
    this.$form.find('input[name="email"]').val(data.email);
    // Agrega más campos según sea necesario
  }
}

// Inicializar el manejador de formulario al cargar el DOM
$(document).ready(function () {
  const handler = new GenericFormHandler('#profileForm');

  // Registro de hooks personalizados (opcional)
  handler.registerHook('beforeEnable', () => {
    console.log('Preparando para habilitar los campos...');
  });

  handler.registerHook('afterEnable', () => {
    console.log('Los campos han sido habilitados.');
  });

  handler.registerHook('beforeSubmit', () => {
    console.log('Preparando para enviar el formulario...');
  });

  handler.registerHook('afterSubmit', () => {
    console.log('El formulario ha sido enviado exitosamente.');
  });

  handler.registerHook('beforeCancel', () => {
    console.log('Preparando para cancelar los cambios...');
  });

  handler.registerHook('afterCancel', () => {
    console.log('Los cambios han sido cancelados.');
  });
});
