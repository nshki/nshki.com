import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { Container, Prev, Next } from './style';

const PrevNext = ({ previous, next }) => (
  <Container>
    {next && (
      <Next>
        <Link to={next.fields.slug}>
          <em>Newer</em>: {next.frontmatter.title}
        </Link>
      </Next>
    )}
    {previous && (
      <Prev>
        <Link to={previous.fields.slug}>
          <em>Older</em>: {previous.frontmatter.title}
        </Link>
      </Prev>
    )}
  </Container>
);

PrevNext.propTypes = {
  previous: PropTypes.shape({
    fields: {
      slug: 'string.isRequired',
    },
    frontmatter: {
      title: 'string.isRequired',
    },
  }),
  next: PropTypes.shape({
    fields: {
      slug: 'string.isRequired',
    },
    frontmatter: {
      title: 'string.isRequired',
    },
  }),
};

export { PrevNext };
