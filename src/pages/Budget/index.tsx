import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import Header from '../../components/Header';
import { Container, Button } from './styles';
import { brazilStatesCapitals } from '../../util/brazilStatesCapitals'

interface clientData {
  id: string;
  name: string;
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro: boolean;
  cost: string;
}

export function Budget() {
  const [clientData, setClientData] = useState<clientData[]>([]);
  const history = useHistory();

  function calcShipping(clientUf: string, clientCity: string) {
    let shippingCost = 'R$ 150,00';

    brazilStatesCapitals.forEach((region) => {
      if (region.uf !== clientUf) return;
      if (region.capital === clientCity && clientCity === 'São Paulo') return shippingCost = 'Gratuito';
      if (region.region === 'sudeste' && clientCity === region.capital) return shippingCost = 'R$ 50,00';
      if (region.region === 'sudeste' && clientCity !== region.capital) return shippingCost = 'R$ 80,00';
      if ((region.region === 'sul' || region.region === 'nordeste') && clientCity === region.capital) return shippingCost = 'R$ 70,00';
      if ((region.region === 'sul' || region.region === 'nordeste') && clientCity !== region.capital) return shippingCost = 'R$ 100,00';
      if ((region.region === 'centro-oeste' || region.region === 'norte') && clientCity === region.capital) return shippingCost = 'R$ 100,00';
      if ((region.region === 'centro-oeste' || region.region === 'norte') && clientCity !== region.capital) return;
    });

    return shippingCost;
  }

  useEffect(() => {
    const untreatedClientData: any = history.location.state;
    let oldClientData = [...clientData];

    async function receiveData(client: clientData) {
      await fetch(`https://viacep.com.br/ws/${client.cep}/json/`)
        .then(res => res.json())
        .then(json => oldClientData = [...oldClientData, {
          id: client.id,
          name: client.name,
          cep: client.cep,
          uf: json.uf,
          localidade: json.localidade,
          logradouro: json.logradouro,
          bairro: json.bairro,
          erro: json.erro,
          cost: calcShipping(json.uf, json.localidade),
        }]);

      setClientData(oldClientData);
    }

    function fetchData() {
      untreatedClientData.forEach((client: clientData) => receiveData(client))
    }
    
    fetchData();
    // eslint-disable-next-line
  }, []);

  function printData() {
    window.print();
  }

  return (
    <Container>
      <Header title="Hubfrete - orçamento" />
      <table className="budget-table" id="print">
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
          {clientData.map((client) => {
            if (client.erro) {
              return (
                <tr key={client.id}>
                  <td data-label="Cliente">{client.name}</td>
                  <td data-label="CEP">{client?.cep?.substring(0, 5) + '-' + client?.cep?.substring(5, 8)}</td>
                  <td
                    colSpan={5}
                    data-label="Erro"
                  >
                    <b>Erro:</b>
                    <span> O CEP inserido não foi encontrado</span>
                  </td>
                </tr>
              )
            } else {
              return (
                <tr key={client.id}>
                  <td data-label="Cliente">{client.name}</td>
                  <td data-label="CEP">{client?.cep?.substring(0, 5) + '-' + client?.cep?.substring(5, 8)}</td>
                  <td data-label="UF">{client.uf || 'UF não encontrado'}</td>
                  <td data-label="Cidade">{client.localidade || 'Cidade não encontrada'}</td>
                  <td data-label="Logradouro">{client.logradouro || 'Logradouro não encontrado'}</td>
                  <td data-label="Bairro">{client.bairro || 'Bairro não encontrado'}</td>
                  <td data-label="Frete">{client.cost}</td>
                </tr>
              )
            }
          })}
        </tbody>
      </table>
      <div className="buttons">
        <Link to="/">
          <Button isPurple={false} >
            Voltar
          </Button>
        </Link>
        <Button
          isPurple={true}
          onClick={(printData)}
        >
          Imprimir orçamento
        </Button>
      </div>
    </Container>
  )
}