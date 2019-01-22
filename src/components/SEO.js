import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';

const SEO = ({
  title = null,
  description = null,
  pathname = null,
  article = false,
}) => (
  <StaticQuery
    query={graphql`
      query SEOQuery {
        site {
          siteMetadata {
            defaultTitle: title
            defaultDescription: description
            siteUrl
          }
        }
      }
    `}
    render={({
      site: {
        siteMetadata: { defaultTitle, defaultDescription, siteUrl },
      },
    }) => {
      const seo = {
        title: title || defaultTitle,
        description: description || defaultDescription,
        url: `${siteUrl}${pathname || '/'}`,
      };

      return (
        <Helmet title={seo.title} titleTemplate={`%s - ${defaultTitle}`}>
          <link rel="icon" href="/favicon.png" />
          {seo.url && <meta property="og:url" content={seo.url} />}
          {seo.description && (
            <meta name="description" content={seo.description} />
          )}
          {(article ? true : null) && (
            <meta property="og:type" content="article" />
          )}
          {seo.title && <meta property="og:title" content={seo.title} />}
          {seo.description && (
            <meta property="og:description" content={seo.description} />
          )}
          {seo.title && <meta name="twitter:title" content={seo.title} />}
          {seo.description && (
            <meta name="twitter:description" content={seo.description} />
          )}
        </Helmet>
      );
    }}
  />
);

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  pathname: PropTypes.string,
  article: PropTypes.bool,
};

export { SEO };
