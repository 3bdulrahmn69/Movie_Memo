import { useState, useRef } from 'react';
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
import { useMovies } from './Hooks/useMovies';
import { useLocalStorageState } from './Hooks/useLocalStorageState';
import { useKey } from './Hooks/useKey';

const App = () => {
  const [query, setQuery] = useState('');
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [watched, setWatched] = useLocalStorageState([], 'watched');
  const { movies, isLoading, error } = useMovies(query);

  const inputRef = useRef(null);

  const handleMovieSelect = async (id) => {
    setSelectedMovieId((selectedId) => (selectedId === id ? null : id));
  };

  const handleMovieClose = () => {
    setSelectedMovieId(null);
  };

  const handleAddToWatched = (movie) => {
    setWatched((watched) => [...watched, movie]);
    // * this will work but useEffect will run twice (add - remove) because of the state update *
    // localStorage.setItem('watched', JSON.stringify([...watched, movie]));
  };

  const handleRemoveFromWatched = (id) => {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  };

  const handleFocusInput = () => {
    if (document.activeElement !== inputRef.current) {
      inputRef.current.focus();
      setQuery('');
    }
  };

  useKey('Enter', handleFocusInput);

  return (
    <>
      <Nav>
        <Search query={query} setQuery={setQuery} inputRef={inputRef} />
        <CountOfMoviesResults number={movies.length} />
      </Nav>
      <Main>
        <Box className="box animate-FadeIn">
          {movies.length === 0 && !isLoading && !error && (
            <div className="h-full flex flex-col justify-center items-center animate-slideUp">
              <p className="text-2xl text-center mb-4 italic">
                Start searching for movie by click on the button below or press
                Enter
              </p>
              <ClickToSearch focusInput={handleFocusInput} />
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
