import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import apiRequestMeal from '../../services/ApiRequestMeal';
import apiRequestDrink from '../../services/ApiRequestDrink';
import Input from '../Input';

function SearchBar({ isDrink }: { isDrink: boolean }) {
  const [selectedRadio, setSelectedRadio] = useState('');
  const [inputVal, setInputVal] = useState('');
  const navigate = useNavigate();

  const handleDrinkRequest = async () => {
    const { drinks } = await apiRequestDrink(selectedRadio, inputVal);
    if (!drinks) {
      return window.alert(
        "Sorry, we haven't found any recipes for these filters",
      );
    }
    const { idDrink } = drinks[0];
    navigate(`/drinks/${idDrink}`);
  };

  const handleMealRequest = async () => {
    const { meals } = await apiRequestMeal(selectedRadio, inputVal);
    if (!meals) {
      return window.alert(
        "Sorry, we haven't found any recipes for these filters",
      );
    }
    const { idMeal } = meals[0];
    navigate(`/meals/${idMeal}`);
  };

  const validateInput = () => {
    if (selectedRadio === 'first-letter' && inputVal.length > 1) {
      return alert('Your search must have only 1 (one) character');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validateInput();
    if (isDrink) {
      return handleDrinkRequest();
    }
    return handleMealRequest();
  };

  return (
    <form onSubmit={ handleSubmit }>
      <Input
        type="text"
        dataTestId="search-input"
        value={ inputVal }
        onChange={ (e) => setInputVal(e.target.value) }
      />
      <Input
        labelText="Ingredient"
        dataTestId="ingredient-search-radio"
        type="radio"
        name="radio"
        value="ingredient"
        id="ingredient-search-radio"
        onChange={ (e) => setSelectedRadio(e.target.value) }
      />
      <Input
        labelText="Name"
        dataTestId="name-search-radio"
        type="radio"
        name="radio"
        value="name"
        id="name-search-radio"
        onChange={ (e) => setSelectedRadio(e.target.value) }
      />
      <Input
        labelText="First letter"
        dataTestId="first-letter-search-radio"
        type="radio"
        name="radio"
        value="first-letter"
        id="first-letter-search-radio"
        onChange={ (e) => setSelectedRadio(e.target.value) }
      />
      <button data-testid="exec-search-btn">Buscar</button>
    </form>
  );
}

export default SearchBar;
