import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Edit, Trash } from 'react-feather';
import { v4 as uuidv4 } from 'uuid';

import ButtonComponent from '../../components/Button';
import Header from '../../components/Header';
import { Container, Input, Button } from './styles';

interface clientData {
  id: string;
  name: string;
  cep: string;
}

export function Home() {
  const [clientName, setClientName] = useState<string>('');
  const [clientCep, setClientCep] = useState<string>('');
  const [clientData, setClientData] = useState<clientData[]>([]);

  function handleInput() {
    if(!(clientName && clientCep)) {
      if (!clientName) {
        return alert("Por favor adicione um nome");
      } else if (!clientCep) {
        return alert("Por favor adicione um cep");
      }
    } else if (clientCep.length < 8) {
      return alert("Por favor adicione um cep válido");
    }
    //verificar se toda a string do cep é composta apenas de numeros

    const oldClientData = [...clientData];

    const newClientData = {
      id: uuidv4(),
      name: clientName,
      cep: clientCep,
    }
    
    Array.from(document.querySelectorAll('input')).forEach(
      input => (input.value = "")
    );

    setClientName('');
    setClientCep('');
    setClientData([...oldClientData, newClientData])
    localStorage.setItem('@hubcount-calculator/clientData', JSON.stringify([...oldClientData, newClientData]));
  }

  function handleRemoveClient(id: string | undefined) {
    function isClient(client: clientData) {
      return !(client.id === id)
    }
    
    const newClientData = [...clientData].filter(isClient);
    
    setClientData(newClientData);
    localStorage.setItem('@hubcount-calculator/clientData', JSON.stringify(newClientData));
  }

  function handleEditClient(id: string | undefined) {
    let inputArray = Array.from(document.querySelectorAll('input'));

    function isClient(client: clientData) {
      return (client.id === id)
    }
    
    const selectedClient = [...clientData].filter(isClient)[0];

    if (selectedClient.name && selectedClient.cep) {
      inputArray[0].value = selectedClient.name;
      inputArray[1].value = selectedClient.cep;
      setClientCep(selectedClient.cep);
      setClientName(selectedClient.name);
    }

    handleRemoveClient(id);
  }

  useEffect(() => {
    function loadClientData() {
      const storagedClientData = localStorage.getItem('@hubcount-calculator/clientData');

      if (storagedClientData) {
        setClientData(JSON.parse(storagedClientData))
      }
    }

    loadClientData();
  }, []);

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
            onClick={handleInput}
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
              {
                client?.cep?.substring(0, 5) + '-' + client?.cep?.substring(5, 8)
              }
            </p>
            <div className="buttons">
              <Button
                isPurple={false}
                onClick={() => handleRemoveClient(client.id)}
              >
                <Trash size={20} />
              </Button>
              <Button
                isPurple={true}
                onClick={() => handleEditClient(client.id)}
              >
                <Edit size={20} />
              </Button>
            </div>
          </div>
        ))}
        {/* manter o state da pagina mudando de pagina */}
        <Link to={{
          pathname: '/budget',
          state: clientData
        }}>
          <ButtonComponent title="Calcular fretes" />
        </Link>
      </div>
    </Container>
  )
}