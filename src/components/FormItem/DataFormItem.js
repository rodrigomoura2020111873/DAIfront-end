import React from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const FormItemWrapper = styled.div`
  display: flex;
  text-align: left;
  flex-direction: column;
  margin-bottom: 2%;
`;

const Label = styled.label`
  display: block;
  font-weight: bold;
  padding: 10px 0;
`;

const DatePickerWrapper = styled(DatePicker)`
  flex-basis: 60%;
  border: 0;
  font-size: inherit;
  border-radius: 5px;
  padding: 10px;
  border: 1px solid lightGrey;
`;

function DataFormItem({ id, label, selectedDate, handleDateChange }) {
  return (
    <FormItemWrapper>
      <Label htmlFor={id}>{label}</Label>
      <DatePickerWrapper
        id={id}
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="dd/MM/yyyy"
        placeholderText="Selecione uma data"
      />
    </FormItemWrapper>
  );
}

export default DataFormItem;
