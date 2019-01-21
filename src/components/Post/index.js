import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { Container, Title, Misc, Content } from './style';

const Post = ({ title, date, content }) => (
  <Container>
    <Title large={!!content}>
      <Link to="/">{title}</Link>
    </Title>
    <Misc>{date}</Misc>

    {content && <Content dangerouslySetInnerHTML={{ __html: content }} />}
  </Container>
);

Post.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  content: PropTypes.string,
};

export { Post };
