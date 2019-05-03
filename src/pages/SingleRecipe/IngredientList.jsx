import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { List, Segment, Header, Label } from 'semantic-ui-react';

/**
 * @returns {JSX.Element} ingredient list component
 */
const IngredientList = ({ ingredients = [] }) => {
  return (
    <Fragment>
      <Header as={Segment} inverted>
        Ingredients
      </Header>
      <List className="recipe-ingredients" horizontal relaxed>
        {ingredients.map((ingredient, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <List.Item key={i}>
            <List.Content as={Label} className="ingredient">
              {ingredient}
            </List.Content>
          </List.Item>
        ))}
      </List>
    </Fragment>
  );
};

IngredientList.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default IngredientList;
