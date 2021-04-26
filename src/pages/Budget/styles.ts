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
      padding: 8px;
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

  //torna a tabela responsivel
  @media (max-width: 768px) {
    table thead {
      display: none;
    }

    table, table tbody, table tr, table td {
      display: block;
      width: 100%;
    }

    table tbody tr {
      margin-bottom: 15px;
    }

    table tbody tr td {
      text-align: right;
      padding-left: 50%;
      position: relative;

      &:before {
        content: attr(data-label);
        position: absolute;
        left: 0;
        width: 50%;
        padding-left: 8px;
        font-weight: 600;
        text-align: left;
      }
    }
  }
`

export const Button = styled.button<ButtonProps>`
  background: ${props => props.isPurple ? "#6558F5" : "#1AAE9F"};
  color: #ffffff;
  padding: 8px;
  border-radius: 3px;
  border: none;
  width: 49%;
  height: 100%;
`