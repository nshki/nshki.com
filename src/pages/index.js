import React from 'react';
import { graphql } from 'gatsby';
import { Layout } from '../components/Layout';
import { SEO } from '../components/SEO';
import { Post } from '../components/Post';

const IndexPage = ({ data }) => (
  <Layout>
    <SEO />
    {data.allMarkdownRemark.edges.map(({ node }) => (
      <Post
        key={node.fields.slug}
        slug={node.fields.slug}
        title={node.frontmatter.title}
        date={node.frontmatter.date}
        readingTime={node.fields.readingTime.text}
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
            readingTime {
              text
            }
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
