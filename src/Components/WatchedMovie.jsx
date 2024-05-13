import PropTypes from 'prop-types';
import { FaTrashCan } from 'react-icons/fa6';

const WatchedMovie = ({ movie, onSelectMovie, onRemoveFromWatched }) => {
  return (
    <div className="bg-black flex mb-4">
      <li
        className="flex items-center w-11/12 cursor-pointer hover:bg-gray-700 p-2 gap-2 transition-colors duration-300 ease-in-out"
        onClick={() => {
          onSelectMovie(movie.imdbID);
        }}
      >
        <figure className="md:w-36 w-16">
          <img src={movie.Poster} alt={`${movie.Title} poster`} />
        </figure>
        <div className="ml-4">
          <h3 className="font-bold mb-4 text-xl lg:text-2xl 2xl:text-3xl">
            {movie.Title}
          </h3>
          <div className="flex gap-4 text-xs lg:text-lg 2xl:text-2xl">
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
        </div>
      </li>
      <button
        className="bg-red-500 font-black text-white p-1 hover:bg-red-600 transition-colors duration-300 w-1/12 flex justify-center items-center"
        onClick={() => {
          onRemoveFromWatched(movie.imdbID);
        }}
      >
        <FaTrashCan />
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
