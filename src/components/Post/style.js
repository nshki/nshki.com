import styled from 'styled-components';

export const Container = styled.div`
  margin: 2rem 0;
`;

export const Title = styled.h2`
  margin: 0;
  font-size: ${props => props.large ? '1.75rem' : '1.6rem'};
  line-height: 1.2;

  a {
    text-decoration: none;
  }
`;

export const Misc = styled.p`
  margin: 0.25em 0 0 0;
  font-size: 0.875rem;
`;

export const Content = styled.div`
  line-height: 1.7;

  p {
    margin: 1.5em 0;

    & + h1,
    & + h2,
    & + h3,
    & + h4,
    & + h5,
    & + h6 {
      margin-top: 3rem;
    }
  }
`;
