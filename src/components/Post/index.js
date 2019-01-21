import React from 'react';
import PropTypes from 'prop-types';
import { Info, Title, Misc, Content } from './style';

const Post = ({ title, date, time, content }) => (
  <>
    <Info>
      <Title>{title}</Title>
      <Misc>{date} - {time}</Misc>
    </Info>

    {content && <Content dangerouslySetInnerHTML={content} />}
  </>
);

Post.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  content: PropTypes.string,
};

export { Post };
