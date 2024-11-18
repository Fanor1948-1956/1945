// useEffect.js
const useEffect = (() => {
  let previousDependencies = [];
  let cleanupFunction;

  return (callback, dependencies = []) => {
    // Comprobar si alguna de las dependencias ha cambiado
    const hasChanged = dependencies.some(
      (dep, i) => dep !== previousDependencies[i]
    );

    // Si hay cambios en las dependencias o es la primera vez
    if (hasChanged || previousDependencies.length === 0) {
      // Ejecutar la función de limpieza previa si existe
      if (typeof cleanupFunction === 'function') cleanupFunction();

      // Ejecutamos el callback y guardamos su función de limpieza
      cleanupFunction = callback();

      // Actualizamos las dependencias previas
      previousDependencies = dependencies;
    }

    // Devolvemos la función de limpieza para que se ejecute cuando el efecto cambie
    return () => {
      if (typeof cleanupFunction === 'function') cleanupFunction();
    };
  };
})();

export default useEffect;
