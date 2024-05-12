import { useState, useEffect } from 'react';
import getMovies from '../utilities';

export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setIsLoading(true);
    setError('');

    const controller = new AbortController();
    const { signal } = controller;

    const fetchData = async () => {
      if (query.length > 2) {
        try {
          const data = await getMovies(query, signal);
          setMovies(data);
          setError('');
        } catch (error) {
          setMovies([]);
          if (error.name !== 'CanceledError' || error.name !== 'AbortError') {
            setError(error.message);
          }
        } finally {
          setIsLoading(false);
        }
      } else {
        setMovies([]);
        setIsLoading(false);
        setError('');
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [query]);

  return { movies, isLoading, error };
}
