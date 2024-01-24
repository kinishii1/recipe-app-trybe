import { useNavigate, useParams } from 'react-router-dom';
import './styles.css';
import { useEffect, useState } from 'react';
import shareIcon from '../../images/shareIcon.svg';
import { useShare } from '../../hooks/useShare';
import { formatFavorite } from '../../helpers/formatFavorite';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';

function RecipeInProgress({ isDrink }: { isDrink: boolean }) {
  const [recipe, setRecipe] = useState<any>({});
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { handleShareClick, copyStatus } = useShare();
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
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

  const allChecked = ingredients.every((ingredient) => checked[ingredient]);

  const favoriteRecipes = JSON.parse(
    localStorage.getItem('favoriteRecipes') as string,
  );

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

  const addFavorite = (newFavorite: any) => {
    if (!favoriteRecipes) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([newFavorite]));
      return;
    }
    const newFavoriteRecipes = [...favoriteRecipes, newFavorite];
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
  };
  const removeFavorite = (newFavorite: any) => {
    const newFavoriteRecipes = favoriteRecipes.filter(
      (favorite: any) => favorite.id !== newFavorite.id,
    );
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
  };

  const handleFavoriteClick = () => {
    const newFavorite = formatFavorite(recipe, isDrink);
    if (isFavorite) {
      removeFavorite(newFavorite);
      setIsFavorite(false);
      return;
    }
    addFavorite(newFavorite);
    setIsFavorite(true);
  };

  const handleFinishClick = () => {
    let prevVal = JSON.parse(localStorage.getItem('doneRecipes') as any);
    if (!Array.isArray(prevVal)) {
      prevVal = [];
    }
    const newDoneRecipe = {
      id: recipe.idMeal || recipe.idDrink,
      type: isDrink ? 'drink' : 'meal',
      nationality: recipe.strArea || '',
      category: recipe.strCategory || '',
      alcoholicOrNot: recipe.strAlcoholic || '',
      name: recipe.strMeal || recipe.strDrink,
      image: recipe.strMealThumb || recipe.strDrinkThumb,
      doneDate: new Date().toISOString(),
      tags: recipe.strTags ? recipe.strTags.split(',') : [],
    };
    const newDoneRecipes = [...prevVal, newDoneRecipe];
    localStorage.setItem('doneRecipes', JSON.stringify(newDoneRecipes));
    navigate('/done-recipes');
  };

  useEffect(() => {
    localStorage.setItem('checkedItems', JSON.stringify(checked));
  }, [checked]);

  useEffect(() => {
    if (
      favoriteRecipes?.some((favorite: any) => favorite.id === recipe.idMeal)
      || favoriteRecipes?.some((favorite: any) => favorite.id === recipe.idDrink)
    ) setIsFavorite(true);
    else setIsFavorite(false);
  }, [favoriteRecipes]);

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
      <button
        className="share-btn"
        type="button"
        data-testid="share-btn"
        onClick={ handleShareClick }
      >
        {copyStatus !== '' ? (
          <p>{copyStatus}</p>
        ) : (
          <img src={ shareIcon } alt="share" />
        )}
      </button>
      <button
        className="favorite-btn"
        type="button"
        onClick={ handleFavoriteClick }
      >
        {isFavorite ? (
          <img src={ blackHeartIcon } alt="share" data-testid="favorite-btn" />
        ) : (
          <img src={ whiteHeartIcon } alt="share" data-testid="favorite-btn" />
        )}
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
        <div className="ingredients-list" data-testid="ingredient-card">
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
      <button
        disabled={ !allChecked }
        className="start-recipe-btn"
        data-testid="finish-recipe-btn"
        onClick={ handleFinishClick }
      >
        Finish Recipe
      </button>
    </div>
  );
}

export default RecipeInProgress;
