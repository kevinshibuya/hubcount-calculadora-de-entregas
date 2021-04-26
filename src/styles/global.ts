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
    font: 1.2rem Roboto, sans-serif;
  }

  #root {
    padding: 3% 5%;
  }

  button {
    cursor: pointer;
  }

  //permite que o window.print() na tela Budget, imprima a tabela
  @media print {
    body * {
      visibility: hidden;
    }

    #print, #print * {
      visibility: visible;
    }
  }
  
  //muda o tamanho da fonte de acordo com o dispositivo
  html {
    @media (max-width: 1080px) {
      font-size: 93.75%;
    }
    
    @media (max-width: 768px) {
      font-size: 75.0%;
    }
  }
`;
