import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import apiRequestMeal from '../services/ApiRequestMeal';
import apiRequestDrink from '../services/ApiRequestDrink';

function SearchBar({ isDrink }: { isDrink: boolean }) {
  const [selectedRadio, setSelectedRadio] = useState('');
  const [inputVal, setInputVal] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (selectedRadio === 'first-letter' && inputVal.length > 1) {
      return alert('Your search must have only 1 (one) character');
    }

    if (isDrink) {
      const response = await apiRequestDrink(selectedRadio, inputVal);
      console.log(response);
      const { drinks } = response;
      if (!drinks) {
        return window.alert("Sorry, we haven't found any recipes for these filters");
      }
      if (drinks.length === 1) {
        const { idDrink } = drinks[0];
        return navigate(`/drinks/${idDrink}`);
      }
    }
    const response = await apiRequestMeal(selectedRadio, inputVal);
    const { meals } = response;
    if (!meals) {
      return window.alert("Sorry, we haven't found any recipes for these filters");
    }
    if (meals.length === 1) {
      const { idMeal } = meals[0];
      return navigate(`/meals/${idMeal}`);
    }
  };
  return (
    <form onSubmit={ handleSubmit }>
      <input
        type="text"
        data-testid="search-input"
        value={ inputVal }
        onChange={ (e) => setInputVal(e.target.value) }
      />
      <input
        data-testid="ingredient-search-radio"
        type="radio"
        name="radio"
        value="ingredient"
        id="ingredient-search-radio"
        onChange={ (e) => setSelectedRadio(e.target.value) }
      />
      <label htmlFor="ingredient-search-radio">Ingredient</label>
      <input
        data-testid="name-search-radio"
        type="radio"
        name="radio"
        value="name"
        id="name-search-radio"
        onChange={ (e) => setSelectedRadio(e.target.value) }
      />
      <label htmlFor="name-search-radio">Name</label>
      <input
        data-testid="first-letter-search-radio"
        type="radio"
        name="radio"
        value="first-letter"
        id="first-letter-search-radio"
        onChange={ (e) => setSelectedRadio(e.target.value) }
      />
      <label htmlFor="first-letter-search-radio">First letter</label>
      <button data-testid="exec-search-btn">Buscar</button>
    </form>
  );
}

export default SearchBar;
