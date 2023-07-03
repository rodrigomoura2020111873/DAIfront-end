import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import MainNavBar from '../components/NavBar/MainNavBar';
import GoBack from '../components/SecondNavBar/GoBack';
import SecondNavManutencao from '../components/SecondNavBar/Manutencao';

const ListWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin: 5%;
`;

const ListLink = styled(Link)`
  display: flex;
  text-align: left;
  align-items: center;
  padding: 1%;
  background: lightGray;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 2%;
  color: black;
  text-decoration: none;
`;

const Title = styled.h3`
  flex-basis: 80%;
`;

const handleRemover = async (manutencaoId, navigate) => {
  try {
    const response = await fetch(`http://localhost:8080/api/manutencao/${manutencaoId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      console.log('Funcionário removido com sucesso!');
      navigate(-1);
    } else {
      console.log('Erro ao remover o funcionário.');
    }
  } catch (error) {
    console.log('Erro:', error);
  }
};

const Manutencao = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const { baldeId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/manutencao');
        const json = await response.json();

        // Filtrar as manutenções com base no valor do parâmetro "manutencao.balde"
        const manutencoesFiltradas = json.data.manutencao.filter(manut => manut.balde === baldeId);

        // Mapear as manutenções filtradas para buscar os detalhes dos funcionários com base no ID
        const manutencoes = await Promise.all(manutencoesFiltradas.map(async (manutencao) => {
          // Fazer uma chamada à API para buscar os detalhes do funcionário com base no ID
          const responseFuncionario = await fetch(`http://localhost:8080/api/funcionario/${manutencao.funcionario}`);
          const jsonFuncionario = await responseFuncionario.json();
          const funcionarioNome = jsonFuncionario.data.funcionario.nome;

          // Retornar o objeto da manutenção atualizado com o nome do funcionário
          return {
            ...manutencao,
            funcionarioNome,
          };
        }));

        setData(manutencoes);
        setLoading(false);

        console.log("Manutenções filtradas com nome do funcionário:", manutencoes);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [baldeId]);

  return (
    <>
      {navigate && <MainNavBar />}
      <GoBack/>
      {navigate && <SecondNavManutencao />}
      <ListWrapper>
        {loading || error ? (
          <span>{error || 'Carregando...'}</span>
        ) : (
          data.map((manutencao) => (
            <div key={manutencao._id}>
              <ListLink key={manutencao._id} to={`${manutencao._id}`}>
                <Title>{manutencao.funcionarioNome}</Title>
                <Title>{manutencao.data}</Title>
                <Title>
                  <button className='btn btn-danger' onClick={() => handleRemover(manutencao._id, navigate)}>Remover</button>
                </Title>
              </ListLink>
            </div>
          ))
        )}
      </ListWrapper>
    </>
  );
};

export default Manutencao;
