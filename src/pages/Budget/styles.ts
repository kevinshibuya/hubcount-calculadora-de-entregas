import React from 'react';
import styled from 'styled-components';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isPurple: boolean;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  table {
    border-collapse: collapse;
    margin-bottom: 2em;

    th {
      text-align: start;
    }

    th, td {
      border: 1px solid #717681;
      padding: 5px;
      color: #555555;
    }
  }

  div.buttons {
    display: flex;
    align-items: center;
    justify-content: space-between;

    a {
      width: 49%;
      
      button {
        width: 100%;
      }
    }
  }
`

export const Button = styled.button<ButtonProps>`
  background: ${props => props.isPurple ? "#6558F5" : "#1AAE9F"};
  color: #ffffff;
  padding: 5px;
  border-radius: 3px;
  border: none;
  width: 49%;
  height: 100%;
`