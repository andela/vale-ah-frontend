import React, { Component } from 'react';
import { Modal } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Navbar from '../../components/Navbar/Navbar';
import Banner from '../../components/Banner/Banner';
import Register from '../../components/Register/Register';
import Login from '../../components/Login/Login';

/**
 * Homepage
 * @returns {JSX} Homepage
 */
class Home extends Component {
  state = { modalOpened: false };

  /**
   * Opens the modal
   * @returns {undefined}
   */
  openModal = () => {
    this.setState({ modalOpened: true });
  };

  /**
   * Closes the modal
   * @returns {undefined}
   */
  closeModal = () => {
    const { history } = this.props;
    this.setState({ modalOpened: false });
    history.push('/');
  };

  /**
   * render page markup
   * @returns {JSX} Homepage
   */
  render() {
    const {
      closeModal,
      openModal,
      props: {
        match: {
          params: { authType },
        },
      },
      state: { modalOpened },
    } = this;

    return (
      <div className="homepage-wrapper">
        <div className="container">
          <Navbar openModal={openModal} />
          <Banner openModal={openModal} />
          <Modal
            size="mini"
            className="modal"
            centered
            closeIcon
            open={!!authType || modalOpened}
            onClose={closeModal}
          >
            {authType === 'register' ? (
              <Register onClose={closeModal} />
            ) : (
              <Login onClose={closeModal} />
            )}
          </Modal>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      authType: PropTypes.string,
    }).isRequired,
  }).isRequired,
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

export default Home;
