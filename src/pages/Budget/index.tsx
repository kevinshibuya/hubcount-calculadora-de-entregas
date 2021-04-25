import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import ButtonComponent from '../../components/Button';
import Header from '../../components/Header';
import { Container, Button } from './styles';

interface clientData {
  id: string;
  name: string;
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro: boolean;
}

export function Budget() {
  const [clientData, setClientData] = useState<clientData[]>([]);
  const history = useHistory();

  useEffect(() => {
    const untreatedClientData: any = history.location.state;

    async function fetchData() {
      let oldClientData = clientData;

      await untreatedClientData.forEach((client: clientData) => {
        fetch(`https://viacep.com.br/ws/${client.cep}/json/`)
          .then(res => res.json())
          .then(json => oldClientData = [...oldClientData, json])
      });

      setClientData(oldClientData);
    }
    
    fetchData();
    console.log(clientData);
  }, []);

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
          {clientData.map((client) => (
            <tr>
              <td>Kevin Shibuya</td>
              <td>11070-010</td>
              <td>SP</td>
              <td>Santos</td>
              <td>Rua alfredo albertini</td>
              <td>Marapé</td>
              <td>R$ 100,00</td>
            </tr>
          ))}
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