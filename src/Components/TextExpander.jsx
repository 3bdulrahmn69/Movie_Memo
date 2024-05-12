import { useState } from 'react';
import PropTypes from 'prop-types';

const TextExpander = ({
  children,
  collapsedNumWords = 10,
  expandButtonText = 'Show More',
  collapseButtonText = 'Show Less',
  buttonColor = 'blue',
  expanded = false,
  className = '',
}) => {
  const [isExpanded, setIsExpanded] = useState(expanded);

  return (
    <div className={`text-2xl ${className}`}>
      {isExpanded
        ? children + '  '
        : children.split(' ').slice(0, collapsedNumWords).join(' ') + '...  '}
      <button
        style={{
          color: buttonColor,
        }}
        className="cursor-pointer underline"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? collapseButtonText : expandButtonText}
      </button>
    </div>
  );
};

TextExpander.propTypes = {
  children: PropTypes.string.isRequired,
  collapsedNumWords: PropTypes.number,
  expandButtonText: PropTypes.string,
  collapseButtonText: PropTypes.string,
  buttonColor: PropTypes.string,
  expanded: PropTypes.bool,
  className: PropTypes.string,
};

export default TextExpander;
