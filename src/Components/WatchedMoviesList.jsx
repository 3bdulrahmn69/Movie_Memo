import PropTypes from 'prop-types';
import WatchedMovie from './WatchedMovie';

const WatchedMoviesList = ({ watched, onSelectMovie, onRemoveFromWatched }) => {
  return (
    <ul className="list list-movies">
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
          onSelectMovie={onSelectMovie}
          onRemoveFromWatched={onRemoveFromWatched}
        />
      ))}
    </ul>
  );
};

WatchedMoviesList.propTypes = {
  watched: PropTypes.array,
  onSelectMovie: PropTypes.func,
  onRemoveFromWatched: PropTypes.func,
};

export default WatchedMoviesList;
