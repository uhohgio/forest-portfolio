import { useEffect } from 'react';

const konamiCode = [
  'ArrowUp', 'ArrowUp',
  'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight',
  'ArrowLeft', 'ArrowRight',
  'b', 'a', 'Enter'
];

const useKonamiCode = (callback) => {
  useEffect(() => {
    let sequence = [];

    const handleKeyDown = (event) => {
      sequence = [...sequence, event.key].slice(-konamiCode.length);
      if (sequence.join('') === konamiCode.join('')) {
        callback(); // Trigger the callback
        sequence = []; // Reset sequence after activation
      }
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