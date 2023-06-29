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

const ModBaldes = () => {
    const { baldeId } = useParams();
    const [conselho, setConselho] = useState('');
    const [freguesia, setFreguesia] = useState('');
    const [rua, setRua] = useState('');
    const [coordenadaX, setCoordenadaX] = useState('');
    const [coordenadaY, setCoordenadaY] = useState('');
    const [tipo, setTipo] = useState('');

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
        const x = event.target.value;
        setCoordenadaX(x);
      };
      
      const handleCoordenadaYChange = (event) => {
        const y = event.target.value;
        setCoordenadaY(y);
    };
      
    
      const handleSubmit = async (event) => {
        event.preventDefault();

    const BaldeAtualizado = {
        conselho,
        freguesia,
        rua,
        localizacao: [parseFloat(coordenadaX), parseFloat(coordenadaY)],
        tipo,
    };

    console.log('JSON enviado:', JSON.stringify(BaldeAtualizado));

    try {
      const response = await fetch(`http://localhost:8080/api/Balde/${baldeId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(BaldeAtualizado),
      });

      if (response.ok) {
        console.log('Balde modificado com sucesso!');
        navigate('/');
      } else {
        console.log('Erro ao modificar o Balde.');
      }
    } catch (error) {
      console.log('Erro:', error);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    const fetchBalde = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/balde/${baldeId}`);
        const json = await response.json();
        const { conselho, freguesia, rua, localizacao, tipo } = json.data.balde;
        setConselho(conselho);
        setFreguesia(freguesia);
        setRua(rua);
        setCoordenadaX(localizacao[0].toString());
        setCoordenadaY(localizacao[1].toString()); 
        setTipo(tipo);
      } catch (error) {
        console.log('Erro:', error);
      }
    };



    fetchBalde();
  }, [baldeId]);

    const options = [
        { value: 'Indiferenciado', label: 'Indiferenciado' },
        { value: 'Plástico', label: 'Plástico' },
        { value: 'Cartão', label: 'Cartão' },
        { value: 'Vidro', label: 'Vidro' }
    ]
  return (
    <>
      <MainNavBar />
      <GoBack />
      <FormWrapper>
      <form onSubmit={handleSubmit}>
          <FormItem id="conselho" label="Conselho" placeholder="Insira o conselho do balde" handleOnChange={handleConselhoChange} value={conselho} />
          <FormItem id="freguesia" label="Freguesia" placeholder="Insira a freguesia do balde" handleOnChange={handleFreguesiaChange} value={freguesia} />
          <FormItem id="rua" label="Rua" placeholder="Insira rua do balde" handleOnChange={handleRuaChange} value={rua} />
          <FormItem type="number" step="0.0001" id="coordenadaX" label="Coordenada X" placeholder="Localização x" handleOnChange={handleCoordenadaXChange} value={coordenadaX} />
          <FormItem type="number" step="0.0001" id="coordenadaY" label="Coordenada Y" placeholder="Localização y" handleOnChange={handleCoordenadaYChange} value={coordenadaY} />
          <FormSelectItem
            id="tipo"
            label="Tipo"
            value={tipo}
            options={options}
            handleOnChange={handleTipoChange}
      />
          <SubmitButton>Modificar Balde</SubmitButton>
        </form>
      </FormWrapper>
    </>
  );
};

export default ModBaldes;