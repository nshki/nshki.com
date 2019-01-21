import React from 'react';
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
  <Container>
    <Menu>
      <MenuList>
        <MenuListItem>
          <MenuLink href="#" target="_blank">Twitter</MenuLink>
        </MenuListItem>
        <MenuListItem>
          <MenuLink href="#" target="_blank">GitHub</MenuLink>
        </MenuListItem>
        <MenuListItem>
          <MenuLink href="#" target="_blank">LinkedIn</MenuLink>
        </MenuListItem>
        <MenuListItem>
          <MenuLink href="#" target="_blank">RSS</MenuLink>
        </MenuListItem>
      </MenuList>
    </Menu>

    <Vectors>
      <VectorLaptop />
      <VectorLamp />
    </Vectors>
  </Container>
);
