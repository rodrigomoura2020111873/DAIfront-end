import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import useDataFetching from '../hooks/useDataFetching';
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

const Home = () => {
  let navigate = useNavigate();

  const [loading, error, data] = useDataFetching(
    'http://localhost:8080/api/balde',
  );

  return (
    <>
      {navigate && <MainNavBar/>}
      <ListWrapper>
        {loading || error ? (
          <span>{error || 'Loading...'}</span>
        ) : (
          data.balde.map((list) => (
            <ListLink key={list._id} to={`list/${list._id}`}>
              <Title>{list.matricula}</Title>
            </ListLink>
          ))
        )}
      </ListWrapper>
    </>
  );
};

export default Home;
