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
    font: 20px Roboto, sans-serif;
  }

  #root {
    padding: 3% 5%;
  }

  button {
    cursor: pointer;
  }

  @media print {
    body * {
      visibility: hidden;
    }

    #print, #print * {
      visibility: visible;
    }
  }
  
  html {
    @media (max-width: 1080px) {
      font-size: 93.75%;
    }
    
    @media (max-width: 720px) {
      font-size: 87.5%;
    }
  }
`;
