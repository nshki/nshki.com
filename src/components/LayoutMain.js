import React from 'react';
import PropTypes from 'prop-types';
import { GlobalStyles, Container } from '../global.css';

const LayoutMain = ({ children }) => (
  <>
    <GlobalStyles />
    <Container>
      {children}
    </Container>
  </>
);

LayoutMain.propTypes = {
  children: PropTypes.node.isRequired,
};

export { LayoutMain };
