import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Menu, Image, Button, Icon, Responsive } from 'semantic-ui-react';
import { logoutUser } from '../../actions/auth/auth-dispatchers';
import brand from '../../../public/images/brand.png';

/**
 *@returns {JSX} Navbar component
 */
const Navbar = ({ signIn, logout, openModal }) => (
  <nav className="navbar">
    <Menu secondary>
      <Menu.Item className="navbar-brand">
        <Image src={brand} size="mini" spaced="right" className="navbar-logo" />
        <span className="navbar-brand-highlight">Naija Chop</span>Chop
      </Menu.Item>
      <Menu.Menu position="right">
        <Responsive minWidth={Responsive.onlyTablet.minWidth} as={Menu.Item}>
          <Menu.Item name="About" className="navbar-action" />
          <Menu.Item className="navbar-action">
            <Button
              color="green"
              as={Link}
              onClick={openModal}
              className="link"
              to={!signIn.isLoggedIn ? '/register' : '/recipes/create'}
            >
              <Icon name="plus" />
              Add a Recipe
            </Button>
          </Menu.Item>
          {signIn.isLoggedIn && (
            <Menu.Item
              name="logout"
              onClick={logout}
              className="navbar-action logout"
            />
          )}
        </Responsive>
        <Responsive maxWidth={Responsive.onlyTablet.minWidth} as={Menu.Item}>
          <Button icon="bars" inverted className="navbar-humbugger" />
        </Responsive>
      </Menu.Menu>
    </Menu>
  </nav>
);

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
  signIn: PropTypes.shape({ isLoggedIn: PropTypes.bool }).isRequired,
};

export default connect(
  state => ({ signIn: state.auth }),
  { logout: logoutUser }
)(Navbar);
