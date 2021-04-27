import { useEffect, useState } from 'react';
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

  //adiciona novo cliente
  function handleInput() {
    //verificações para os inputs
    if(!(clientName && clientCep)) {
      if (!clientName) {
        return alert("Por favor adicione um nome.");
      } else if (!clientCep) {
        return alert("Por favor adicione um CEP.");
      }
      //verificar se a string do cep é composta apenas de números
    } else if (isNaN(+clientCep)) {
      return alert("Por favor adicione um CEP válido.");
    } else if (clientCep.length < 8) {
      return alert("Um CEP possuí no mínimo 8 digítos.");
    }

    const oldClientData = [...clientData];

    //cria o objeto que será adicionado a lista
    const newClientData = {
      id: uuidv4(),
      name: clientName,
      cep: clientCep,
    }
    
    //selecione os inputs e remove o valor atual deles
    Array.from(document.querySelectorAll('input')).forEach(
      input => (input.value = "")
    );

    //reseta os estados dos inputs, adiciona o novo objeto ao seu estado, e salva o array de clientes no localStorage
    setClientName('');
    setClientCep('');
    setClientData([...oldClientData, newClientData])
    localStorage.setItem('@hubcount-calculator/clientData', JSON.stringify([...oldClientData, newClientData]));
  }

  //deleta cliente
  function handleRemoveClient(id: string) {
    //verifica se o id passado é igual ao id do cliente e retorna false
    function isClient(client: clientData) {
      return !(client.id === id)
    }
    
    //cria um novo array de cliente removendo o cliente pelo id
    const newClientData = [...clientData].filter(isClient);
    
    //adiciona o novo array de cliente ao estado e no localStorage
    setClientData(newClientData);
    localStorage.setItem('@hubcount-calculator/clientData', JSON.stringify(newClientData));
  }

  //edita cliente
  function handleEditClient(id: string) {
    //cria um array dos inputs
    let inputArray = Array.from(document.querySelectorAll('input'));

    //verifica se o id passado é igual ao id do cliente e retorna true
    function isClient(client: clientData) {
      return (client.id === id)
    }
    
    //seleciona um cliente do array de clientes
    const selectedClient = [...clientData].filter(isClient)[0];

    //adiciona os dados do cliente nos inputs para edição
    if (selectedClient.name && selectedClient.cep) {
      inputArray[0].value = selectedClient.name;
      inputArray[1].value = selectedClient.cep;
      setClientCep(selectedClient.cep);
      setClientName(selectedClient.name);
    }

    //remove o cliente do array para ser editado
    handleRemoveClient(id);
  }

  //prevenir o refresh da pagina
  function formPreventDefault(event: any) {
    event.preventDefault();
  }

  useEffect(() => {
    //carrega os dados do localStorage no load da pagina
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
        <form
          className="inputs-container"
          onSubmit={formPreventDefault}
        >
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
        </form>
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
                <Trash />
              </Button>
              <Button
                isPurple={true}
                onClick={() => handleEditClient(client.id)}
              >
                <Edit />
              </Button>
            </div>
          </div>
        ))}
        {/* passar o estado dessa pagina para a proxima */}
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
