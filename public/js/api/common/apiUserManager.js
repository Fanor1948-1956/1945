// apiUserManager.js
import { apiFetch } from "../apiFetch.js";

// Función genérica para registrar datos
export async function registerData(url, data) {
  try {
    const response = await apiFetch(url, "POST", data);
    console.log("Datos registrados:", response);
    return response; // Devuelve la respuesta si es necesario
  } catch (error) {
    console.error("Error al registrar datos:", error);
    return null; // Devuelve null en caso de error
  }
}

// Función genérica para actualizar datos
export async function updateData(url, data) {
  try {
    const response = await apiFetch(url, "PUT", data);
    console.log("Datos actualizados:", response);
    return response; // Devuelve la respuesta si es necesario
  } catch (error) {
    console.error("Error al actualizar datos:", error);
    return null; // Devuelve null en caso de error
  }
}
// Función para eliminar datos
export async function deleteData(url) {
  try {
    const response = await apiFetch(url, "DELETE");
    console.log("Datos eliminados:", response);
    return response; // Devuelve la respuesta si es necesario
  } catch (error) {
    console.error("Error al eliminar datos:", error);
    return null; // Devuelve null en caso de error
  }
}

// Función para desactivar datos
export async function deactivateData(url) {
  try {
    const response = await apiFetch(url, "PATCH", { active: false }); // Envío de un cuerpo de solicitud si es necesario
    console.log("Datos desactivados:", response);
    return response; // Devuelve la respuesta si es necesario
  } catch (error) {
    console.error("Error al desactivar datos:", error);
    return null; // Devuelve null en caso de error
  }
}

// Función para activar datos
export async function activateData(url) {
  try {
    const response = await apiFetch(url, "PATCH", { active: true }); // Envío de un cuerpo de solicitud si es necesario
    console.log("Datos activados:", response);
    return response; // Devuelve la respuesta si es necesario
  } catch (error) {
    console.error("Error al activar datos:", error);
    return null; // Devuelve null en caso de error
  }
}

// Función para obtener y renderizar datos
export async function fetchAndRenderData(url) {
  try {
    const data = await apiFetch(url);
    console.log("Data received:", data);
    return data; // Devuelve los datos para que el servicio los maneje
  } catch (error) {
    console.error("Error al obtener los datos:", error);
  }
}
export async function getById(url) {
  try {
    const response = await apiFetch(url, "GET");

    console.log("Datos obtenidos por ID:", response);
    return response; // Devuelve la respuesta con los datos
  } catch (error) {
    console.error("Error al obtener datos por ID:", error);
    return null; // Devuelve null en caso de error
  }
}
