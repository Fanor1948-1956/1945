// useEffect.js
const useEffect = (() => {
  let previousDependencies = []
  let cleanupFunction

  return (callback, dependencies = []) => {
    // Revisamos si hay cambios en las dependencias
    const hasChanged = dependencies.some(
      (dep, i) => dep !== previousDependencies[i]
    )

    // Si ha cambiado alguna dependencia o es la primera vez
    if (hasChanged || previousDependencies.length === 0) {
      // Ejecutamos la limpieza del efecto anterior, si existe
      if (typeof cleanupFunction === 'function') cleanupFunction()

      // Guardamos el resultado del callback (la función de limpieza)
      cleanupFunction = callback()

      // Actualizamos las dependencias previas
      previousDependencies = dependencies
    }

    // Retornamos la función de limpieza para ejecutar cuando el efecto cambie o se desmonte
    return () => {
      if (typeof cleanupFunction === 'function') cleanupFunction()
    }
  }
})()

export default useEffect
