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

  strong {
    color: rgba(255, 255, 255, 0.85);
  }

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

  & :not(pre) > code[class*="language-"],
  pre[class*="language-"] {
    background-color: rgba(0, 0, 0, 0.5);
  }

  blockquote {
    background-color: rgba(0, 0, 0, 0.5);
    margin-left: 0;
    margin-right: 0;
    padding: 1px 1.5em;
    border-left: 2px solid #ffd794;
    font-style: italic;
  }

  ul {
    list-style: square;
    padding-left: 1.25em;
  }
`;
