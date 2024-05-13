import PropTypes from 'prop-types';
import noMovie from '../assets/noMovie.webp';

const Movie = ({ movie, onSelectMovie }) => {
  return (
    <li
      className="relative flex items-center flex-col gap-2 mb-4 px-4 py-2 rounded-lg shadow-lg cursor-pointer border-2 w-full md:w-2/5 xl:w-1/5 md:hover:scale-105 transition-transform duration-300 ease-in-out animate-slideUp"
      onClick={() => {
        onSelectMovie(movie.imdbID);
      }}
    >
      <span className="absolute top-0 left-0 bg-cPurple text-white px-4 py-2 rounded-tl-lg rounded-br-lg animate-FadeIn">
        {movie.Year}
      </span>
      <figure className="w-64 h-96">
        {movie.Poster === 'N/A' ? (
          <img
            className="w-full rounded-lg shadow-md"
            src={noMovie}
            alt="Placeholder poster"
          />
        ) : (
          <img
            className="w-full rounded-lg shadow-md"
            src={movie.Poster}
            alt={`${
              movie.Title.slice(0, 10) + (movie.Title.length > 10 ? '...' : '')
            } poster`}
          />
        )}
      </figure>
      <div className="flex items-center text-3xl">
        <h3 className="font-bold">{movie.Title}</h3>
      </div>
    </li>
  );
};

Movie.propTypes = {
  movie: PropTypes.object,
  onSelectMovie: PropTypes.func,
};

export default Movie;
