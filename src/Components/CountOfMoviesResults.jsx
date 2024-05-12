import PropTypes from 'prop-types';

const CountOfMoviesResults = ({ number }) => {
  return (
    <p className="text-3xl w-64 md:block hidden animate-FadeInRev">
      <strong className="px-2 py-1 bg-cPurpleLight rounded-md">
        {number === 0 ? '0' : number}
      </strong>{' '}
      results Found
    </p>
  );
};

CountOfMoviesResults.propTypes = {
  number: PropTypes.number,
};

export default CountOfMoviesResults;
