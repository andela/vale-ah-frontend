import React from 'react';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

/**
 *
 * @param {object} props
 * @return { JSX.Element } Button
 */
const DummyPage = () => {
  const slug = 'dolorem-eius-omnis-d-13153b7f';
  return (
    <div>
      <Button
        as={Link}
        to={{
          pathname: `/recipes/edit-recipe/${slug}`,
        }}
      >
        Edit
      </Button>
    </div>
  );
};

export default DummyPage;
