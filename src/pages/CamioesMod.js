import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import MainNavBar from '../components/NavBar/MainNavBar';
import GoBack from '../components/SecondNavBar/GoBack';
import FormItem from "../components/FormItem/FormItem";
import FormSelectItem from '../components/FormItem/FormSelectItems';
import Button from "../components/Button/Button";


const SubmitButton = styled(Button)`
  background: blue;
  margin: 2% 0;
`;

const FormWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin: 2% 5%;
`;

const ModCamioes = () => {
  const { camiaoId } = useParams();
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

    const CamiaoAtualizado = {
      matricula,
      marca,
      modelo,
      cor
    };

    console.log('JSON enviado:', JSON.stringify(CamiaoAtualizado));

    try {
      const response = await fetch(`http://localhost:8080/api/camiao/${camiaoId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(CamiaoAtualizado),
      });

      if (response.ok) {
        console.log('Camião modificado com sucesso!');
        navigate('/camioes');
      } else {
        console.log('Erro ao modificar o Camião.');
      }
    } catch (error) {
      console.log('Erro:', error);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCamiao = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/camiao/${camiaoId}`);
        const json = await response.json();
        const { matricula, marca, modelo, cor } = json.data.camiao;
        setMatricula(matricula);
        setMarca(marca);
        setModelo(modelo);
        setCor(cor);
      } catch (error) {
        console.log('Erro:', error);
      }
    };

    fetchCamiao();
  }, [camiaoId]);

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
          <SubmitButton>Modificar Camião</SubmitButton>
        </form>
      </FormWrapper>
    </>
  );
};

export default ModCamioes;