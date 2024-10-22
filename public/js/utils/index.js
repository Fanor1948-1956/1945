

export const toggleCheckboxes = (containerId, assignedIds) => {
  const checkboxes = document.querySelectorAll(
    `#${containerId} input[type="checkbox"]`
  );
  checkboxes.forEach((checkbox) => {
    checkbox.checked = assignedIds.includes(checkbox.value);
  });
};




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


export const addModalToDOM = () => {
  
  if ($("#deleteItemModal").length === 0) {
    $("body").append(modalHTML); 
  }
};


export const setModalMessage = (message) => {
  $("#modalMessage").text(message); 
};
