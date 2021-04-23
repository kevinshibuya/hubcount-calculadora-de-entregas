import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ButtonComponent from '../../components/Button';
import Header from '../../components/Header';
import { Container, Button } from './styles';

export function Budget() {
  return (
    <Container>
      <Header title="Hubfrete - orçamento" />
      <table className="budget-table">
        <thead>
          <tr>
            <th>Cliente</th>
            <th>CEP</th>
            <th>UF</th>
            <th>Cidade</th>
            <th>Logradouro</th>
            <th>Bairro</th>
            <th>Frete</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Kevin Shibuya</td>
            <td>11070-010</td>
            <td>SP</td>
            <td>Santos</td>
            <td>Rua alfredo albertini</td>
            <td>Marapé</td>
            <td>R$ 100,00</td>
          </tr>
        </tbody>
      </table>
      <div className="buttons">
        <Link to="/">
          <Button isPurple={false} >
            Voltar
          </Button>
        </Link>
        <Button isPurple={true} >
          Imprimir orçamento
        </Button>
      </div>
    </Container>
  )
}