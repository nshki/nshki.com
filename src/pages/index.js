import React from 'react';
import { Layout } from '../components/Layout';
import { Post } from '../components/Post';

const IndexPage = () => (
  <Layout>
    <Post title="Hello World" date="November 18, 2011" />
    <Post
      title="Switching from a Mac to a Chromebook (as a web developer)"
      date="November 18, 2011"
    />
  </Layout>
);

export default IndexPage;
