import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import MainNavBar from '../components/NavBar/MainNavBar';
import SecondNavBaldes from '../components/SecondNavBar/Funcionarios';

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

const handleRemover = async (funcionarioId, navigate) => {
  try {
    const response = await fetch(`http://localhost:8080/api/funcionario/${funcionarioId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      console.log('Funcionário removido com sucesso!');
      navigate('/funcionarios');
    } else {
      console.log('Erro ao remover o funcionário.');
    }
  } catch (error) {
    console.log('Erro:', error);
  }
};

const Funcionarios = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/funcionario');
        const json = await response.json();
        setData(json.data.funcionario);
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
                <TableHeader>Nome</TableHeader>
                <TableHeader>Função</TableHeader>
                <TableHeader>Ações</TableHeader>
              </TableRow>
            </thead>
            <tbody>
              {data.map((funcionario) => (
                <TableRow key={funcionario._id}>
                  <TableCell>{funcionario.nome}</TableCell>
                  <TableCell>{funcionario.funcao}</TableCell>
                  <TableCell>
                    <button className='btn btn-warning' style= {{ marginRight: '5px'}} onClick={() => navigate(`/funcionarios/${funcionario._id}`)}>
                      Modificar
                    </button> 

                    <button className='btn btn-danger' onClick={() => handleRemover(funcionario._id, navigate)}>
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

export default Funcionarios;
