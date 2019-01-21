import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import { Container, Title, Slogan } from './style';
import { VectorLogo } from '../VectorLogo';

export const Header = () => (
  <StaticQuery
    query={graphql`
      query HeaderQuery {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `}
    render={data => (
      <Container>
        <div>
          <Title>{data.site.siteMetadata.title}</Title>
          <Slogan>{data.site.siteMetadata.description}</Slogan>
        </div>

        <VectorLogo />
      </Container>
    )}
  />
);
