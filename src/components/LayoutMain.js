import React from 'react';
import PropTypes from 'prop-types';
import { GlobalStyles, Container } from '../global.css';
import { Header } from './Header';

const LayoutMain = ({ children }) => (
  <>
    <GlobalStyles />
    <Container>
      <Header />
      {children}
    </Container>
  </>
);

LayoutMain.propTypes = {
  children: PropTypes.node.isRequired,
};

export { LayoutMain };
