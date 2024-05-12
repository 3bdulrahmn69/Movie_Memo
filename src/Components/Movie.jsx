import PropTypes from 'prop-types';

const Movie = ({ movie, onSelectMovie }) => {
  return (
    <li
      className="flex items-center flex-col gap-2 mb-4 px-4 py-2 rounded-lg shadow-lg cursor-pointer w-9/12 hover:scale-105 transition-transform duration-300 ease-in-out"
      onClick={() => {
        onSelectMovie(movie.imdbID);
      }}
    >
      <figure className="w-64 h-96">
        <img
          className="w-full rounded-lg shadow-md"
          src={movie.Poster}
          alt={`${
            movie.Title.slice(0, 10) + (movie.Title.length > 10 ? '...' : '')
          } poster`}
        />
      </figure>
      <div className="flex items-center text-3xl gap-2">
        <h3 className="font-bold">{movie.Title}</h3>
        <span>{movie.Year}</span>
      </div>
    </li>
  );
};

Movie.propTypes = {
  movie: PropTypes.object,
  onSelectMovie: PropTypes.func,
};

export default Movie;
