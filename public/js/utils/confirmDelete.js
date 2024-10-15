// confirmDelete.js

import { addModalToDOM, setModalMessage } from "./index.js";
import { deleteService } from "../services/index.js";


export const confirmDelete = async (
  id,
  endpoint,
  typeName,
  loadPermissions,
  deleteItem
) => {
  return new Promise((resolve) => {
    addModalToDOM(); // Asegura que el modal esté en el DOM

    const message = `¿Estás seguro de que deseas eliminar este ${typeName}?`;
    setModalMessage(message); // Establece el mensaje en el modal

    // Muestra el modal
    Modal.open("#deleteItemModal");

    // Añadir evento para el botón de confirmar eliminación
    $("#confirmDeleteButton")
      .off("click")
      .on("click", async () => {
        try {
          const responseMessage = await deleteService(id, endpoint, deleteItem); // Llama al servicio de eliminación
          await loadPermissions(); // Recarga permisos después de la eliminación
          Modal.close("#deleteItemModal"); // Cierra el modal
          showSnackbar(responseMessage, true); // Muestra mensaje de éxito
          resolve(); // Resuelve la promesa
        } catch (error) {
          console.error("Error al eliminar:", error);
          Modal.close("#deleteItemModal"); // Cierra el modal
          showSnackbar("Error al eliminar el elemento.", false); // Muestra mensaje de error
          resolve(); // Resuelve la promesa
        }
      });

    // Añadir evento para el botón de cancelar
    $("#cancelDeleteButton")
      .off("click")
      .on("click", () => {
        Modal.close("#deleteItemModal"); // Cierra el modal al cancelar
        resolve(); // Resuelve la promesa
      });
  });
};
