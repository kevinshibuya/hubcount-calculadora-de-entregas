import React from 'react';
import { Cotainer } from './styles';


interface ButtonsProps {
  title: string;
}

const Button = ({title}: ButtonsProps): JSX.Element => {
  return (
    <Cotainer>{ title }</Cotainer>
  )
}

export default Button;