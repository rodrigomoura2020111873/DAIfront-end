import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import MainNavBar from '../components/NavBar/MainNavBar';
import FormItem from "../components/FormItem/FormItem";
import FormSelectItem from '../components/FormItem/FormSelectItems';
import Button from "../components/Button/Button";
import GoBack from '../components/SecondNavBar/GoBack';


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



const AddFuncionarios = () => {
    const [nome, setNome] = useState('');
    const [funcao, setFuncao] = useState('');
    const [morada, setMorada] = useState('');
    const [email, setEmail] = useState('');
  
    const handleNomeChange = (event) => {
      setNome(event.target.value);
    };
  
    const handleFuncaoChange = (event) => {
      setFuncao(event.target.value);
    };
  
    const handleMoradaChange = (event) => {
      setMorada(event.target.value);
    };
  
    const handleEmailChange = (event) => {
      setEmail(event.target.value);
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      const novoFuncionario = {
        nome,
        funcao,
        morada,
        email
      };


      console.log('JSON enviado:', JSON.stringify(novoFuncionario));
  
      try {
        const response = await fetch('http://localhost:8080/api/funcionario', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(novoFuncionario),
        });
  
        if (response.ok) {
          console.log('Funcionário criado com sucesso!');
          navigate('/funcionarios');
        } else {
          console.log('Erro ao criar o funcionário.');
        }
      } catch (error) {
        console.log('Erro:', error);
      }
    };



    let navigate = useNavigate();

    const options = [
        { value: 'Condutor', label: 'Condutor' },
        { value: 'Recolhedor', label: 'Recolhedor' },
        { value: 'Técnico', label: 'Técnico' },
  ];

  return (
    <>
      {navigate && <MainNavBar />}
      < GoBack />
      <FormWrapper>
        <form onSubmit={handleSubmit}>
        <FormItem id="nome" label="Nome" placeholder="Insira o nome do funcionário" handleOnChange={handleNomeChange} value={nome} />
        <FormSelectItem
        id="funcao"
        label="Função"
        placeholder="Selecione uma Função"
        value={funcao}
        options={options}
        handleOnChange={handleFuncaoChange}
      />
        <FormItem id="morada" label="Morada" placeholder="Insira a morada do funcionário" handleOnChange={handleMoradaChange}  value={morada}/>
        <FormItem id="email" label="Email" placeholder="Insira o email do funcionário" handleOnChange={handleEmailChange} value={email}/>
        <SubmitButton>Adicionar Funcionário</SubmitButton>
        </form>
      </FormWrapper>
    </>
  );
};

export default AddFuncionarios;