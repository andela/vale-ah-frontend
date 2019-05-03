import React from 'react';
import PropTypes from 'prop-types';
import { Image, Header } from 'semantic-ui-react';
import placeholderImage from '../../../public/images/placeholder.png';

/**
 * @returns {JSX.Element} recipe banner component
 */
const RecipeBanner = ({ image, title }) => {
  return (
    <div className="recipe-banner">
      <Image
        src={image || placeholderImage}
        fluid
        className="recipe-banner-image"
      />
      <Header as="h1">{title}</Header>
    </div>
  );
};

RecipeBanner.defaultProps = {
  image: placeholderImage,
};

RecipeBanner.propTypes = {
  image: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  title: PropTypes.string.isRequired,
};

export default RecipeBanner;
