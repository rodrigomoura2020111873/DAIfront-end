import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import MainNavBar from '../components/NavBar/MainNavBar';
import FormItem from '../components/FormItem/FormItem';
import FormSelectItem from '../components/FormItem/FormSelectItems';
import Button from '../components/Button/Button';
import GoBack from '../components/SecondNavBar/GoBack';
import 'react-datepicker/dist/react-datepicker.css';
import DataFormItem from "../components/FormItem/DataFormItem";

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


const AddRecolha = () => {
  const { baldeId } = useParams();
  const [balde] = useState(baldeId);
  const [funcionario, setFuncionario] = useState('');
  const [camiao, setCamiao] = useState('');
  const [data, setData] = useState(null);
  const [peso, setPeso] = useState('');
  const [funcionarios, setFuncionarios] = useState([]);
  const [camioes, setCamioes] = useState([]);

    useEffect(() => {
      const fetchFuncionarios = async () => {
        try {
          const response = await fetch('http://localhost:8080/api/funcionario');
          if (response.ok) {
            const data = await response.json();
            setFuncionarios(data.data.funcionario);
            console.log(data.data.funcionario);
          } else {
            console.log('Erro ao obter a lista de funcionários.');
          }
        } catch (error) {
          console.log('Erro:', error);
        }
      };
  
      fetchFuncionarios();
    }, []);

    useEffect(() => {
        const fetchCamioes = async () => {
          try {
            const response = await fetch('http://localhost:8080/api/camiao');
            if (response.ok) {
              const data = await response.json();
              setCamioes(data.data.camiao);
              console.log(data.data.camiao);
            } else {
              console.log('Erro ao obter a lista de camioes.');
            }
          } catch (error) {
            console.log('Erro:', error);
          }
        };
    
        fetchCamioes();
      }, []);

  const handleFuncionarioChange = (event) => {
    setFuncionario(event.target.value);
  };
  

  const handleDataChange = (date) => {
    setData(date);
  };

  const handlePesoChange = (event) => {
    setPeso(event.target.value);
  };
  const handleCamiaoChange = (event) => {
    setCamiao(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const novaRecolha = {
      balde: baldeId,
      funcionario,
      camiao,
      data,
      peso,
    };

    console.log('JSON enviado:', JSON.stringify(novaRecolha));

    try {
      const response = await fetch('http://localhost:8080/api/recolha', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novaRecolha),
      });

      if (response.ok) {
        console.log('Recolha criada com sucesso!');
        navigate(-1);
      } else {
        console.log('Erro ao criar a Recolha.');
      }
    } catch (error) {
      console.log('Erro:', error);
    }
  };

  let navigate = useNavigate();


  return (
    <>
      {navigate && <MainNavBar />}
      <GoBack />
      <FormWrapper>
        <form onSubmit={handleSubmit}>
          <FormSelectItem
            id="funcionario"
            label="Funcionário"
            placeholder="Selecione um Funcionário"
            value={funcionario}
            options={funcionarios.map((funcionario) => ({
              value: funcionario._id,
              label: funcionario.nome,
            }))}
            handleOnChange={handleFuncionarioChange}
          />

            <FormSelectItem
            id="camiao"
            label="CAmião"
            placeholder="Selecione um Camião"
            value={camiao}
            options={camioes.map((camiao) => ({
              value: camiao._id,
              label: camiao.matricula,
            }))}
            handleOnChange={handleCamiaoChange}
          />

        <DataFormItem
        id="data"
        label="Data"
        selectedDate={data}
        handleDateChange={handleDataChange}
        />

          <FormItem
          type='number'
            id="peso"
            label="Peso"
            placeholder="Peso"
            handleOnChange={handlePesoChange}
            value={peso}
          />

          <SubmitButton>Adicionar Manutenção</SubmitButton>
        </form>
      </FormWrapper>
    </>
  );
};

export default AddRecolha;
