/* eslint-disable react/jsx-wrap-multilines */
import React from 'react';
import PropTypes from 'prop-types';
import { List, Image, Segment } from 'semantic-ui-react';

/**
 * @returns {JSX.Element} StepList component
 */
const StepList = ({ steps = {} }) => {
  return (
    <List className="recipe-steps" relaxed>
      <List.Header as={Segment} inverted>
        Steps
      </List.Header>
      {Object.keys(steps).map((step, i) => {
        const s = steps[step];
        return (
          // eslint-disable-next-line react/no-array-index-key
          <List.Item key={i}>
            <div className="step">
              <List.Description>
                <span className="steps-number">{i + 1}</span> {s.description}
              </List.Description>
              <List.Content>
                <Image size="medium" src={s.images[0]} />
              </List.Content>
            </div>
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
