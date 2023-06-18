import styled from 'styled-components';

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

const Select = styled.select`
  flex-basis: 60%;
  border: 0;
  font-size: inherit;
  border-radius: 5px;
  padding: 10px;
  border: 1px solid lightGrey;
`;

function FormSelectItem({
  id,
  label,
  placeholder = '',
  value,
  options,
  handleOnChange,
}) {
  return (
    <FormItemWrapper>
      <Label htmlFor={id}>{label}</Label>
      <Select
        name={id}
        id={id}
        value={value}
        onChange={handleOnChange}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    </FormItemWrapper>
  );
}

export default FormSelectItem;
