import styled from 'styled-components';

export const Container = styled.header`
  display: flex;
  flex-direction: column-reverse;
  margin: 2rem 0;

  @media (min-width: 400px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 3.375rem 0;
  }
`;

export const Title = styled.h1`
  margin: 1rem 0 0 0;
  font-size: 2.25rem;

  @media (min-width: 400px) {
    margin-top: 0;
  }
`;

export const Slogan = styled.p`
  margin: 0;
  font-size: 0.875rem;
`;
