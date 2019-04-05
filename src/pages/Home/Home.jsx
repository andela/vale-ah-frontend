import React, { Component } from 'react';
import ReactModal from 'react-modal';
import Signup from '../Signup/Signup';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    width: '600px',
    height: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

ReactModal.setAppElement('#app');

/**
 * @class Signup
 */
export default class Home extends Component {
  /**
   * @constructor
   */
  constructor() {
    super();
    this.state = {
      showModal: false,
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  /**
   * @function handleOpenModal
   * @returns {undefined}
   */
  handleOpenModal() {
    this.setState({ showModal: true });
  }

  /**
   * @function handleCloseModal
   * @returns {undefined}
   */
  handleCloseModal() {
    this.setState({ showModal: false });
  }

  /**
   * @function render
   * @returns {undefined}
   */
  render() {
    const { showModal } = this.state;
    return (
      <div>
        <button type="submit" onClick={this.handleOpenModal}>
          Sign Up
        </button>
        <ReactModal
          isOpen={showModal}
          contentLabel="onRequestClose Example"
          onRequestClose={this.handleCloseModal}
          shouldCloseOnOverlayClick={false}
          style={customStyles}
        >
          <button
            style={{
              float: 'right',
              color: 'red',
              border: 'none',
            }}
            type="submit"
            onClick={this.handleCloseModal}
          >
            X
          </button>
          <Signup />
        </ReactModal>
      </div>
    );
  }
}
