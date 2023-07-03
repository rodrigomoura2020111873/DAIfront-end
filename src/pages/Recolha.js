import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import MainNavBar from '../components/NavBar/MainNavBar';
import GoBack from '../components/SecondNavBar/GoBack';
import SecondNavRecolha from '../components/SecondNavBar/Recolha';

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

const handleRemover = async (recolhaId, navigate) => {
  try {
    const response = await fetch(`http://localhost:8080/api/recolha/${recolhaId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      console.log('Recolha removida com sucesso!');
      navigate(-1);
    } else {
      console.log('Erro ao remover a Recolha.');
    }
  } catch (error) {
    console.log('Erro:', error);
  }
};

const Recolha = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const { baldeId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/recolha');
        const json = await response.json();

        const recolhasFiltradas = json.data.recolha.filter(rec => rec.balde === baldeId);

        const recolhas = await Promise.all(recolhasFiltradas.map(async (recolha) => {
          const responseFuncionario = await fetch(`http://localhost:8080/api/funcionario/${recolha.funcionario}`);
          const jsonFuncionario = await responseFuncionario.json();
          const funcionarioNome = jsonFuncionario.data.funcionario.nome;
          const responseCamiao = await fetch(`http://localhost:8080/api/camiao/${recolha.camiao}`);
          const jsonCamiao = await responseCamiao.json();
          const camiaoMatricula = jsonCamiao.data.camiao.matricula;

          return {
            ...recolha,
            funcionarioNome,
            camiaoMatricula
          };
        }));

        setData(recolhas);
        setLoading(false);

        console.log("Manutenções filtradas com nome do funcionário:", recolhas);
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
      {navigate && <SecondNavRecolha />}
      <ListWrapper>
        {loading || error ? (
          <span>{error || 'Carregando...'}</span>
        ) : (
          data.map((recolha) => (
            <div key={recolha._id}>
              <ListLink key={recolha._id} to={`${recolha._id}`}>
                <Title>{recolha.funcionarioNome}</Title>
                <Title>{recolha.camiaoMatricula}</Title>
                <Title>{recolha.peso}</Title>
                <Title>{recolha.data}</Title>
                <Title>
                  <button className='btn btn-danger' onClick={() => handleRemover(recolha._id, navigate)}>Remover</button>
                </Title>
              </ListLink>
            </div>
          ))
        )}
      </ListWrapper>
    </>
  );
};

export default Recolha;
