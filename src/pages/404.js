import React from 'react';
import { Link } from 'gatsby';
import { Layout } from '../components/Layout';
import { SEO } from '../components/SEO';

const IndexPage = () => (
  <Layout>
    <SEO title="404" />
    <h1>
      Womp, 404. <Link to="/">Go back home</Link>.
    </h1>
  </Layout>
);

export default IndexPage;
