import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import MainNavBar from '../components/NavBar/MainNavBar';
import SecondNavBaldes from '../components/SecondNavBar/Baldes';

const ListWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin: 5%;
  background-color: #f2f2f2;
  padding: 20px;
  border-radius: 10px;
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

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  const handleRemover = async (baldeId, navigate) => {
    try {
      const response = await fetch(`http://localhost:8080/api/balde/${baldeId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('Balde removido com sucesso!');
        navigate('/');
      } else {
        console.log('Erro ao remover o Balde.');
      }
    } catch (error) {
      console.log('Erro:', error);
    }
  };

  let navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/balde');
        const json = await response.json();
        setData(json.data.baldes);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {navigate && <MainNavBar />}
      <SecondNavBaldes />
      <ListWrapper>
        {loading || error ? (
          <span>{error || 'Carregando...'}</span>
        ) : (
          <Table>
            <thead>
              <TableRow>
                <TableHeader>Concelho</TableHeader>
                <TableHeader>Freguesia</TableHeader>
                <TableHeader>Morada</TableHeader>
                <TableHeader>Tipo</TableHeader>
                <TableHeader>Capacidade (%)</TableHeader>
                <TableHeader>Ações</TableHeader>
              </TableRow>
            </thead>
            <tbody>
              {data.map((list) => (
                <TableRow key={list._id}>
                  <TableCell>{list.concelho}</TableCell>
                  <TableCell>{list.freguesia}</TableCell>
                  <TableCell>{list.rua}</TableCell>
                  <TableCell>{list.tipo}</TableCell>
                  <TableCell>{list.percentagem_lixo}</TableCell>
                  <TableCell>
                  <button className='btn btn-secondary' style= {{ marginRight: '5px'}} onClick={() => navigate(`/baldes/${list._id}`)}>
                  Informações
                  </button>

                    <button className='btn btn-danger' onClick={() => handleRemover(list._id, navigate)}>
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

export default Home;
