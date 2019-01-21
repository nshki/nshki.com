import React from 'react';
import PropTypes from 'prop-types';
import { GlobalStyles, Container } from '../global.css';
import { Header } from './Header';
import { Footer } from './Footer';

const LayoutMain = ({ children }) => (
  <>
    <GlobalStyles />
    <Container>
      <Header />
      {children}
      <Footer />
    </Container>
  </>
);

LayoutMain.propTypes = {
  children: PropTypes.node.isRequired,
};

export { LayoutMain };
