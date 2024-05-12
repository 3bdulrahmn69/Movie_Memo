import PropTypes from 'prop-types';

const WatchedMovie = ({ movie, onSelectMovie, onRemoveFromWatched }) => {
  return (
    <div>
      <li onClick={() => onSelectMovie(movie.imdbID)}>
        <img src={movie.Poster} alt={`${movie.Title} poster`} />
        <h3>{movie.Title}</h3>
        <div className="relative">
          <p>
            <span>⭐️</span>
            <span>{movie.imdbRating}</span>
          </p>
          <p>
            <span>🌟</span>
            <span>{movie.userRating}</span>
          </p>
          <p>
            <span>⏳</span>
            <span>{movie.runtime} min</span>
          </p>
        </div>
      </li>
      <button
        className="btn-delete"
        onClick={() => {
          onRemoveFromWatched(movie.imdbID);
        }}
      >
        <span role="img" aria-label="Remove from watched">
          X
        </span>
      </button>
    </div>
  );
};

WatchedMovie.propTypes = {
  movie: PropTypes.object,
  onSelectMovie: PropTypes.func,
  onRemoveFromWatched: PropTypes.func,
};

export default WatchedMovie;
