const express = require('express');
const {
  getComponents,
  getComponentsByType,
  createComponent,
  updateComponent,
  deleteComponent,
  deleteMultipleComponents,
  updateMultipleComponents,
  archiveMultipleComponents,
} = require('../../controllers/components/componentController');

const router = express.Router();

// 🔹 Obtener todos los componentes
router.get('/api', getComponents);

// 🔹 Obtener componentes por tipo (ej. "button", "card", "input")
router.get('/:type', getComponentsByType);

// 🔹 Crear un nuevo componente
router.post('/', createComponent);

// 🔹 Actualizar un componente por ID
router.put('/:id', updateComponent);

// 🔹 Eliminar un componente por ID
router.delete('/delete/:id', deleteComponent);
// Nuevas rutas para acciones en masa
router.delete('/delete-multiple', deleteMultipleComponents); // Eliminar múltiples
router.put('/update-multiple', updateMultipleComponents); // Actualizar múltiples
router.put('/archive-multiple', archiveMultipleComponents); // Archivar múltiples
module.exports = router;
