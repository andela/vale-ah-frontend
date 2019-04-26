import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Placeholder } from 'semantic-ui-react';
import Metadata from './Metadata';
import IngredientList from './IngredientList';
import StepList from './StepList';
import RecipeBanner from './RecipeBanner';
import { getRecipeImage } from '../../utils/helpers';
import { getSingleRecipe } from '../../actions/recipe/recipe-actions';

/**
 * @returns {JSX.Element} single recipe component
 */
const SingleRecipe = ({ recipe, fetchRecipe, match }) => {
  useEffect(() => {
    fetchRecipe(match.params.slug);
  }, []);
  return (
    <Container className="recipe">
      <RecipeBanner
        title={
          recipe.title || (
            <Placeholder>
              <Placeholder.Header>
                <Placeholder.Line />
              </Placeholder.Header>
            </Placeholder>
          )
        }
        image={getRecipeImage(recipe.steps)}
      />
      <Metadata
        prepTime={recipe.preparationTime}
        cookTime={recipe.cookingTime}
      />
      <IngredientList ingredients={recipe.ingredients} />
      <StepList steps={recipe.steps} />
    </Container>
  );
};

SingleRecipe.propTypes = {
  recipe: PropTypes.shape({
    title: PropTypes.string.isRequired,
    preparationTime: PropTypes.number.isRequired,
    cookingTime: PropTypes.number.isRequired,
    ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
    steps: PropTypes.objectOf(
      PropTypes.shape({
        images: PropTypes.arrayOf(PropTypes.string),
        description: PropTypes.string,
      })
    ).isRequired,
  }).isRequired,
  fetchRecipe: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
};

/**
 * @returns {object} new prop
 * @param {object} state
 */
const mapStateToProps = state => ({ recipe: state.recipe });

export default connect(
  mapStateToProps,
  { fetchRecipe: getSingleRecipe }
)(withRouter(SingleRecipe));
