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
import { FaListAlt } from 'react-icons/fa';

const App = () => {
  const [query, setQuery] = useState('');
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [watched, setWatched] = useLocalStorageState([], 'watched');
  const { movies, isLoading, error } = useMovies(query);
  const [showWatchedList, setShowWatchedList] = useState(false);

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

  const handleShowWatchedListOpen = () => {
    setShowWatchedList(true);
  };

  const handleShowWatchedListClose = () => {
    setShowWatchedList(false);
  };

  useKey('Enter', handleFocusInput);

  useKey('l', handleShowWatchedListOpen);

  useKey('Escape', handleShowWatchedListClose);

  return (
    <div className="px-4">
      <Nav>
        <Search query={query} setQuery={setQuery} inputRef={inputRef} />
      </Nav>
      <Main>
        <Box className="mt-4">
          <div className="flex justify-between items-center h-11 shadow-md">
            <CountOfMoviesResults number={movies.length} />
            <div
              className="tooltip tooltip-left animate-FadeInRev"
              data-tip="My List"
            >
              <button
                className="text-2xl text-white bg-yellow-400 p-2 rounded-lg hover:bg-yellow-500 transition-colors duration-300 ease-in-out"
                onClick={() => setShowWatchedList(true)}
                aria-label="Show watched movies"
              >
                <FaListAlt />
              </button>
            </div>
          </div>
          {movies.length === 0 && !isLoading && !error && (
            <div className="main flex flex-col justify-center items-center animate-slideUp">
              <p className="text-xs md:text-xl xl:text-2xl text-center mb-4">
                <em>
                  Start searching for movie by click on the button below or
                  press Enter
                </em>
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
        {selectedMovieId && (
          <Box className="animate-FadeInRev absolute top-0 right-0 z-20 bg-black/90 shadow-right md:w-4/6 w-11/12 h-screen overflow-y-scroll overflow-x-hidden">
            <MovieDetails
              selectedMovieId={selectedMovieId}
              onCloseMovie={handleMovieClose}
              onAddToWatched={handleAddToWatched}
              watchedArr={watched}
            />
          </Box>
        )}
        {showWatchedList && (
          <Box className="animate-FadeInRev absolute top-0 right-0 z-10 bg-black/90 shadow-right md:w-4/6 w-11/12 h-screen overflow-y-scroll overflow-x-hidden">
            <WatchedSummary
              watched={watched}
              setShowWatchedList={setShowWatchedList}
            />
            <WatchedMoviesList
              watched={watched}
              onRemoveFromWatched={handleRemoveFromWatched}
              onSelectMovie={handleMovieSelect}
            />
          </Box>
        )}
      </Main>
    </div>
  );
};

export default App;
