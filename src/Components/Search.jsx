import PropTypes from 'prop-types';

const Search = ({ query, setQuery, inputRef }) => {
  const handleEsc = (e) => {
    if (e.key === 'Escape') {
      setQuery('');
      inputRef.current.blur();
    }
  };

  return (
    <input
      ref={inputRef}
      className="bg-cPurpleLight outline-none md:px-4 md:py-2 px-2 py-2 md:text-2xl text-xl rounded-xl md:w-1/3 w-2/3 placeholder:text-gray-300 text-white md:focus:w-2/5 focus:translate-y-2 focus:shadow-md focus:shadow-cPurple transition-all duration-400 animate-slideDown"
      type="text"
      placeholder="search for a movie..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      onKeyDown={handleEsc}
    />
  );
};

Search.propTypes = {
  query: PropTypes.string,
  setQuery: PropTypes.func,
  inputRef: PropTypes.object,
};

export default Search;
