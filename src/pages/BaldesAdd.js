import React, { useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import MainNavBar from '../components/NavBar/MainNavBar';
import FormItem from "../components/FormItem/FormItem";
import GoBack from '../components/SecondNavBar/GoBack';
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



const AddBalde = () => {
  const [conselho, setConselho] = useState('');
  const [freguesia, setFreguesia] = useState('');
  const [rua, setRua] = useState('');
  const [coordenadaX, setCoordenadaX] = useState('');
  const [coordenadaY, setCoordenadaY] = useState('');
  const [tipo, setTipo] = useState('');
  const [percentagem_lixo, setPercentagem_lixo] = useState(0);

  const handleConselhoChange = (event) => {
    setConselho(event.target.value);
  };

  const handleFreguesiaChange = (event) => {
    setFreguesia(event.target.value);
  };

  const handleRuaChange = (event) => {
    setRua(event.target.value);
  };


  const handleTipoChange = (event) => {
    setTipo(event.target.value);
  };
  const handleCoordenadaXChange = (event) => {
    setCoordenadaX(event.target.value);
  };
  
  const handleCoordenadaYChange = (event) => {
    setCoordenadaY(event.target.value);
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();
  
      const novoBalde = {
        conselho,
        freguesia,
        rua,
        localizacao: [coordenadaX, coordenadaY],
        tipo,
        percentagem_lixo
      };


      console.log('JSON enviado:', JSON.stringify(novoBalde));
  
      try {
        const response = await fetch('http://localhost:8080/api/balde', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(novoBalde),
        });
  
        if (response.ok) {
          console.log('Balde criado com sucesso!');
          navigate('/');
        } else {
          console.log('Erro ao criar o Balde.');
        }
      } catch (error) {
        console.log('Erro:', error);
      }
    };

    const options = [
        { value: 'Indiferenciado', label: 'Indiferenciado' },
        { value: 'Plástico', label: 'Plástico' },
        { value: 'Cartão', label: 'Cartão' },
        { value: 'Vidro', label: 'Vidro' }
    ]

    let navigate = useNavigate();

  return (
    <>
      <MainNavBar />
      <GoBack />
      <FormWrapper>
        <form onSubmit={handleSubmit}>
          <FormItem id="concelho" label="Concelho" placeholder="Insira o concelho do balde" handleOnChange={handleConselhoChange} value={conselho} />
          <FormItem id="freguesia" label="Freguesia" placeholder="Insira a freguesia do balde" handleOnChange={handleFreguesiaChange} value={freguesia} />
          <FormItem id="rua" label="Rua" placeholder="Insira rua do balde" handleOnChange={handleRuaChange} value={rua} />
          <FormItem type="number" step="0.0001" id="coordenadaX" label="Coordenada X" placeholder="Localização x" handleOnChange={handleCoordenadaXChange} value={coordenadaX} />
          <FormItem type="number" step="0.0001" id="coordenadaY" label="Coordenada Y" placeholder="Localização y" handleOnChange={handleCoordenadaYChange} value={coordenadaY} />
          <FormSelectItem
            id="tipo"
            label="Tipo"
            placeholder="Selecione uma opção"
            value={tipo}
            options={options}
            handleOnChange={handleTipoChange}
      />
          <SubmitButton>Adicionar Balde</SubmitButton>
        </form>
      </FormWrapper>
    </>
  );
};

export default AddBalde;