// modal.js

let onConfirm = null;

export const openModal = (message, confirmCallback) => {
  onConfirm = confirmCallback; // Guarda la función de confirmación

  const modal = document.getElementById('deleteItemModal');
  modal.style.display = 'flex'; // Muestra el modal

  // Establece el mensaje del modal
  setModalMessage(message); // Actualiza el mensaje del modal

  // Agrega eventos para los botones
  document.getElementById('confirmDeleteButton').onclick = () => {
    if (onConfirm) {
      onConfirm(); // Llama a la función de confirmación
    }
    closeModal(); // Cierra el modal
  };

  document.getElementById('cancelDeleteButton').onclick = closeModal; // Cierra el modal al cancelar

  // Evento para cerrar el modal al hacer clic en la X
  document.querySelector('.close-button').onclick = closeModal;

  // Cierra el modal al hacer clic fuera de él
  modal.onclick = (event) => {
    if (event.target === modal) {
      closeModal();
    }
  };
};

export const closeModal = () => {
  const modal = document.getElementById('deleteItemModal');
  if (modal) {
    modal.style.display = 'none'; // Oculta el modal
    modal.remove(); // Elimina el modal del DOM
  }
};
