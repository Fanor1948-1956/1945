const Component = require('../../models/components/componentModel');

// 🔹 Obtener todos los componentes
const getComponents = async (req, res) => {
  try {
    const components = await Component.find();
    res.json(components);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener componentes' });
  }
};

// 🔹 Obtener componentes por tipo (ej. "button", "card", "input")
const getComponentsByType = async (req, res) => {
  try {
    const { type } = req.params;
    const components = await Component.find({ type });
    res.json(components);
  } catch (error) {
    res.status(500).json({ error: 'Error al filtrar componentes' });
  }
};

// 🔹 Crear un nuevo componente
const createComponent = async (req, res) => {
  try {
    const { name, type, properties } = req.body;
    const newComponent = new Component({ name, type, properties, styles });
    await newComponent.save();
    res.json({ message: 'Componente creado', newComponent });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear componente' });
  }
};

// 🔹 Actualizar un componente por ID
const updateComponent = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedComponent = await Component.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json({ message: 'Componente actualizado', updatedComponent });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar componente' });
  }
};

// 🔹 Eliminar un componente por ID
const deleteComponent = async (req, res) => {
  try {
    const { id } = req.params;
    await Component.findByIdAndDelete(id);
    res.json({ message: 'Componente eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar componente' });
  }
};
// 🔹 Eliminar múltiples componentes
const deleteMultipleComponents = async (req, res) => {
  try {
    const { ids } = req.body; // Array de IDs de componentes
    await Component.deleteMany({ _id: { $in: ids } }); // Elimina todos los componentes con los IDs proporcionados
    res.json({ message: `${ids.length} componente(s) eliminado(s)` });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar componentes' });
  }
};
// 🔹 Actualizar múltiples componentes
const updateMultipleComponents = async (req, res) => {
  try {
    const { ids, updateData } = req.body; // `ids` es el array de IDs y `updateData` es el objeto con los datos a actualizar
    const updatedComponents = await Component.updateMany(
      { _id: { $in: ids } },
      { $set: updateData },
      { new: true }
    );
    res.json({
      message: `${updatedComponents.nModified} componente(s) actualizado(s)`,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar componentes' });
  }
};
// 🔹 Archivar múltiples componentes
const archiveMultipleComponents = async (req, res) => {
  try {
    const { ids } = req.body; // Array de IDs de componentes
    await Component.updateMany(
      { _id: { $in: ids } },
      { $set: { archived: true } }
    );
    res.json({ message: `${ids.length} componente(s) archivado(s)` });
  } catch (error) {
    res.status(500).json({ error: 'Error al archivar componentes' });
  }
};

module.exports = {
  getComponents,
  getComponentsByType,
  createComponent,
  updateComponent,
  deleteComponent,
  deleteMultipleComponents,
  updateMultipleComponents,
  archiveMultipleComponents,
};
