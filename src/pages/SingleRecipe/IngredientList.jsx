import React from 'react';
import PropTypes from 'prop-types';
import { List, Segment } from 'semantic-ui-react';

/**
 * @returns {JSX.Element} ingredient list component
 */
const IngredientList = ({ ingredients = [] }) => {
  return (
    <List className="recipe-ingredients" relaxed>
      <List.Header as={Segment} inverted>
        Ingredients
      </List.Header>
      {ingredients.map((ingredient, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <List.Item key={i}>
          <List.Content className="ingredient">
            <strong>{i + 1}.</strong> {ingredient}
          </List.Content>
        </List.Item>
      ))}
    </List>
  );
};

IngredientList.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default IngredientList;
