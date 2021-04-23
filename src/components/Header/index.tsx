import React from 'react';
import { Container } from './styles';

interface HeaderProps {
  title: string;
}

const Header = ({title}: HeaderProps): JSX.Element => {
  return (
    <Container>{ title }</Container>
  )
}

export default Header;