import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { Container, Title, Misc, Content } from './style';

const Post = ({ slug, title, date, content }) => (
  <Container>
    <Title large={!!content}>
      {slug ? <Link to={slug}>{title}</Link> : title}
    </Title>
    <Misc>{date}</Misc>

    {content && <Content dangerouslySetInnerHTML={{ __html: content }} />}
  </Container>
);

Post.propTypes = {
  slug: PropTypes.string,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  content: PropTypes.string,
};

export { Post };
