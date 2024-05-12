import PropTypes from 'prop-types';

const CloseBtn = ({ func }) => {
  return (
    <button
      className="bg-red-500 absolute top-0 left-0 p-1 text-white text-xl hover:bg-red-600 transition-colors duration-300 rounded-br-lg"
      onClick={() => func(false)}
    >
      X
    </button>
  );
};

CloseBtn.propTypes = {
  func: PropTypes.func,
};

export default CloseBtn;
