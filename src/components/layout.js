import React from 'react';
import PropTypes from 'prop-types';
import { GlobalStyles, Container } from '../global.css';

const Layout = ({ children }) => (
  <>
    <GlobalStyles />
    <Container>
      {children}
    </Container>
  </>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
