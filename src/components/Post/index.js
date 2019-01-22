import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { Container, Title, Misc, Content, Actions } from './style';

const Post = ({ slug, title, date, readingTime, content }) => {
  const singlePost = slug && content;
  const discussUrl = `https://mobile.twitter.com/search?q=${encodeURIComponent(
    `https://nshki.com${slug}`
  )}`;

  return (
    <Container singlePost={singlePost}>
      <Title large={singlePost}>
        {!singlePost ? <Link to={slug}>{title}</Link> : title}
      </Title>

      <Misc>
        {date}
        {readingTime && ` - ${readingTime}`}
      </Misc>

      {content && <Content dangerouslySetInnerHTML={{ __html: content }} />}

      {content && (
        <Actions>
          <a href={discussUrl} target="_blank" rel="noopener noreferrer">
            Discuss on Twitter
          </a>
        </Actions>
      )}
    </Container>
  );
};

Post.propTypes = {
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  readingTime: PropTypes.string,
  content: PropTypes.string,
};

export { Post };
