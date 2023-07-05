import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import MainNavBar from '../components/NavBar/MainNavBar';
import FormItem from "../components/FormItem/FormItem";
import GoBack from '../components/SecondNavBar/GoBack';
import FormSelectItem from '../components/FormItem/FormSelectItems';
import Button from "../components/Button/Button";


const SubmitButton = styled(Button)`
  background: #00cc66;
  margin: 2% 0;
`;

const FormWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin: 2% 5%;
`;



const AddCamioes = () => {
  const [matricula, setMatricula] = useState('');
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [cor, setCor] = useState('');

  const handleMatriculaChange = (event) => {
    setMatricula(event.target.value);
  };

  const handleMarcaChange = (event) => {
    setMarca(event.target.value);
  };

  const handleModeloChange = (event) => {
    setModelo(event.target.value);
  };

  const handleCorChange = (event) => {
    setCor(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
      const novoCamiao = {
        matricula,
        marca,
        modelo,
        cor
      };


      console.log('JSON enviado:', JSON.stringify(novoCamiao));
  
      try {
        const response = await fetch('http://localhost:8080/api/camiao', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(novoCamiao),
        });
  
        if (response.ok) {
          console.log('Camião criado com sucesso!');
          navigate('/camioes');
        } else {
          console.log('Erro ao criar o Camião.');
        }
      } catch (error) {
        console.log('Erro:', error);
      }
    };



    let navigate = useNavigate();

  return (
    <>
      <MainNavBar />
      <GoBack />
      <FormWrapper>
        <form onSubmit={handleSubmit}>
          <FormItem id="matricula" label="Matricula" placeholder="Insira a matricula do camião" handleOnChange={handleMatriculaChange} value={matricula} />
          <FormItem id="marca" label="Marca" placeholder="Insira a marca do camião" handleOnChange={handleMarcaChange} value={marca} />
          <FormItem id="modelo" label="Modelo" placeholder="Insira o modelo do camião" handleOnChange={handleModeloChange} value={modelo} />
          <FormItem id="cor" label="Cor" placeholder="Insira a cor do camião" handleOnChange={handleCorChange} value={cor} />
          <SubmitButton>Adicionar Camião</SubmitButton>
        </form>
      </FormWrapper>
    </>
  );
};

export default AddCamioes;