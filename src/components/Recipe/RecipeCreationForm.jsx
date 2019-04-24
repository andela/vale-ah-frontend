import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RecipeStep from './RecipeStep';
import IngredientList from './IngredientList';
import {
  generateKey,
  openFilePicker,
  fileInputChangeHandler,
} from '../../utils/helpers';

/**
 * Render form to create new recipe
 * @class RecipeCreationForm
 */
class RecipeCreationForm extends Component {
  state = {
    title: '',
    ingredients: [],
    steps: [
      {
        images: [],
        videos: [],
        description: '',
        key: generateKey(),
      },
    ],
    videoList: [],
    cookingTime: '',
    preparationTime: '',
  };

  filePickerRef = React.createRef();

  /**
   * @returns {undefined}
   */
  componentDidMount() {
    const filePicker = this.filePickerRef.current;
    filePicker.addEventListener('change', e =>
      fileInputChangeHandler(e, {
        typeFilter: ['video'],
        uploadType: 'recipe_video',
      })
    );

    window.addEventListener(
      'video_upload_complete',
      ({
        detail: {
          mediaInfo: [{ url }],
        },
      }) => {
        this.setState({ videoList: [url] });
      }
    );

    window.addEventListener('step_upload_complete', ({ detail }) => {
      const { syncStepProp } = this;
      detail.mediaInfo.forEach(({ resType, url }) => {
        if (resType === 'image') syncStepProp(url, detail.stepIndex, 'images');
        if (resType === 'video') syncStepProp(url, detail.stepIndex, 'videos');
      });
    });
  }

  /**
   * @param {number} stepInsertionIndex
   * @returns {undefined}
   */
  addNewStep = stepInsertionIndex => {
    const { steps } = this.state;
    const newSteps = [...steps];

    newSteps.splice(stepInsertionIndex + 1, 0, {
      images: [],
      videos: [],
      description: '',
      key: generateKey(),
    });

    this.setState({ steps: newSteps });
  };

  /**
   * @param {Event} e change event
   * @returns {undefined}
   */
  syncField = e => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  /**
   * @param {Array} ingredients updated ingredient list
   * @returns {undefined}
   */
  syncRecipeIngredents = ingredients => {
    this.setState({ ingredients });
  };

  /**
   * @param {*} value field value
   * @param {number} index step index
   * @param {string} prop property to update
   * @returns {undefined}
   */
  syncStepProp = (value, index, prop) => {
    const { steps } = this.state;
    const syncedSteps = [...steps];

    if (['images', 'videos'].includes(prop)) {
      syncedSteps[index][prop].push(value);
    } else syncedSteps[index][prop] = value;
    this.setState({ steps: syncedSteps });
  };

  /**
   * @param {Event} e change event
   * @returns {undefined}
   */
  handleSubmit = e => {
    const { handleCreation } = this.props;
    e.preventDefault();
    handleCreation(this.state);
  };

  /**
   * @param {field}  field
   * @returns {undefined}
   */
  handleError = field => {
    const { recipeCreation } = this.props;
    if (recipeCreation.errors[field]) {
      return recipeCreation.errors[field][0];
    }

    return '';
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
   * @returns {JSX.Element} RecipeCreationForm
   */
  render() {
    const {
      props: { recipeCreation },
      state: {
        cookingTime,
        ingredients,
        preparationTime,
        stepAddHover,
        stepIndex,
        steps,
        title,
        videoList,
      },
    } = this;

    return (
      <form className="recipe-creation-form" onSubmit={this.handleSubmit}>
        <div className="container">
          <div className="recipe-creation-body">
            <h2 className="col-title">Add New Recipe</h2>
            <div className="row recipe-header">
              <div className="input-block">
                <input
                  className="text-field text-field--small no-right-border"
                  name="title"
                  placeholder="Title"
                  onChange={this.syncField}
                  value={title}
                />
                <small className="err-msg">{this.handleError('title')}</small>
              </div>

              <div className="input-block">
                <input
                  type="number"
                  className="text-field text-field--small no-right-border"
                  name="preparationTime"
                  onChange={this.syncField}
                  placeholder="Preparation time in mins"
                  value={preparationTime}
                />
                <small className="err-msg">
                  {this.handleError('preparationTime')}
                </small>
              </div>
              <div className="input-block">
                <input
                  type="number"
                  className="text-field text-field--small no-right-border"
                  name="cookingTime"
                  onChange={this.syncField}
                  placeholder="Cooking time in mins"
                  value={cookingTime}
                />
                <small className="err-msg">
                  {this.handleError('cookingTime')}
                </small>
              </div>
            </div>
            <div className="row">
              <div className="column">
                <IngredientList
                  ingredients={ingredients}
                  syncRecipeIngredents={this.syncRecipeIngredents}
                  errorHandler={() => this.handleError('ingredients')}
                />
              </div>
              <div className="column middle">
                <div className="ingredient-content">
                  <p className="col-title">Steps</p>
                  {steps.map(({ description, images, key }, index) => (
                    <div key={key} className="ingredient-image-container">
                      <RecipeStep
                        stepNumber={index + 1}
                        stepIndex={stepIndex}
                        index={index}
                        addState={stepAddHover}
                        images={images}
                        addNewStep={() => this.addNewStep(index)}
                        syncStepProp={this.syncStepProp}
                        description={description}
                      />
                      <small className="err-msg">
                        {this.handleError('step')}
                      </small>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <div className="video-section">
                <p className="col-title">Videos</p>
                <div className="video-content">
                  {steps.map(({ videos, key }, index) =>
                    videos.length ? (
                      <div key={key} className="video-widget">
                        <p className="step">Step {index + 1}</p>
                        <video
                          width="320"
                          height="240"
                          controls
                          src={videos[0]}
                        >
                          <track kind="captions" />
                        </video>
                      </div>
                    ) : null
                  )}
                  {videoList.length > 0 && (
                    <div className="video-widget">
                      <p className="step">Full video</p>
                      <video
                        className="full-video"
                        width="400"
                        height="240"
                        controls
                        src={videoList[0]}
                      >
                        <track kind="captions" />
                      </video>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <button type="submit" className="btn-primary">
            {recipeCreation.pending ? (
              <div className="spinner" />
            ) : (
              'Submit Recipe'
            )}
          </button>
          <button
            type="button"
            className="btn-secondary"
            onClick={this.openFilePicker}
          >
            Add Full Video <i className="fas fa-video" />
            <input type="file" ref={this.filePickerRef} hidden />
          </button>
        </div>
        {recipeCreation.pending && (
          <div className="loading-overlay">
            <div className="spinner" />
          </div>
        )}
      </form>
    );
  }
}

RecipeCreationForm.propTypes = {
  recipeCreation: PropTypes.shape({
    penidng: PropTypes.bool,
    created: PropTypes.bool,
    recipe: PropTypes.shape(),
    errors: PropTypes.shape(),
  }).isRequired,
  handleCreation: PropTypes.func.isRequired,
};

export default RecipeCreationForm;
