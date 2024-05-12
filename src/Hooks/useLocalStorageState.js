import { useState, useEffect } from 'react';

export function useLocalStorageState(initialState, key) {
  // const [watched, setWatched] = useState([]);
  // * this will run every time the component is mounted *
  // const [watched, setWatched] = useState(
  //   JSON.parse(localStorage.getItem('watched')) || []
  // );
  // * this will run only once when the component is mounted *
  // const [watched, setWatched] = useState(() => {
  //   const storedValue = localStorage.getItem('watched');
  //   return JSON.parse(storedValue);
  // });
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return JSON.parse(storedValue) || initialState;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}
