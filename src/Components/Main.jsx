import PropTypes from 'prop-types';

const Main = ({ children }) => {
  return <main className="main overflow-hidden">{children}</main>;
};

Main.propTypes = {
  children: PropTypes.node,
};

export default Main;
