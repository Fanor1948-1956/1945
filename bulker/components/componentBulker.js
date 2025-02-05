const connectDB = require('./../database');
const mongoose = require('mongoose');
const Component = require('../../models/components/componentModel'); // Modelo de componente

// 🔹 Conectar a la base de datos antes de insertar los datos
connectDB();

// 🔹 Función para generar botones dinámicamente
const generateButtons = (count) => {
  const buttonTypes = ['primary', 'success', 'warning', 'danger', 'info'];
  let buttons = [];

  for (let i = 1; i <= count; i++) {
    const type = buttonTypes[i % buttonTypes.length]; // Alternar tipos
    buttons.push({
      name: `Botón ${i}`,
      type: 'button',
      properties: { text: `Botón ${i}`, class: `btn-${type}` },
      styles: `btn btn-${type}`,
    });
  }
  return buttons;
};

// 🔹 Función para generar inputs dinámicamente
const generateInputs = (count) => {
  const inputTypes = ['text', 'email', 'password', 'search', 'number'];
  let inputs = [];

  for (let i = 1; i <= count; i++) {
    const type = inputTypes[i % inputTypes.length]; // Alternar tipos
    inputs.push({
      name: `Input ${type} ${i}`,
      type: 'input',
      properties: { placeholder: `Ingrese ${type}...`, type },
      styles: `form-control input-${type}`,
    });
  }
  return inputs;
};

// 🔹 Función para generar tarjetas dinámicamente
const generateCards = (count) => {
  let cards = [];

  for (let i = 1; i <= count; i++) {
    cards.push({
      name: `Tarjeta ${i}`,
      type: 'card',
      properties: {
        title: `Tarjeta ${i}`,
        content: `Descripción de la tarjeta ${i}`,
        image: `image${i}.jpg`,
      },
      styles: 'card card-style',
    });
  }
  return cards;
};

// 🔹 Generar componentes dinámicamente
const components = [
  ...generateButtons(20), // 20 Botones
  ...generateInputs(10), // 10 Inputs
  ...generateCards(16), // 16 Tarjetas
];

// 🔹 Insertar los componentes en la base de datos
const insertComponents = async () => {
  try {
    await Component.insertMany(components);
    console.log(
      `✅ ${components.length} Componentes creados exitosamente con estilos`
    );
  } catch (error) {
    console.error('❌ Error al crear componentes:', error);
  } finally {
    mongoose.connection.close();
    console.log('🔌 Conexión cerrada');
  }
};

// 🔹 Ejecutar la inserción
insertComponents();
