import React from 'react';
import { Link } from 'gatsby';
import { Layout } from '../components/Layout';

const IndexPage = () => (
  <Layout>
    <h1>
      Womp, 404. <Link to="/">Go back home</Link>.
    </h1>
  </Layout>
);

export default IndexPage;
