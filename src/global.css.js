import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Merriweather:400,400i,700,700i|Montserrat:700');

  *, *:before, *:after {
    box-sizing: border-box;
  }

  body {
    background-color: #2b333f;
    margin: 0;
    overflow-x: hidden;
    font-family: 'Merriweather', serif;
    line-height: 1.5;
    color: rgba(255, 255, 255, 0.7);
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Montserrat', sans-serif;
    font-weight: 700;
    color: #fff;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 720px;
  width: 100%;
  min-height: 100vh;
  margin: 0 auto;
  padding: 0 20px;
`;
