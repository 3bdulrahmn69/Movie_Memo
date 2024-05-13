import PropTypes from 'prop-types';
import CloseBtn from './CloseBtn';

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const WatchedSummary = ({ watched, setShowWatchedList }) => {
  const avgImdbRating = average(
    watched.map((movie) => movie.imdbRating)
  ).toFixed(2);
  const avgUserRating = average(
    watched.map((movie) => movie.userRating)
  ).toFixed(2);
  const avgRuntime = average(watched.map((movie) => movie.runtime)).toFixed(2);

  return (
    <div className="bg-slate-800 px-4 py-8 cursor-default">
      <CloseBtn func={setShowWatchedList} />
      <h2 className="font-bold mb-2">Movies you have watched</h2>
      <div className="flex gap-3 text-xs">
        <p className="tooltip tooltip-bottom" data-tip="movies watched">
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p className="tooltip tooltip-bottom" data-tip="average IMDB rating">
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p className="tooltip tooltip-bottom" data-tip="your average rating">
          <span>🌟</span>
          <span>{Math.floor(avgUserRating)}</span>
        </p>
        <p className="tooltip tooltip-bottom" data-tip="average runtime">
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
};

WatchedSummary.propTypes = {
  watched: PropTypes.array,
  setShowWatchedList: PropTypes.func,
};

export default WatchedSummary;
