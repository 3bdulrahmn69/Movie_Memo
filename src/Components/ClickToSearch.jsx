import PropTypes from 'prop-types';

const ClickToSearch = ({ focusInput }) => {
  return (
    <button
      className="shadow-md shadow-cPurple bg-white text-cPurple text-3xl py-4 px-8 rounded-xl cursor-pointer hover:bg-transparent border-2 border-cPurple hover:scale-105 hover:text-white transition-all duration-300 ease-in-out"
      onClick={focusInput}
    >
      Click To Search 🔍
    </button>
  );
};

ClickToSearch.propTypes = {
  focusInput: PropTypes.func.isRequired,
};

export default ClickToSearch;
