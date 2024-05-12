import { useState, useEffect, useRef } from 'react';
import getMovies from './utilities';
import Loader from './Components/Loader';
import Error from './Components/Error';
import Nav from './Components/Nav';
import Main from './Components/Main';
import Search from './Components/Search';
import CountOfMoviesResults from './Components/CountOfMoviesResults';
import WatchedSummary from './Components/WatchedSummary';
import WatchedMoviesList from './Components/WatchedMoviesList';
import Box from './Components/Box';
import MoviesList from './Components/MoviesList';
import MovieDetails from './Components/MovieDetails';
import ClickToSearch from './Components/ClickToSearch';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [query, setQuery] = useState('');
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const inputRef = useRef(null);
  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleMovieSelect = async (id) => {
    setSelectedMovieId((selectedId) => (selectedId === id ? null : id));
  };

  const handleMovieClose = () => {
    setSelectedMovieId(null);
  };

  const handleAddToWatched = (movie) => {
    setWatched((watched) => [...watched, movie]);
  };

  const handleRemoveFromWatched = (id) => {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  };

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

  return (
    <>
      <Nav>
        <Search query={query} setQuery={setQuery} inputRef={inputRef} />
        <CountOfMoviesResults number={movies.length} />
      </Nav>
      <Main>
        <Box className="box animate-FadeIn">
          {movies.length === 0 && !isLoading && !error && (
            <div className="h-full flex justify-center items-center">
              <ClickToSearch focusInput={focusInput} />
            </div>
          )}
          {isLoading ? (
            <Loader />
          ) : error ? (
            <Error message={error} />
          ) : (
            <MoviesList movies={movies} onSelectMovie={handleMovieSelect} />
          )}
        </Box>
        <Box className="box animate-FadeInRev">
          {selectedMovieId ? (
            <MovieDetails
              selectedMovieId={selectedMovieId}
              onCloseMovie={handleMovieClose}
              onAddToWatched={handleAddToWatched}
              watchedArr={watched}
            />
          ) : (
            <div className="animate-FadeInRev">
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onSelectMovie={handleMovieSelect}
                onRemoveFromWatched={handleRemoveFromWatched}
              />
            </div>
          )}
        </Box>
      </Main>
    </>
  );
};

export default App;
