import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import StarsRaring from './StarsRaring';
import Loader from './Loader';
import { getMovieById } from '../utilities';
import { useKey } from '../Hooks/useKey';

const MovieDetails = ({
  selectedMovieId,
  onCloseMovie,
  onAddToWatched,
  watchedArr,
}) => {
  const [movie, setMovie] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState();

  const countRef = useRef(0);

  const isMovieWatched = watchedArr
    .map((movie) => movie.imdbID)
    .includes(selectedMovieId);

  const watchedUserRating = watchedArr.find(
    (movie) => movie.imdbID === selectedMovieId
  )?.userRating;

  const {
    Title,
    Year,
    Poster,
    Runtime,
    imdbRating,
    Plot,
    Released,
    Actors,
    Director,
    Genre,
  } = movie;

  const handleAdd = () => {
    const newWatchedMovie = {
      imdbID: selectedMovieId,
      Title,
      Year,
      Poster,
      imdbRating: Number(imdbRating),
      runtime: Number(Runtime.split(' ').at(0)),
      userRating,
      countForRatingDecision: countRef.current,
    };

    onAddToWatched(newWatchedMovie);
    onCloseMovie();
  };

  useEffect(() => {
    if (Title) {
      document.title = `Movie | ${Title}`;
    }

    return () => {
      document.title = 'Movie Memo';
    };
  }, [Title]);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const data = await getMovieById(selectedMovieId);
        setMovie(data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [selectedMovieId]);

  useEffect(() => {
    if (userRating) {
      countRef.current++;
      console.log(countRef.current);
    }
  }, [userRating]);

  useKey('Escape', onCloseMovie);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="details">
      <header>
        <button className="btn-back" onClick={onCloseMovie}>
          X
        </button>
        <img src={Poster} alt={`${Title} poster`} />
        <div className="details-overview">
          <h2>{Title}</h2>
          <p>
            {Released} &bull; {Runtime}
          </p>
          <p>{Genre}</p>
          <p>
            <span>⭐</span>
            {imdbRating} IMDb Rating
          </p>
        </div>
      </header>
      <section>
        <div className="rating">
          {isMovieWatched ? (
            <p>
              your rated is {watchedUserRating}
              <span>⭐ </span>
            </p>
          ) : (
            <>
              <StarsRaring
                maxRating={10}
                size={24}
                onSetRating={setUserRating}
              />
              {userRating > 0 && (
                <button className="btn-add" onClick={() => handleAdd(movie)}>
                  <span role="img">+ </span>
                  <span>Add to Watched</span>
                </button>
              )}
            </>
          )}
        </div>
        <p>
          <em>{Plot}</em>
        </p>
        <p>
          <strong>Actors:</strong> {Actors}
        </p>
        <p>
          <strong>Director:</strong> {Director}
        </p>
      </section>
    </div>
  );
};

MovieDetails.propTypes = {
  selectedMovieId: PropTypes.string,
  onCloseMovie: PropTypes.func,
  onAddToWatched: PropTypes.func,
  watchedArr: PropTypes.array,
};

export default MovieDetails;
