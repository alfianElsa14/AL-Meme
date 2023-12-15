import PropTypes from 'prop-types';
import classNames from 'classnames';

import classes from './style.module.scss';

const Loader = ({ isLoading }) => (
  <div
    data-testid="Loading"
    className={classNames({
      [classes.loaderComponent]: true,
      [classes.showLoader]: isLoading || false,
    })}
  >
    <img src="https://media.istockphoto.com/id/1189776281/id/vektor/kepala-kucing-mengenakan-kacamata-berwarna-warni-pada-vektor-kucing-keren-dan-funky.jpg?s=1024x1024&w=is&k=20&c=TI0NQxx1_4YIn015VMAl5XdnScpKkPfcXDl5dlMvRM4=" alt="Loading" />
  </div>
);

Loader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};
export default Loader;
