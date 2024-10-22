
import { apiFetch } from "../apiFetch.js";


export async function registerData(url, data) {
  try {
    const response = await apiFetch(url, "POST", data);
    console.log("Datos registrados:", response);
    return response; 
  } catch (error) {
    console.error("Error al registrar datos:", error);
    return null; 
  }
}


export async function updateData(url, data) {
  try {
    const response = await apiFetch(url, "PUT", data);
    console.log("Datos actualizados:", response);
    return response; 
  } catch (error) {
    console.error("Error al actualizar datos:", error);
    return null; 
  }
}

export async function deleteData(url) {
  try {
    const response = await apiFetch(url, "DELETE");
    console.log("Datos eliminados:", response);
    return response; 
  } catch (error) {
    console.error("Error al eliminar datos:", error);
    return null; 
  }
}


export async function deactivateData(url) {
  try {
    const response = await apiFetch(url, "PATCH", { active: false }); 
    console.log("Datos desactivados:", response);
    return response; 
  } catch (error) {
    console.error("Error al desactivar datos:", error);
    return null; 
  }
}


export async function activateData(url) {
  try {
    const response = await apiFetch(url, "PATCH", { active: true }); 
    console.log("Datos activados:", response);
    return response; 
  } catch (error) {
    console.error("Error al activar datos:", error);
    return null; 
  }
}


export async function fetchAndRenderData(url) {
  try {
    const data = await apiFetch(url);
    console.log("Data received:", data);
    return data; 
  } catch (error) {
    console.error("Error al obtener los datos:", error);
  }
}
export async function getById(url) {
  try {
    const response = await apiFetch(url, "GET");

    console.log("Datos obtenidos por ID:", response);
    return response; 
  } catch (error) {
    console.error("Error al obtener datos por ID:", error);
    return null; 
  }
}
