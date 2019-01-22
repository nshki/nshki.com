import React from 'react';
import { graphql } from 'gatsby';
import { Layout } from '../components/Layout';
import { SEO } from '../components/SEO';
import { Post } from '../components/Post';
import { PrevNext } from '../components/PrevNext';

const PostTemplate = ({ data, pageContext }) => {
  const post = data.markdownRemark;
  const { previous, next } = pageContext;

  return (
    <Layout>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.summary}
        pathname={post.fields.slug}
      />
      <Post
        slug={post.fields.slug}
        title={post.frontmatter.title}
        date={post.frontmatter.date}
        readingTime={post.fields.readingTime.text}
        content={post.html}
      />
      <PrevNext previous={previous} next={next} />
    </Layout>
  );
};

export default PostTemplate;

export const postQuery = graphql`
  query PostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      fields {
        slug
        readingTime {
          text
        }
      }
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        summary
      }
    }
  }
`;
