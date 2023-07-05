import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import MainNavBar from '../components/NavBar/MainNavBar';
import SecondNavBaldes from '../components/SecondNavBar/Camioes';

const ListWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin: 5%;
  background-color: #f2f2f2;
  padding: 20px;
  border-radius: 10px;
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

const Camioes = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  const handleRemover = async (camiaoId, navigate) => {
    try {
      const response = await fetch(`http://localhost:8080/api/camiao/${camiaoId}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        console.log('Camião removido com sucesso!');
        navigate('/camioes');
      } else {
        console.log('Erro ao remover o Camião.');
      }
    } catch (error) {
      console.log('Erro:', error);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/camiao');
        const json = await response.json();
        setData(json.data.camiao);
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
            <TableHeader>Matrícula</TableHeader>
            <TableHeader>Marca</TableHeader>
            <TableHeader>Modelo</TableHeader>
            <TableHeader>Ações</TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {data.map((camiao) => (
            <TableRow key={camiao._id} to >
              <TableCell>{camiao.matricula}</TableCell>
              <TableCell>{camiao.marca}</TableCell>
              <TableCell>{camiao.modelo}</TableCell>
              <TableCell>
                <button className='btn btn-warning' style= {{ marginRight: '5px'}} onClick={() => navigate(`/camioes/${camiao._id}`)}>
                  Modificar
                </button> 

                <button className='btn btn-danger' onClick={() => handleRemover(camiao._id, navigate)}>
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

export default Camioes;
