import React from 'react';
import styled from 'styled-components';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isPurple: boolean;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  .inputs-container {
    display: grid;
    grid-template-columns: 2fr 1.5fr 0.5fr;
    grid-column-gap: 3%;
    /* display: flex;
    justify-content: space-between;
    align-items: center; */
  }

  div.content-container {
    position: relative;
    margin-top: 2rem;


    div.client-container {
      display: grid;
      grid-template-columns: 2fr 1.5fr 0.5fr;
      grid-column-gap: 3%;
      align-items: center;
      padding: 8px;
      background: #DFE6ED;

      p {
        color: #555555;
      }

      div.buttons {
        display: flex;
        align-items: center;
        justify-content: center;

        button {
          margin-right: 10%;
        }
      }
    }

    div.client-container:nth-child(even) {
      background: #FFFFFF;
    }

    a {
      display: block;
      position: absolute;
      right: 0;
      bottom: -60px;
    }
  }
`

export const Input = styled.input`
  padding: 8px;
  border-radius: 3px;
  border: 1px solid #717681;
  color: #555555;
  min-width: 0px;

  &&::placeholder {
    color: #717681;
  }
`

export const Button = styled.button<ButtonProps>`
  background: ${props => props.isPurple ? "#6558F5" : "#D3455B"};
  color: #ffffff;
  padding: 8px;
  border-radius: 3px;
  border: none;
`