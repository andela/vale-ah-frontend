import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Steps } from 'intro.js-react';
import { Redirect } from 'react-router-dom';
import {
  create,
  getSingleRecipe,
  updateSingleRecipe,
} from '../../../actions/recipe/recipe-dispatchers';
import RecipeCreationForm from '../../../components/Recipe/RecipeCreationForm';
import { introSteps } from '../../../utils/recipe-intro';
import {
  cloudUpload,
  resetUploader,
} from '../../../actions/upload/upload-dispatchers';

/**
 * Create new Recipe
 * @class CreateRecipe
 * @extends {Component}
 *
 */
class EditRecipe extends Component {
  state = {
    intro: true,
  };

  /**
   * @returns {undefined}
   */
  componentDidMount() {
    const {
      match: {
        params: { id: slug },
      },
      getRecipe,
    } = this.props;
    getRecipe(slug);
  }

  exitIntro = () => {
    this.setState({ intro: false });
  };

  /**
   * Create new recipe
   *@param {object} RecipeData recipe form data
   *@returns {undefined}
   */
  handleCreation = ({
    title,
    ingredients,
    steps,
    cookingTime,
    preparationTime,
    videoList,
  }) => {
    const {
      updateRecipe,
      match: {
        params: { id: slug },
      },
    } = this.props;

    const payload = {
      title,
      ingredients: ingredients.map(({ ingredient }) => ingredient),
      steps: steps.reduce(
        (result, { description, images, videos }, index) => ({
          ...result,
          [index + 1]: { description, images, videos },
        }),
        {}
      ),
      cookingTime,
      preparationTime,
      videoList,
    };

    updateRecipe(payload, slug);
  };

  /**
   * @memberof CreateRecipe
   * @returns {JSX.element} Recipe creation view
   */
  render() {
    const { getUserRecipe } = this.props;
    const {
      exitIntro,
      props: { uploadMedia, resetUploaderState, updatedRecipe },
      state: { intro },
    } = this;

    if (updatedRecipe.created) {
      return <Redirect to={`/recipes/${updatedRecipe.recipe.slug}`} />;
    }

    return (
      <Fragment>
        <Steps
          enabled={intro}
          steps={introSteps}
          initialStep={0}
          onExit={exitIntro}
        />
        <RecipeCreationForm
          recipe={getUserRecipe}
          mode="edit"
          recipeCreation={updatedRecipe}
          handleCreation={this.handleCreation}
          uploadMedia={uploadMedia}
          resetUploaderState={resetUploaderState}
        />
      </Fragment>
    );
  }
}

EditRecipe.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  updatedRecipe: PropTypes.func.isRequired,
  getUserRecipe: PropTypes.shape().isRequired,
  getRecipe: PropTypes.func.isRequired,
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
  updateRecipe: PropTypes.func.isRequired,
  uploadMedia: PropTypes.func.isRequired,
  resetUploaderState: PropTypes.func.isRequired,
  recipeCreation: PropTypes.shape({
    isCreating: PropTypes.bool,
    created: PropTypes.bool,
    recipe: PropTypes.shape(),
    errors: PropTypes.shape(),
  }).isRequired,
};

/**
 * map state to component props
 * @param {State} state redux state
 * @returns {object} state to prop map
 */
const mapStateToProps = state => ({
  recipeCreation: state.recipes.createRecipe,
  getUserRecipe: state.recipes.getRecipe,
  updatedRecipe: state.recipes.updateRecipe,
});

const mapDispatchToProps = {
  createNewRecipe: create,
  uploadMedia: cloudUpload,
  resetUploaderState: resetUploader,
  getRecipe: getSingleRecipe,
  updateRecipe: updateSingleRecipe,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditRecipe);
