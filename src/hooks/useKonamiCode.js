import { useEffect, useState } from 'react';

const konamiCode = [
  'ArrowUp', 'ArrowUp',
  'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight',
  'ArrowLeft', 'ArrowRight',
  'b', 'a', 'Enter'
];

const useKonamiCode = (callback) => {
  const [sequence, setSequence] = useState([]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      setSequence((prevSequence) => {
        const newSequence = [...prevSequence, event.key].slice(-konamiCode.length);
        if (newSequence.join('') === konamiCode.join('')) {
          callback(); // Trigger the callback
          return []; // Reset sequence after activation
        }
        return newSequence;
      });
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('keydown', handleKeyDown);
      }
    };
  }, [callback]);
};

export default useKonamiCode;