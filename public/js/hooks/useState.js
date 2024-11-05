// state.js
const useState = (key, initialValue) => {
  // Intenta recuperar el valor desde localStorage
  const storedValue = localStorage.getItem(key);
  let value = storedValue !== null ? JSON.parse(storedValue) : initialValue;
  const listeners = [];

  const setValue = (newValue) => {
    value = newValue;
    // Almacena el nuevo valor en localStorage
    localStorage.setItem(key, JSON.stringify(value));
    listeners.forEach((listener) => listener(value));
  };

  const getValue = () => value;

  const subscribe = (listener) => {
    listeners.push(listener);
  };

  return [getValue, setValue, subscribe];
};

// Exporta la función para que puedas usarla en otros archivos
export default useState;
