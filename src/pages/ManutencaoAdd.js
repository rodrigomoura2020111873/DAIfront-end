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


const AddManutencao = () => {
  const { baldeId } = useParams();
  const [balde] = useState(baldeId);
  const [funcionario, setFuncionario] = useState('');
  const [data, setData] = useState(null);
  const [descricao, setDescricao] = useState('');
  const [funcionarios, setFuncionarios] = useState([]);

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

  const handleFuncionarioChange = (event) => {
    setFuncionario(event.target.value);
  };

  const handleDataChange = (date) => {
    setData(date);
  };

  const handleDescricaoChange = (event) => {
    setDescricao(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const novaManutencao = {
      balde: baldeId,
      funcionario,
      data,
      descricao,
    };

    console.log('JSON enviado:', JSON.stringify(novaManutencao));

    try {
      const response = await fetch('http://localhost:8080/api/manutencao', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novaManutencao),
      });

      if (response.ok) {
        console.log('Manutenção criada com sucesso!');
        navigate(-1);
      } else {
        console.log('Erro ao criar a Manutenção.');
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

        <DataFormItem
        id="data"
        label="Data"
        selectedDate={data}
        handleDateChange={handleDataChange}
        />

          <FormItem
            id="descricao"
            label="Descrição"
            placeholder="Descrição"
            handleOnChange={handleDescricaoChange}
            value={descricao}
          />

          <SubmitButton>Adicionar Manutenção</SubmitButton>
        </form>
      </FormWrapper>
    </>
  );
};

export default AddManutencao;
