import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'semantic-ui-react';

/**
 * @returns {JSX.Element} ingredient list component
 */
const IngredientList = ({ ingredients = [] }) => {
  return (
    <List className="recipe-ingredients" relaxed>
      <List.Header as="h2">Ingredients</List.Header>
      {ingredients.map((ingredient, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <List.Content key={i} className="ingredient">
          {ingredient}
        </List.Content>
      ))}
    </List>
  );
};

IngredientList.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default IngredientList;
