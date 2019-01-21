import styled from 'styled-components';

export const Container = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin: 2rem 0;

  @media (min-width: 400px) {
    align-items: center;
    margin: 3.375rem 0;
  }

  svg {
    max-width: 50px;
    height: auto;

    @media (min-width: 400px) {
      max-width: none;
    }
  }
`;

export const Title = styled.h1`
  margin: 0;
  font-size: 2rem;
  line-height: 1.2;

  @media (min-width: 400px) {
    margin-top: 0;
    font-size: 2.25rem;
  }

  a {
    text-decoration: none;
  }
`;

export const Slogan = styled.p`
  margin: 0;
  font-size: 0.8rem;

  @media (min-width: 400px) {
    font-size: 0.875rem;
  }
`;
