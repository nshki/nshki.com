import React from 'react';
import PropTypes from 'prop-types';
import { GlobalStyles, Container } from '../global.css';
import { Header } from './Header';
import { Footer } from './Footer';

const Layout = ({ children }) => (
  <>
    <GlobalStyles />
    <Container>
      <Header />
      {children}
      <Footer />
    </Container>
  </>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export { Layout };
