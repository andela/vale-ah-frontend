import React from 'react';
import { Icon, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';

/**
 *
 * @returns {JSX.Element} Recipe metadata component
 */
const Metadata = ({ prepTime, cookTime }) => {
  return (
    <div className="recipe-meta">
      <Label as="a" color="blue">
        <Icon name="time" />
        Preparation Time
        <Label.Detail>{prepTime} minutes</Label.Detail>
      </Label>
      <Label as="a" color="green">
        <Icon name="stopwatch" />
        Cooking Time
        <Label.Detail>{cookTime} minutes</Label.Detail>
      </Label>
    </div>
  );
};

Metadata.propTypes = {
  prepTime: PropTypes.number.isRequired,
  cookTime: PropTypes.number.isRequired,
};

export default Metadata;
