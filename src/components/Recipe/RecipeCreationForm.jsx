/* eslint-disable react/no-did-update-set-state */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RecipeStep from './RecipeStep';
import IngredientList from './IngredientList';
import {
  generateKey,
  openFilePicker,
  preUploadAggregator,
  handleMessages,
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
    uploadResponse: null,
  };

  filePickerRef = React.createRef();

  uploadOptions = {
    typeFilter: ['video'],
    uploadType: 'recipe_video',
  };

  /**
   * @returns {undefined}
   */
  componentDidUpdate() {
    const { upload, resetUploaderState } = this.props;
    const { uploadResponse } = this.state;

    if (upload.success)
      this.setState({ uploadResponse: upload.response }, () =>
        resetUploaderState()
      );

    if (uploadResponse) {
      const {
        uploadResponse: { mediaInfo, stepIndex, uploadType },
      } = this.state;

      if (uploadType === 'recipe_video') {
        const [{ url }] = mediaInfo;
        this.setRecipeVideo(url);
      }

      if (uploadType === 'recipe_step') {
        this.updateStepMedia(mediaInfo, stepIndex);
      }
      this.setState({ uploadResponse: null });
    }
  }

  /**
   * @param {string} url videoUrl
   * @returns {undefined}
   */
  setRecipeVideo = url => {
    const { videoList } = this.state;
    if (!videoList.length) {
      this.setState({ videoList: [url] });
    }
  };

  /**
   * @param {object} mediaInfo
   * @param {number} stepIndex
   * @returns {undefined}
   */
  updateStepMedia = (mediaInfo, stepIndex) => {
    const resShape = { images: [], videos: [], stepIndex };

    const update = mediaInfo.reduce((result, { resType, url }) => {
      const { images, videos } = result;

      if (resType === 'image') return { videos, images: [...images, url] };
      if (resType === 'video') return { images, videos: [...videos, url] };
      return result;
    }, resShape);

    this.syncStepProp(update, stepIndex, 'stepMedia');
  };

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

    if (prop === 'stepMedia') {
      const { images, videos } = syncedSteps[index];

      if (value.images.length)
        syncedSteps[index].images = [...images, ...value.images];
      if (value.videos.length)
        syncedSteps[index].videos = [...videos, ...value.videos];

      this.setState({ steps: syncedSteps });
    }

    syncedSteps[index][prop] = value;
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
   * @param {Event} e change event
   * @param {object} options
   * @returns {undefined}
   */
  handleSelectedFiles = (e, options = this.uploadOptions) => {
    const { uploadMedia } = this.props;
    const { files } = e.target;

    const { uploadPayload, errors } = preUploadAggregator(files, options);

    if (errors.length) {
      handleMessages(errors, 'error');
    }

    uploadMedia(uploadPayload);
  };

  /**
   *
   * @param {index} stepRemovalIndex
   * @returns {object} filtered ingredients
   * @memberof RecipeCreationForm
   */
  removeStep = stepRemovalIndex => {
    const { steps } = this.state;
    const newSteps = [...steps];

    if (newSteps.length > 1) {
      newSteps.splice(stepRemovalIndex, 1);
      this.setState({ steps: newSteps });
    }
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
                        index={index}
                        images={images}
                        description={description}
                        handleSelectedFiles={this.handleSelectedFiles}
                        syncStepProp={this.syncStepProp}
                        addNewStep={() => this.addNewStep(index)}
                        removeStep={() => this.removeStep(index)}
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
                <div className="col-title">
                  Videos{' '}
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={this.openFilePicker}
                  >
                    Add Full Video <i className="fas fa-video" />
                    <input
                      type="file"
                      onChange={this.handleSelectedFiles}
                      ref={this.filePickerRef}
                      hidden
                    />
                  </button>
                </div>
                <div className="video-content">
                  {steps.map(({ videos, key }, index) =>
                    videos.length ? (
                      <div key={key} className="video-widget">
                        <p className="step">Step {index + 1}</p>
                        <video controls src={videos[0]} className="step-video">
                          <track kind="captions" />
                        </video>
                      </div>
                    ) : null
                  )}
                  {videoList.length > 0 && (
                    <div className="video-widget">
                      <p className="step">Full video</p>
                      <video className="full-video" controls src={videoList[0]}>
                        <track kind="captions" />
                      </video>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div>
            <button type="submit" className="btn-primary">
              {recipeCreation.pending ? (
                <div className="spinner" />
              ) : (
                'Submit Recipe'
              )}
            </button>
          </div>
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
  handleCreation: PropTypes.func.isRequired,
  uploadMedia: PropTypes.func.isRequired,
  resetUploaderState: PropTypes.func.isRequired,
  recipeCreation: PropTypes.shape({
    penidng: PropTypes.bool,
    created: PropTypes.bool,
    recipe: PropTypes.shape(),
    errors: PropTypes.shape(),
  }).isRequired,
  upload: PropTypes.shape({
    response: PropTypes.shape({
      mediaInfo: PropTypes.arrayOf(PropTypes.object),
      stepIndex: PropTypes.number,
      uploadType: PropTypes.string,
    }),
    isLoading: PropTypes.bool,
    success: PropTypes.bool,
  }).isRequired,
};

/**
 * map state to component props
 * @param {State} state redux state
 * @returns {object} state to prop map
 */
const mapStateToProps = state => ({
  upload: state.upload,
});

export default connect(mapStateToProps)(RecipeCreationForm);
