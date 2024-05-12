import { useEffect } from 'react';

export function useKey(key, action) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key.toLowerCase() === key.toLowerCase()) {
        action(null);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    /*
      Cleanup function to remove the event listener when the component is unmounted
      This is important to prevent memory leaks and unexpected behavior
      if we didn't remove the event listener, it would add a new one every time the component re-renders
      and it is going to be a unlimited number of event listeners
    */
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [action, key]);
}
