import styled, { createGlobalStyle } from "styled-components";

export const PageStyle = styled.div`
  .menu {
    a {
      color: #ccc;
      text-decoration: none;
      font-weight: 700;
      padding: 0.5em;
      &:hover {
        color: white;
      }
    }
  }
`;

export const EditorStyle = styled.div`
  display: flex;
  color: #333;
  & > * {
    width: 50%;
    background: white;

    div {
      outline: none;
    }

    .toolbar {
      border-bottom: 1px solid #333;
      padding: 0 1em;
      span {
        display: inline-block;
        padding: 0.5em;
        user-select: none;
        cursor: pointer;
        font-size: 1.1em;
      }
    }
  }

  pre {
    margin: 0 1em;
    padding: 1em;
  }
`;

export const GlobalStyle = createGlobalStyle`
  html {
    font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji;
    background: #333;
    color: white;
  }
`;
