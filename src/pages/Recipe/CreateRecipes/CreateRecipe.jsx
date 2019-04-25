import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Steps } from 'intro.js-react';
import { Redirect } from 'react-router-dom';
import { create } from '../../../actions/recipe/recipe-dispatchers';
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
class CreateRecipe extends Component {
  state = {
    intro: true,
  };

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
    const { createNewRecipe } = this.props;

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

    createNewRecipe(payload);
  };

  /**
   * @memberof CreateRecipe
   * @returns {JSX.element} Recipe creation view
   */
  render() {
    const {
      exitIntro,
      props: { uploadMedia, recipeCreation, resetUploaderState },
      state: { intro },
    } = this;

    if (recipeCreation.created) {
      return <Redirect to={`/recipes/${recipeCreation.recipe.slug}`} />;
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
          recipeCreation={recipeCreation}
          handleCreation={this.handleCreation}
          resetUploaderState={resetUploaderState}
          uploadMedia={uploadMedia}
        />
      </Fragment>
    );
  }
}

CreateRecipe.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
  createNewRecipe: PropTypes.func.isRequired,
  resetUploaderState: PropTypes.func.isRequired,
  uploadMedia: PropTypes.func.isRequired,
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
});

const mapDispatchToProps = {
  createNewRecipe: create,
  uploadMedia: cloudUpload,
  resetUploaderState: resetUploader,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateRecipe);
