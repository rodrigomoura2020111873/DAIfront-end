import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import MainNavBar from '../components/NavBar/MainNavBar';
import GoBack from '../components/SecondNavBar/GoBack';
import FormItem from "../components/FormItem/FormItem";
import FormSelectItem from '../components/FormItem/FormSelectItems';
import Button from "../components/Button/Button";
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

const ModRecolha = () => {
  const { recolhaId } = useParams();
  const [balde, setBalde] = useState('');
  const [camiao, setCamiao] = useState('');
  const [funcionario, setFuncionario] = useState('');
  const [data, setData] = useState(null);;
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

  const handleBaldeChange = (event) => {
    setBalde(event.target.value);
  };

  const handleCamiaoChange = (event) => {
    setCamiao(event.target.value);
  };

  const handleFuncionarioChange = (event) => {
    setFuncionario(event.target.value);
  };

  const handleDataChange = (date) => {
    setData(date); 
  };

  const handlePesoChange = (event) => {
    setPeso(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const recolhaAtualizada = {
      balde,
      camiao,
      funcionario,
      data,
      peso
    };

    console.log('JSON enviado:', JSON.stringify(recolhaAtualizada));

    try {
      const response = await fetch(`http://localhost:8080/api/recolha/${recolhaId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(recolhaAtualizada),
      });

      if (response.ok) {
        console.log('Recolha modificada com sucesso!');
        navigate(-1);
      } else {
        console.log('Erro ao modificar a Recolha');
      }
    } catch (error) {
      console.log('Erro:', error);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecolha = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/recolha/${recolhaId}`);
        const json = await response.json();
        const { balde, camiao, funcionario, data, peso } = json.data.recolha;
        setBalde(balde);
        setCamiao(camiao)
        setFuncionario(funcionario);
        setData(new Date(data));
        setPeso(peso);
        console.log(json.data.recolha)
      } catch (error) {
        console.log('Erro:', error);
      }
    };

    fetchRecolha();
  }, [recolhaId]);

  return (
    <>
      <MainNavBar />
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

          <SubmitButton>Modificar Manutenção</SubmitButton>
        </form>
      </FormWrapper>
    </>
  );
};

export default ModRecolha;
