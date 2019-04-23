import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { openFilePicker } from '../../utils/helpers';
import ImageWidget from './ImageWidget';

/**
 *
 * @class RecipeStep
 */
class  RecipeStep extends Component {
  state = { addHover: false };

  filePickerRef = React.createRef();

  /**
   * @returns {object} media upload options
   */
  get uploadOptions() {
    const { index } = this.props;

    return {
      stepIndex: index,
      typeFilter: ['image', 'video'],
      uploadType: 'recipe_step',
    };
  }

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
    const { addNewStep, description } = this.props;

    if (description.trim() === '' || (e.keyCode && e.keyCode !== 13)) return;

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
   * open file picker
   * @param {Event} e
   * @returns {undefined}
   */
  filePickerOnchange = e => {
    const { handleSelectedFiles } = this.props;

    handleSelectedFiles(e, this.uploadOptions);
  };

  /**
   * @returns {JSX.Element} Recipe step component
   */
  render() {
    const {
      props: { description, images, stepNumber, removeStep },
      state: { addHover },
    } = this;

    return (
      <Fragment>
        <div className="ingredient-section">
          <input
            type="file"
            ref={this.filePickerRef}
            onChange={this.filePickerOnchange}
            multiple
            hidden
          />
          <div className="step-description">
            <small className="step-number">Step {stepNumber}</small>
            <textarea
              rows={3}
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
                onClick={removeStep}
                onKeyDown={removeStep}
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
  removeStep: PropTypes.func.isRequired,
  handleSelectedFiles: PropTypes.func.isRequired,
};

export default RecipeStep;
