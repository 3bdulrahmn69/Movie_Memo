import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import StarsRaring from './StarsRaring';
import Loader from './Loader';
import { getMovieById } from '../utilities';
import { useKey } from '../Hooks/useKey';
import CloseBtn from './CloseBtn';
import noMovie from '../assets/noMovie.webp';

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
    Ratings,
    Plot,
    Released,
    Actors,
    Director,
    Genre,
    Rated,
    BoxOffice,
    Awards,
    Writer,
  } = movie;

  const handleAdd = () => {
    const newWatchedMovie = {
      imdbID: selectedMovieId,
      Title,
      Year,
      Poster,
      imdbRating: Number(imdbRating),
      runtime: Number(Runtime.split(' ').at(0)),
      Rated,
      userRating,
      countForRatingDecision: countRef.current,
      BoxOffice,
      Awards,
      Writer,
      Ratings,
    };

    onAddToWatched(newWatchedMovie);
    onCloseMovie();
  };

  useEffect(() => {
    if (Title) {
      document.title = `Movie | ${Title}`;
    }

    return () => {
      document.title = 'My Watched Movies';
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
    }
  }, [userRating]);

  useKey('Escape', onCloseMovie);

  if (isLoading) {
    return <Loader />;
  }

  console.log(movie);

  return (
    <div className="px-4">
      <CloseBtn func={onCloseMovie} />
      <header className="flex md:flex-row flex-col gap-4">
        <figure className="w-64">
          {Poster === 'N/A' ? (
            <img src={noMovie} alt="Placeholder poster" className="rounded" />
          ) : (
            <img src={Poster} alt={`${Title} poster`} className="rounded" />
          )}
        </figure>
        <div className="flex gap-4 flex-col md:mt-8 mt-2">
          <h2 className="text-2xl font-bold text-white">{Title}</h2>
          {Runtime === 'N/A' ? null : (
            <p>
              {Released} &bull; {Runtime}
            </p>
          )}
          {Rated === 'N/A' ? null : (
            <p>
              <strong>Rated:</strong> {Rated}
            </p>
          )}
          {Genre === 'N/A' ? null : (
            <p>
              <strong>Genre:</strong> {Genre}
            </p>
          )}
          {imdbRating === 'N/A' ? null : (
            <p>
              <span>⭐</span>
              {imdbRating} IMDb Rating
            </p>
          )}
          {Ratings && Ratings.length > 0 && (
            <p>
              <strong>Ratings:</strong>
              {Ratings.map((rating, index) => (
                <span className="block" key={index}>
                  🎗️{rating.Source}: {rating.Value}
                </span>
              ))}
            </p>
          )}
        </div>
      </header>
      <section className="py-2">
        <p>
          <em>{Plot}</em>
        </p>
        <div className="flex flex-col gap-4 items-center py-4">
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
                <button
                  className="bg-blue-600 px-4 py-2 hover:bg-blue-700 transition-colors duration-300 rounded text-white"
                  onClick={() => handleAdd(movie)}
                >
                  <span role="img">+ </span>
                  <span>Add to Watched</span>
                </button>
              )}
            </>
          )}
        </div>
        {Actors === 'N/A' ? null : (
          <p>
            <strong>Actors:</strong> {Actors}
          </p>
        )}
        {Writer === 'N/A' ? null : (
          <p>
            <strong>Writer:</strong> {Writer}
          </p>
        )}
        {Director === 'N/A' ? null : (
          <p>
            <strong>Director:</strong> {Director}
          </p>
        )}
        {Awards === 'N/A' ? null : (
          <p>
            <strong>Awards:</strong> {Awards}
          </p>
        )}
        {BoxOffice === 'N/A' || !BoxOffice ? null : (
          <p>
            <strong>Box Office:</strong> {BoxOffice}
          </p>
        )}
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
