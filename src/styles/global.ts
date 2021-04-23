import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body {
    -webkit-font-smoothing: antialiased;
    width: 100%;
  }

  body, input, button {
    font: 14px Roboto, sans-serif;
  }

  #root {
    padding: 3% 5%;
  }

  button {
    cursor: pointer;
  }
`;
