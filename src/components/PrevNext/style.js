import styled from 'styled-components';

export const Container = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  margin: 0 0 1rem 0;
  padding: 0;
  border-top: 1px solid rgba(255, 255, 255, 0.5);
  list-style: none;

  li {
    width: 100%;
    margin: 1rem 0 0 0;
  }

  li:not(:only-child) {
    @media (min-width: 650px) {
      max-width: 45%;
    }
  }

  a {
    font-size: 0.875rem;
    text-decoration: none;
  }
`;

export const Prev = styled.li`
  margin: 0 0 0 auto;
  text-align: left;

  @media (min-width: 650px) {
    text-align: right;
  }
`;

export const Next = styled.li`
  margin: 0 auto 0 0;
  text-align: left;

  @media (min-width: 650px) {
    text-align: left;
  }
`;
