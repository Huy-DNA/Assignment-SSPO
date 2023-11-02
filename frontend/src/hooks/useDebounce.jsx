import { useState, useEffect } from 'react';

/**
 *
 * @param value
 * @param delay
 */
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);

    return () => clearTimeout(handler);
  }, [value]);

  return debouncedValue;
}

export default useDebounce;
