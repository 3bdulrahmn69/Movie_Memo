import PropTypes from 'prop-types';
import Movie from './Movie';

const MoviesList = ({ movies, onSelectMovie }) => {
  return (
    <div className="movies__container overflow-scroll py-4">
      <ul className="flex flex-row flex-wrap gap-4 justify-center items-center mt-4">
        {movies?.map((movie) => (
          <Movie
            movie={movie}
            key={movie.imdbID}
            onSelectMovie={onSelectMovie}
          />
        ))}
      </ul>
    </div>
  );
};

MoviesList.propTypes = {
  movies: PropTypes.array,
  onSelectMovie: PropTypes.func,
};

export default MoviesList;
