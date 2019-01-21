import styled from 'styled-components';

export const Container = styled.footer`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: auto;
  padding-top: 4rem;
  border-bottom: 10px solid #000;

  @media (min-width: 650px) {
    justify-content: space-between;
  }

  &:after {
    content: '';
    background-color: #ecc29a;
    display: block;
    width: 100%;
    height: 20px;
    border-bottom: 7px solid #a66f33;
  }
`;

export const Vectors = styled.div`
  display: none;
  width: 100%;
  line-height: 0;

  @media (min-width: 300px) {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-end;
  }

  @media (min-width: 650px) {
    width: auto;
  }

  svg:last-child {
    margin: 0 -1.5rem;
  }
`;

export const Menu = styled.menu`
  margin: 0 0 2rem 0;
  padding: 0;

  @media (min-width: 300px) {
    margin: 0;
  }

  @media (min-width: 650px) {
    transform: translateY(1em);
  }
`;

export const MenuList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  text-align: center;
`;

export const MenuListItem = styled.li`
  display: inline-block;
  margin: 0 0.75em;
  padding: 0;

  @media (min-width: 400px) {
    margin: 0;

    & + & {
      margin-left: 2em;
    }
  }
`;

export const MenuLink = styled.a`
  font-size: 0.8rem;
  text-decoration: none;
  color: rgba(255, 255, 255, 0.7);

  @media (min-width: 400px) {
    font-size: 0.875rem;
  }
`;
