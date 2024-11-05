

import { addModalToDOM, setModalMessage } from "./index.js";
import { deleteService } from "../services/index.js";


export const confirmDelete = async (
  id,
  endpoint,
  typeName,
  loadItems,
  deleteItem
) => {
  return new Promise((resolve) => {
    addModalToDOM(); 

    const message = `¿Estás seguro de que deseas eliminar este ${typeName}?`;
    setModalMessage(message); 

    
    Modal.open("#deleteItemModal");

    
    $("#confirmDeleteButton")
      .off("click")
      .on("click", async () => {
        try {
          const responseMessage = await deleteService(id, endpoint, deleteItem); 
          await loadItems(); 
          Modal.close("#deleteItemModal"); 
          showSnackbar(responseMessage, true); 
          resolve(); 
        } catch (error) {
          console.error("Error al eliminar:", error);
          Modal.close("#deleteItemModal"); 
          showSnackbar("Error al eliminar el elemento.", false); 
          resolve(); 
        }
      });

    
   
  });
};
