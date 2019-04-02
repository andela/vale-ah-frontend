import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './fetchRecipe.scss';
/**
 * @description - renders the recipes
 * @param {object} props
 * @returns {jsx} - returns all the recipes if found
 */
const FetchRecipes = ({ recipes }) => (
  <div>
    {recipes.map(recipe => (
      <div key={recipe.id}>
        <h4>{recipe.title}</h4>
        <p>{recipe.body}</p>
      </div>
    ))}
  </div>
);

FetchRecipes.propTypes = {
  recipes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      body: PropTypes.string,
    })
  ).isRequired,
};

/**
 * @description - maps the state to prop
 * @param {object} state
 * @returns {state} - state
 */
const mapStateToProps = state => ({
  recipes: state.recipes.recipes,
});

export default connect(mapStateToProps)(FetchRecipes);
