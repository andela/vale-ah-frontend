import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Steps } from 'intro.js-react';
import { Redirect } from 'react-router-dom';
import recipeCreator from '../../../actions/recipe/create-recipes';
import RecipeCreationForm from '../../../components/Recipe/RecipeCreationForm';
import { introSteps } from '../../../utils/recipe-intro';

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
      props: {
        recipeCreation,
        recipeCreation: {
          created,
          recipe: { slug },
        },
      },
      state: { intro },
    } = this;

    if (created) {
      return <Redirect to={`/recipes/${slug}`} />;
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
        />
      </Fragment>
    );
  }
}

CreateRecipe.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
  createNewRecipe: PropTypes.func.isRequired,
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

export default connect(
  mapStateToProps,
  { createNewRecipe: recipeCreator }
)(CreateRecipe);
