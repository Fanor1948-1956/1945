// useEffect.js
const useEffect = (callback, dependencies) => {
  let isMounted = true;

  const executeEffect = () => {
    if (isMounted) {
      const cleanup = callback();
      if (typeof cleanup === 'function') {
        return cleanup;
      }
    }
  };

  const cleanup = executeEffect();

  const cleanupEffect = () => {
    isMounted = false;
    if (cleanup) cleanup();
  };

  return cleanupEffect;
};

export default useEffect;
