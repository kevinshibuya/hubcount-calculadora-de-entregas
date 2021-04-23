import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Edit, Trash } from 'react-feather';
import ButtonComponent from '../../components/Button';
import Header from '../../components/Header';
import { Container, Input, Button } from './styles';

interface clientData {
  name: string | undefined;
  cep: string | undefined;
}

export function Home() {
  const [clientName, setClientName] = useState<string>();
  const [clientCep, setClientCep] = useState<string>();
  const [clientData, setClientData] = useState<clientData[]>([]);

  // const cepRegex = /([0-9]{0-4})/

  function handleInputData() {
    if(!(clientName && clientCep)) {
      if (!clientName) {
        return alert("Por favor adicione um nome")
      } else if (!clientCep) {
        return alert("Por favor adicione um cep")
      }
    }

    const oldClientData = [...clientData] || [];

    const newClientData = {
      name: clientName,
      cep: clientCep,
    }
    
    Array.from(document.querySelectorAll('input')).forEach(
      input => (input.value = "")
    );

    setClientName('');
    setClientCep('');
    setClientData([...oldClientData, newClientData]);
  }

  return (
    <Container>
      <div className="header-container">
        <Header title="Hubfrete" />
        <div className="inputs-container">
          <Input
            placeholder="Nome"
            onChange={(e) => {
              setClientName(e.target.value)
            }}
          />
          <Input
            placeholder="CEP"
            type="text"
            id="cep-regex"
            maxLength={8}
            onChange={(e) => setClientCep(e.target.value)}
          />
          <Button
            isPurple={true}
            onClick={handleInputData}
          >
            Adicionar
          </Button>
        </div>
      </div>
      <div className="content-container">
        {clientData.map((client, i) => (
          <div className="client-container" key={i} >
            <p className="client-name">
              {client.name}
            </p>
            <p className="client-cep">
              {client.cep}
            </p>
            <div className="buttons">
              <Button isPurple={false} >
                <Trash size={20} />
              </Button>
              <Button isPurple={true} >
                <Edit size={20} />
              </Button>
            </div>
          </div>
        ))}
        <Link to="/budget">
          <ButtonComponent title="Calcular fretes" />
        </Link>
      </div>
    </Container>
  )
}