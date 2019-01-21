import React from 'react';
import PropTypes from 'prop-types';
import { Info, Title, Misc, Content } from './style';

const Post = ({ title, date, content }) => (
  <>
    <Info>
      <Title>{title}</Title>
      <Misc>{date}</Misc>
    </Info>

    {content && <Content dangerouslySetInnerHTML={{ __html: content }} />}
  </>
);

Post.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  content: PropTypes.string,
};

export { Post };
