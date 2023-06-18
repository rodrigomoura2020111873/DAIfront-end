import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import styled, { createGlobalStyle } from "styled-components";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Camioes from "./pages/Camioes";
import Funcionarios from "./pages/Funcionario";
import Header from "./components/Header/Header";
import ListDetail from "./pages/ListDetail";
import ListForm from "./pages/ListForm";

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
            <Route path="/camioes" element={<Camioes />} />
            <Route path="/funcionarios" element={<Funcionarios />} />
            <Route path="/list/:listId/new" element={<ListForm />} />
            <Route path="/list/:listId" element={<ListDetail />} />
          </Routes>
        </BrowserRouter>
      </AppWrapper>
    </>
  );
}
export default App;
