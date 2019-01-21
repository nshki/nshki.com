import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import { VectorLaptop } from '../VectorLaptop';
import { VectorLamp } from '../VectorLamp';
import {
  Container,
  Vectors,
  Menu,
  MenuList,
  MenuListItem,
  MenuLink,
} from './style';

export const Footer = () => (
  <StaticQuery
    query={graphql`
      query FooterQuery {
        site {
          siteMetadata {
            twitterUrl
            githubUrl
            linkedinUrl
          }
        }
      }
    `}
    render={data => (
      <Container>
        <Menu>
          <MenuList>
            <MenuListItem>
              <MenuLink
                href={data.site.siteMetadata.twitterUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Twitter
              </MenuLink>
            </MenuListItem>
            <MenuListItem>
              <MenuLink
                href={data.site.siteMetadata.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </MenuLink>
            </MenuListItem>
            <MenuListItem>
              <MenuLink
                href={data.site.siteMetadata.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </MenuLink>
            </MenuListItem>
          </MenuList>
        </Menu>

        <Vectors>
          <VectorLaptop />
          <VectorLamp />
        </Vectors>
      </Container>
    )}
  />
);
