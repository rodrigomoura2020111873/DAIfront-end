import styled from 'styled-components';

const HeaderWrapper = styled.div`
  background-color: #00994d; 
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px; 
  color: #fff; 
`;

const Title = styled.h1`
  pointer-events: none;
  font-weight: bold; 
  margin: 0; 
`;

function Header() {
  return (
    <HeaderWrapper>
      <Title>Rede de Recolha de Resíduos</Title>
    </HeaderWrapper>
  );
}

export default Header;
