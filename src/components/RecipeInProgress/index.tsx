import { useParams } from 'react-router-dom';
import './styles.css';
import { useEffect, useState } from 'react';
import shareIcon from '../../images/shareIcon.svg';

function RecipeInProgress({ isDrink }: { isDrink: boolean }) {
  const [recipe, setRecipe] = useState<any>({});
  const { id } = useParams<{ id: string }>();
  const [checked, setChecked] = useState<any>(() => {
    const saved = localStorage.getItem('checkedItems');
    const initialValue = JSON.parse(saved || '{}');
    return initialValue;
  });

  const ingredients = Object.keys(recipe)
    .filter((key) => key.includes('strIngredient'))
    .filter((key) => recipe[key] !== null && recipe[key] !== '');
  const measures = Object.keys(recipe)
    .filter((key) => key.includes('strMeasure'))
    .filter((key) => recipe[key] !== null && recipe[key] !== '');

  const handleChecked = (ingredient: string) => {
    if (checked[ingredient]) {
      const newChecked = { ...checked };
      delete newChecked[ingredient];
      setChecked(newChecked);
    } else {
      const newChecked = { ...checked, [ingredient]: true };
      setChecked(newChecked);
    }
  };

  useEffect(() => {
    localStorage.setItem('checkedItems', JSON.stringify(checked));
  }, [checked]);
  
  useEffect(() => {
    if (isDrink) {
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((response) => response.json())
        .then((data) => setRecipe(data.drinks[0]))
        .catch((error) => console.log(error));
    }
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((response) => response.json())
      .then((data) => setRecipe(data.meals[0]))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <h1>RecipeInProgress</h1>
      <button className="share-btn" type="button" data-testid="share-btn">
        <img src={ shareIcon } alt="share" />
      </button>
      <button data-testid="favorite-btn" className="favorite-btn" type="button">
        like
      </button>
      <img
        src={ recipe?.strMealThumb || recipe?.strDrinkThumb }
        alt={ recipe?.strMeal || recipe?.strDrink }
        data-testid="recipe-photo"
      />
      <h2 data-testid="recipe-title">{recipe?.strMeal || recipe?.strDrink}</h2>
      <h3 data-testid="recipe-category">{recipe?.strCategory}</h3>
      <p data-testid="instructions">{recipe?.strInstructions}</p>
      <div>
        <h3>Ingredients</h3>
        <div className="ingredients-list">
          {ingredients.map((ingredient, index) => (
            <label
              key={ index }
              data-testid={ `${index}-ingredient-step` }
              htmlFor={ ingredient }
              style={
                ingredient in checked
                  ? { textDecoration: 'line-through solid rgb(0, 0, 0)' }
                  : {}
              }
            >
              <input
                type="checkbox"
                id={ ingredient }
                checked={ ingredient in checked }
                onChange={ () => handleChecked(ingredient) }
              />
              {`${recipe[ingredient]} - ${recipe[measures[index]]}`}
            </label>
          ))}
        </div>
      </div>
      <button className="start-recipe-btn" data-testid="finish-recipe-btn">
        Finish Recipe
      </button>
    </div>
  );
}

export default RecipeInProgress;
