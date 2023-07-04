import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import styled, { createGlobalStyle } from "styled-components";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Camioes from "./pages/Camioes";
import Funcionarios from "./pages/Funcionario";
import AddFuncionarios from "./pages/FuncionariosAdd";
import ModFuncionario from "./pages/FuncionarioMod";
import AddCamioes from "./pages/CamioesAdd";
import ModCamioes from "./pages/CamioesMod";
import Header from "./components/Header/Header";
import AddBalde from "./pages/BaldesAdd";
import ModBaldes from "./pages/BaldesMod";
import Mapa from "./pages/Mapa"
import Manutencao from "./pages/Manutencao"
import AddManutencao from "./pages/ManutencaoAdd";
import ModManutencao from "./pages/ManutencaoMod";
import Recolha from "./pages/Recolha"
import AddRecolha from "./pages/RecolhaAdd";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

const AppWrapper = styled.div`
  text-align: center;
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <AppWrapper>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/baldes/add" element={<AddBalde />} />
            <Route path="/baldes/:baldeId" element={<ModBaldes/>} />
            <Route path="/camioes" element={<Camioes />} />
            <Route path="/camioes/add" element={<AddCamioes />} />
            <Route path="/camioes/:camiaoId" element={<ModCamioes/>} />
            <Route path="/funcionarios" element={<Funcionarios />} />
            <Route path="/funcionarios/add" element={<AddFuncionarios />} />
            <Route path="/funcionarios/:funcionariosId" element={<ModFuncionario/>} />
            <Route path="/manutencao/:baldeId" element={<Manutencao/>} />
            <Route path="/manutencao/:baldeId/add" element={<AddManutencao/>} />
            <Route path="/manutencao/:baldeId/:manutencaoId" element={<ModManutencao/>} />
            <Route path="/recolha/:baldeId" element={<Recolha />} />
            <Route path="/recolha/:baldeId/add" element={<AddRecolha/>} />
            <Route path="/mapa" element={<Mapa/>} />
          </Routes>
        </BrowserRouter>
      </AppWrapper>
    </>
  );
}
export default App;
