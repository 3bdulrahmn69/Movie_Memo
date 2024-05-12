import PropTypes from 'prop-types';
import Movie from './Movie';

const MoviesList = ({ movies, onSelectMovie }) => {
  return (
    <ul className="overflow-scroll flex flex-col justify-center items-center w-full mt-8">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} onSelectMovie={onSelectMovie} />
      ))}
    </ul>
  );
};

MoviesList.propTypes = {
  movies: PropTypes.array,
  onSelectMovie: PropTypes.func,
};

export default MoviesList;
