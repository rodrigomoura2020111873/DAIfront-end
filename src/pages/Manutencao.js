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

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  padding: 10px;
  text-align: left;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const TableCell = styled.td`
  padding: 10px;
  text-align: left;
`;

const handleRemover = async (manutencaoId, navigate) => {
  try {
    const response = await fetch(`http://localhost:8080/api/manutencao/${manutencaoId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      console.log('Manutenção removida com sucesso!');
      navigate(-1);
    } else {
      console.log('Erro ao remover a manutenção.');
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

        const manutencoesFiltradas = json.data.manutencao.filter(manut => manut.balde === baldeId);

        const manutencoes = await Promise.all(manutencoesFiltradas.map(async (manutencao) => {
          const responseFuncionario = await fetch(`http://localhost:8080/api/funcionario/${manutencao.funcionario}`);
          const jsonFuncionario = await responseFuncionario.json();
          const funcionarioNome = jsonFuncionario.data.funcionario.nome;
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
          <Table>
            <thead>
              <TableRow>
                <TableHeader>Funcionário</TableHeader>
                <TableHeader>Data</TableHeader>
                <TableHeader>Descrição</TableHeader>
                <TableHeader>Ações</TableHeader>
              </TableRow>
            </thead>
            <tbody>
              {data.map((manutencao) => (
                <TableRow key={manutencao._id}>
                  <TableCell>{manutencao.funcionarioNome}</TableCell>
                  <TableCell>{manutencao.data}</TableCell>
                  <TableCell>{manutencao.descricao}</TableCell>
                  <TableCell>
                  <button className='btn btn-warning' style= {{ marginRight: '5px'}} onClick={() => navigate(`/manutencao/${manutencao._id}/${manutencao._id}`)}>
                  Modificar
              </button>

                    <button className='btn btn-danger' onClick={() => handleRemover(manutencao._id, navigate)}>
                      Remover
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        )}
      </ListWrapper>
    </>
  );
};

export default Manutencao;
