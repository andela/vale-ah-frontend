import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Image, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { getRecipeImage } from '../../utils/helpers';
import placeholderImage from '../../../public/images/placeholder.png';

/**
 * @returns {JSX.Element} RecipeList component
 * @param {object} props
 */
const RecipeList = ({ recipes }) => {
  return (
    <div className="recipe-list">
      {recipes.map(_ => (
        <Card key={_.id} as={Link} to={`/recipes/${_.slug}`}>
          <Image src={getRecipeImage(_.steps) || placeholderImage} />
          <Card.Content>
            <Card.Header>{_.title}</Card.Header>
          </Card.Content>
          <Card.Content extra>
            <span>
              <Icon name="stopwatch" />
              {_.preparationTime} mins
            </span>
            <span>
              <Icon name="time" />
              {_.cookingTime} mins
            </span>
          </Card.Content>
        </Card>
      ))}
    </div>
  );
};

RecipeList.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default RecipeList;
