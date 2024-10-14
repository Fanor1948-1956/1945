// js/utils/checkboxUtils.js

export const toggleCheckboxes = (containerId, assignedIds) => {
  const checkboxes = document.querySelectorAll(
    `#${containerId} input[type="checkbox"]`
  );
  checkboxes.forEach((checkbox) => {
    checkbox.checked = assignedIds.includes(checkbox.value);
  });
};

// utils.js

// HTML del modal
const modalHTML = `
  <div class="modal" id="deleteItemModal" style="display: none;">
    <div class="modal-content">
      <span class="close-button">&times;</span>
      <h2>Confirmar Eliminación</h2>
      <p id="modalMessage"></p>
      <button id="confirmDeleteButton">Confirmar</button>
      <button id="cancelDeleteButton">Cancelar</button>
    </div>
  </div>
`;

// Función para agregar el modal al DOM solo una vez
export const addModalToDOM = () => {
  // Verificar si el modal ya existe
  if ($('#deleteItemModal').length === 0) {
    $('body').append(modalHTML); // Usa jQuery para agregar el modal al DOM
  }
};

// Función para actualizar el mensaje del modal
export const setModalMessage = (message) => {
  $('#modalMessage').text(message); // Usa jQuery para establecer el texto del mensaje
};
