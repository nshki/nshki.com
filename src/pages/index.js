import React from 'react';
import { graphql } from 'gatsby';
import { Layout } from '../components/Layout';
import { SEO } from '../components/SEO';
import { Post } from '../components/Post';

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Personal blog of a software engineer" />
    {data.allMarkdownRemark.edges.map(({ node }) => (
      <Post
        key={node.fields.slug}
        slug={node.fields.slug}
        title={node.frontmatter.title}
        date={node.frontmatter.date}
      />
    ))}
  </Layout>
);

export default IndexPage;

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
          }
        }
      }
    }
  }
`;
