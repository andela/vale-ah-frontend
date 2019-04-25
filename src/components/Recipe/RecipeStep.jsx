import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { openFilePicker } from '../../utils/helpers';

import ImageWidget from './ImageWidget';

/**
 *
 * @class RecipeStep
 */
class RecipeStep extends Component {
  state = { addHover: false };

  stepDescriptionRef = React.createRef();

  filePickerRef = React.createRef();

  // /**
  //  * @returns {undefined}
  //  */
  // componentDidMount() {
  //   const { index } = this.props;
  //   const filePicker = this.filePickerRef.current;

  //   filePicker.addEventListener('change', e =>
  //     fileInputChangeHandler(e, {
  //       stepIndex: index,
  //       typeFilter: ['image', 'video'],
  //       uploadType: 'recipe_step',
  //     })
  //   );
  // }

  /**
   * @param {Event} e
   * @returns {undefined}
   */
  handleDescriptionChange = e => {
    const { syncStepProp, index } = this.props;

    syncStepProp(e.target.value, index, 'description');
  };

  /**
   * Toggle step
   * @returns {undefined}
   */
  toggleAddHover = () => {
    const { addHover } = this.state;

    this.setState({ addHover: !addHover });
  };

  /**
   * append new step Block to DOM
   * @param {Event} e
   * @returns {undefined}
   */
  spawnStep = e => {
    const { addNewStep } = this.props;
    if (
      this.stepDescriptionRef.current.value.trim() === '' ||
      (e.keyCode && e.keyCode !== 13)
    )
      return;

    addNewStep();
  };

  /**
   * open file picker
   * @param {Event} e
   * @returns {undefined}
   */
  openFilePicker = e => {
    openFilePicker(e, this.filePickerRef);
  };

  /**
   * @returns {JSX.Element} Recipe step component
   */
  render() {
    const {
      props: { description, images, stepNumber, handleRemoval },
      state: { addHover },
    } = this;
    return (
      <Fragment>
        <div className="ingredient-section">
          <input type="file" ref={this.filePickerRef} multiple hidden />
          <div className="step-description">
            <small className="step-number">Step {stepNumber}</small>
            <textarea
              rows={3}
              ref={this.stepDescriptionRef}
              className="text-field text-field--large description-field"
              placeholder="Add a new preparation step"
              onChange={this.handleDescriptionChange}
              value={description}
            />
            <div className="step-icon-holder">
              <i
                className="fas fa-image icon-main"
                title="add photos/videos"
                onClick={this.openFilePicker}
                onKeyDown={this.openFilePicker}
                role="button"
                tabIndex={0}
              />
              <i
                className="fas fa-minus icon-main"
                title="add photos/videos"
                onClick={handleRemoval}
                onKeyDown={handleRemoval}
                role="button"
                tabIndex={0}
              />
            </div>
          </div>
          <div className="add-step">
            {!addHover ? (
              <p className="add-step-input-line">&nbsp;</p>
            ) : (
              <p className="add-step-input">Add Step</p>
            )}
            <i
              className="fas fa-plus add-icon"
              onMouseEnter={this.toggleAddHover}
              onMouseLeave={this.toggleAddHover}
              onClick={this.spawnStep}
              onKeyDown={this.spawnStep}
              role="button"
              title="Fill the text input before adding a new step"
              tabIndex="0"
            />
          </div>
        </div>
        <ImageWidget images={images} className="image-widget" />
      </Fragment>
    );
  }
}

RecipeStep.propTypes = {
  addNewStep: PropTypes.func.isRequired,
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  index: PropTypes.number.isRequired,
  stepNumber: PropTypes.number.isRequired,
  syncStepProp: PropTypes.func.isRequired,
  description: PropTypes.string.isRequired,
  handleRemoval: PropTypes.func.isRequired,
};

export default RecipeStep;
