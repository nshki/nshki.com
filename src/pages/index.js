import React from 'react';
import { LayoutMain } from '../components/LayoutMain';
import { Post } from '../components/Post';

const IndexPage = () => (
  <LayoutMain>
    <Post
      title="Hello World"
      date="November 18, 2011"
      time="7 min read"
    />
    <Post
      title="Switching from a Mac to a Chromebook (as a web developer)"
      date="November 18, 2011"
      time="7 min read"
    />
  </LayoutMain>
);

export default IndexPage;
