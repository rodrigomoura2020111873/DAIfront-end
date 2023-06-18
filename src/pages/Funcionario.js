import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import MainNavBar from '../components/NavBar/MainNavBar';
import SecondNavFuncionarios from '../components/SecondNavBar/Funcionarios';

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


const handleRemover = async (funcionarioId, navigate) => {
  try {
    const response = await fetch(`http://localhost:8080/api/funcionario/${funcionarioId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      console.log('Funcionário removido com sucesso!');
      window.location.reload();
    } else {
      console.log('Erro ao remover o funcionário.');
    }
  } catch (error) {
    console.log('Erro:', error);
  }
};

const handleAlterar = (funcionarioId, navigate) => {
  navigate(`/funcionarios/${funcionarioId}`);
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
      {navigate && <SecondNavFuncionarios />}
      <ListWrapper>
        {loading || error ? (
          <span>{error || 'Carregando...'}</span>
        ) : (
          data.map((funcionario) => (
            <div key={funcionario._id}>
            <ListLink key={funcionario._id} to={`list/${funcionario._id}`}>
              <Title>{funcionario.nome}</Title>
              <Title>{funcionario.funcao}</Title>
            </ListLink>
            <button onClick={() => handleRemover(funcionario._id, navigate)}>Remover</button>
            <button onClick={() => handleAlterar(funcionario._id, navigate)}>Alterar</button></div>
          ))
        )}
      </ListWrapper>
    </>
  );
};

export default Funcionarios;