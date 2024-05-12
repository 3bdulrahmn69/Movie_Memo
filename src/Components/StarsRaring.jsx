import PropTypes from 'prop-types';
import { useState } from 'react';

const StarsRaring = ({
  maxRating = 5,
  showMaxRating = false,
  size = 48,
  color = '#e8b923',
  className = '',
  messages = [],
  defaultRating = 0,
  onSetRating = () => {},
}) => {
  const [rating, setRating] = useState(defaultRating);
  const [tempRating, setTempRating] = useState(0);

  const handleRating = (rating) => {
    setRating(rating);
    onSetRating(rating);
  };

  if (defaultRating > maxRating) {
    return (
      <main>
        <p className="text-red-500 text-4xl">
          error: defaultRating should be less than or equal to maxRating
        </p>
      </main>
    );
  }

  return (
    <main>
      <div className={`flex items-center gap-4 ${className}`}>
        <div className="flex">
          {Array.from({ length: maxRating }).map((_, index) => (
            <Stars
              key={index}
              onRate={() => handleRating(index + 1)}
              onHoverIn={() => setTempRating(index + 1)}
              onHoverOut={() => setTempRating(0)}
              full={tempRating ? tempRating >= index + 1 : rating >= index + 1}
              color={color}
              stroke={color}
              size={size}
            />
          ))}
        </div>
        <p
          className="leading-none m-0"
          style={{
            fontSize: `${size / 1.5}px`,
            color: color,
          }}
        >
          {messages.length === maxRating
            ? messages[tempRating ? tempRating - 1 : rating - 1]
            : tempRating
            ? tempRating + (showMaxRating && ' / ' + maxRating)
            : rating <= 0
            ? ''
            : rating + (showMaxRating && ' / ' + maxRating)}
        </p>
      </div>
    </main>
  );
};
StarsRaring.propTypes = {
  maxRating: PropTypes.number,
  showMaxRating: PropTypes.bool,
  size: PropTypes.number,
  color: PropTypes.string,
  className: PropTypes.string,
  messages: PropTypes.array,
  defaultRating: PropTypes.number,
  onSetRating: PropTypes.func,
};

const Stars = ({ onRate, full, onHoverIn, onHoverOut, color, size }) => {
  return (
    <span
      className="block cursor-pointer"
      style={{ width: `${size}px`, height: `${size}px` }}
      role="button"
      onClick={onRate}
      onMouseEnter={onHoverIn}
      onMouseLeave={onHoverOut}
    >
      {full ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill={color}
          stroke={color}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="{2}"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      )}
    </span>
  );
};
Stars.propTypes = {
  onRate: PropTypes.func,
  full: PropTypes.bool,
  onHoverIn: PropTypes.func,
  onHoverOut: PropTypes.func,
  color: PropTypes.string,
  stroke: PropTypes.string,
  size: PropTypes.number,
};

export default StarsRaring;
