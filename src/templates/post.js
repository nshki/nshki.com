import React from 'react';
import { graphql } from 'gatsby';
import { Layout } from '../components/Layout';
import { Post } from '../components/Post';

const PostTemplate = ({ data, pageContext }) => {
  const post = data.markdownRemark;
  const { previous, next } = pageContext;

  return (
    <Layout>
      <Post
        title={post.frontmatter.title}
        date={post.frontmatter.date}
        content={post.html}
      />
    </Layout>
  );
};

export default PostTemplate;

export const postQuery = graphql`
  query PostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`;
