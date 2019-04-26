/* eslint-disable react/jsx-wrap-multilines */
import React from 'react';
import PropTypes from 'prop-types';
import { List, Image } from 'semantic-ui-react';

/**
 * @returns {JSX.Element} StepList component
 */
const StepList = ({ steps = {} }) => {
  return (
    <List ordered className="recipe-steps" relaxed>
      <List.Header as="h2">Steps</List.Header>
      {Object.keys(steps).map((step, i) => {
        const s = steps[step];
        return (
          // eslint-disable-next-line react/no-array-index-key
          <List.Item key={i} className="step">
            <List.Description>{s.description}</List.Description>
            <List.Content>
              <Image size="large" src={s.images[0]} />
            </List.Content>
          </List.Item>
        );
      })}
    </List>
  );
};

StepList.propTypes = {
  steps: PropTypes.objectOf(
    PropTypes.shape({
      images: PropTypes.arrayOf(PropTypes.string),
      description: PropTypes.string,
    })
  ).isRequired,
};

export default StepList;
