import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';

/**
 * @returns {JSX.Element} Banner
 */
const Banner = ({ openModal, signIn }) => (
  <div className="banner">
    <div className="info-container">
      <div className="text">
        <h1 className="main">
          <span className="brand-highlight">
            Naija
            <br />
            Chop
          </span>
          Chop
        </h1>
        <p className="sub">where the best cooks meet </p>
      </div>

      <Button
        as={Link}
        onClick={openModal}
        className="link"
        size="large"
        to={signIn.isLoggedIn ? '/recipes/create' : '/register'}
      >
        Add a recipe
      </Button>
    </div>
  </div>
);

Banner.propTypes = {
  openModal: PropTypes.func.isRequired,
  signIn: PropTypes.shape({ isLoggedIn: PropTypes.bool }).isRequired,
};

export default connect(state => ({
  signIn: state.auth,
}))(Banner);
