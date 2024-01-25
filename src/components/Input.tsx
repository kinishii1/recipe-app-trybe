import { InputProps } from '../types';

function Input({
  type,
  onChange = () => {},
  dataTestId = '',
  value = '',
  id = '',
  labelText = '',
  name = '',
}: InputProps) {
  return (
    <>
      <input
        type={ type }
        data-testid={ dataTestId }
        value={ value }
        id={ id }
        onChange={ onChange }
        name={ name }
      />
      {labelText && <label htmlFor={ id }>{labelText}</label>}
    </>
  );
}

export default Input;
