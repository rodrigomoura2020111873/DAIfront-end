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
      < SecondNavBaldes />
      <ListWrapper>
        {loading || error ? (
          <span>{error || 'Carregando...'}</span>
        ) : (
          data.map((list) => (
            <ListLink key={list._id} to={`/baldes/${list._id}`}>
              <Title>{list.conselho}</Title>
              <Title>{list.freguesia}</Title> 
              <Title>{list.rua}</Title>
              <Title>{list.tipo}</Title>
              <Title>{list.percentagem_lixo}</Title>
              <Title>
                <button className='btn btn-danger' onClick={() => handleRemover(list._id, navigate)}>Remover</button>
              </Title>
            </ListLink>
          ))
        )}
      </ListWrapper>
    </>
  );
};

export default Home;
