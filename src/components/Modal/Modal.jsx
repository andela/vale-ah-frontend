import React from 'react';
import ReactModal from 'react-modal';
import { Switch, Route, Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Button from '../Button/Button';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '414px',
    padding: 0,
  },
};

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
ReactModal.setAppElement('#app');

/**
 * Modal component
 */
class Modal extends React.Component {
  /**
   * @constructor
   */
  constructor() {
    super();

    // const { match } = this.props;
    // this.state = { modalIsOpen: !!match.params.authType };
    this.state = { modalIsOpen: true };

    this.openModal = this.openModal.bind(this);
    // this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  /**
   * Opens the modal
   * @returns {undefined}
   */
  openModal() {
    this.setState({ modalIsOpen: true });
  }

  /**
   * Closes the modal
   * @returns {undefined}
   */
  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  /**
   * Renders the modal
   * @returns {JSX.Element} the Modal element
   */
  render() {
    const { modalIsOpen } = this.state;
    return (
      <div>
        <Button color="green" onClick={this.openModal}>
          <Link to="/register">Open modal</Link>
        </Button>
        <Link to="/register" onClick={this.openModal}>
          Register
        </Link>
        <ReactModal
          isOpen={modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
        >
          <Switch>
            <Route
              path="/register"
              render={() => <Register onClose={this.closeModal} />}
              exact
            />
            <Route
              path="/login"
              render={() => <Login onClose={this.closeModal} />}
              exact
            />
          </Switch>
        </ReactModal>
      </div>
    );
  }
}

Modal.propTypes = {
  match: PropTypes.shape({
    params: {
      authType: PropTypes.string,
    },
  }).isRequired,
};

export default withRouter(Modal);
