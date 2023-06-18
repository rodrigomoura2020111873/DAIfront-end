import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import MainNavBar from '../components/NavBar/MainNavBar';

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

const Camioes = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  let navigate = useNavigate();

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
      <ListWrapper>
        {loading || error ? (
          <span>{error || 'Carregando...'}</span>
        ) : (
          data.map((camiao) => (
            <ListLink key={camiao._id} to={`list/${camiao._id}`}>
              <Title>{camiao.matricula}</Title>
              <Title>{camiao.marca}</Title>
              <Title>{camiao.modelo}</Title>
            </ListLink>
          ))
        )}
      </ListWrapper>
    </>
  );
};

export default Camioes;
